import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { isFunction } from 'is-what';
import { FormProvider, useForm } from 'react-hook-form';
import { useStudent } from '../../StudentContext';
import { getTranslation } from '../../../common/Translation/helpers';
import toastConfig from '../../../../commondata/toast.config';
import { useToggle } from '../../../common/useToggle';
import Translation from '../../../common/Translation';
import ReceiptForm from '../../../receipts/UpsertReceiptForm/ReceiptForm';
import { isSubscriptionFee } from '../../../../commondata';

const UpdateReceiptButton = ({ receipt, onUpdateCallback }) => {
  const { studentInfo, studentReceipts, setStudentReceipts } = useStudent();

  const [showUpdateReceiptModal, toggleShowUpdateReceiptModal] = useToggle(false);

  const defaultValues = {
    TaxCode: studentInfo.TaxCode,
    StudentID: studentInfo.StudentID,
    ...receipt,
  };

  const form = useForm({ defaultValues });

  const { handleSubmit, reset } = form;

  const { mutateAsync } = useMutation(async (updatedReceipt) => axios.post('/api/receipt/updateReceipt', updatedReceipt), {
    onSuccess: (response, submittedReceipt) => {
      const updatedList = studentReceipts.map((r) => {
        if (r.ReceiptID === submittedReceipt.ReceiptID) {
          // When changing from Subscription Fee to any other type, make sure some fields are ignore so they
          // don't come up in the grid (since there's no refetch happening).
          return isSubscriptionFee(submittedReceipt.ReceiptType)
            ? submittedReceipt
            : { ...submittedReceipt, CourseStartDate: null, CourseEndDate: null };
        }

        return r;
      });

      setStudentReceipts(updatedList);

      toggleShowUpdateReceiptModal();

      if (isFunction(onUpdateCallback)) {
        onUpdateCallback();
      }

      reset();

      toast.success(response.data.message, toastConfig);
    },
    onError: (err) => toast.error(err?.message, toastConfig),
  });

  const onUpdate = () => {
    if (!receipt) {
      return toast.error(getTranslation('toast.error.noReceiptSelectedForUpdate'), toastConfig);
    }

    return toggleShowUpdateReceiptModal();
  };

  return (
    <>
      <Button variant="warning" onClick={onUpdate} disabled={!receipt}>
        <span role="img" aria-label="update">
          🔄 <Translation value="buttons.receipt.updateReceipt" />
        </span>
      </Button>

      <Modal show={showUpdateReceiptModal} onHide={() => toggleShowUpdateReceiptModal()} dialogClassName="update-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.updateReceiptHeader" />
          </Modal.Title>
        </Modal.Header>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(mutateAsync)}>
            <Modal.Body>
              <ReceiptForm key={receipt?.id} defaultValues={defaultValues} />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="success">
                <Translation value="buttons.receipt.updateReceipt" />
              </Button>
              <Button variant="secondary" onClick={toggleShowUpdateReceiptModal}>
                <Translation value="buttons.close" />
              </Button>
            </Modal.Footer>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

UpdateReceiptButton.propTypes = {
  receipt: PropTypes.object,
  onUpdateCallback: PropTypes.func,
};

UpdateReceiptButton.defaultProps = {
  receipt: undefined,
  onUpdateCallback: () => {},
};

export default UpdateReceiptButton;
