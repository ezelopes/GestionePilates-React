import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { isFunction } from 'is-what';
import { FormProvider, useForm } from 'react-hook-form';
import { useStudent } from '../../StudentContext';
import { getTranslation } from '../../../common/Translation/helpers';
import toastConfig from '../../../../commondata/toast.config';
import { useToggle } from '../../../common/useToggle';
import Translation from '../../../common/Translation';
import ReceiptFormFields from '../../../receipts/ReceiptFormFields';
import { isSubscriptionFee } from '../../../../commondata';
import { receiptFactory } from '../../../../helpers/receipts';
import endpoints from '../../../../commondata/endpoints.config';

const UpdateReceiptButton = ({ receipt, onUpdateCallback }) => {
  const { studentInfo, studentReceipts, setStudentReceipts } = useStudent();

  const [showUpdateReceiptModal, toggleShowUpdateReceiptModal] = useToggle();

  const defaultValues = {
    TaxCode: studentInfo.TaxCode,
    StudentID: studentInfo.StudentID,
    ...receiptFactory(receipt),
  };

  const form = useForm({ defaultValues });

  const { handleSubmit, reset } = form;

  const { mutateAsync, isLoading } = useMutation(async (updatedReceipt) => axios.post(endpoints.receipt.update, updatedReceipt), {
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

  const onModalClose = () => {
    reset();

    toggleShowUpdateReceiptModal();
  };

  return (
    <>
      <Button variant="warning" onClick={onUpdate} disabled={!receipt}>
        <span role="img" aria-label="update">
          🔄 <Translation value="buttons.receipt.updateReceipt" />
        </span>
      </Button>

      <Modal show={showUpdateReceiptModal} onHide={onModalClose} dialogClassName="update-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.updateReceiptHeader" />
          </Modal.Title>
        </Modal.Header>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(mutateAsync)}>
            <Modal.Body>
              <ReceiptFormFields idPrefix={`${receipt?.ReceiptID}`} defaultValues={defaultValues} isEdit />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                  <Translation value="buttons.receipt.updateReceipt" />
                )}
              </Button>
              <Button variant="secondary" onClick={onModalClose}>
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
