import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { isFunction } from 'is-what';
import { useStudent } from '../../StudentContext';
import { getTranslation } from '../../../common/Translation/helpers';
import toastConfig from '../../../../commondata/toast.config';
import { useToggle } from '../../../common/useToggle';
import Translation from '../../../common/Translation';
import UpsertReceiptForm from '../../../receipts/UpsertReceiptForm';

const UpdateReceiptButton = ({ receipt, onUpdateCallback }) => {
  const { studentReceipts, setStudentReceipts } = useStudent();

  const [showUpdateReceiptModal, toggleShowUpdateReceiptModal] = useToggle(false);

  const { mutateAsync: updateReceiptMutation } = useMutation(
    async (updatedReceipt) => axios.post('/api/receipt/updateReceipt', updatedReceipt),
    {
      onSuccess: (response, variables) => {
        const updatedList = studentReceipts.map((r) => (r.ReceiptID === variables.ReceiptID ? variables : r));

        setStudentReceipts(updatedList);

        toggleShowUpdateReceiptModal();

        if (isFunction(onUpdateCallback)) {
          onUpdateCallback();
        }

        toast.success(response.data.message, toastConfig);
      },
      onError: (err) => toast.error(err?.message, toastConfig),
    }
  );

  const onUpdate = () => {
    if (!receipt) {
      return toast.error(getTranslation('toast.error.noReceiptSelectedForUpdate'), toastConfig);
    }

    return toggleShowUpdateReceiptModal();
  };

  return (
    <>
      <Button variant="warning" onClick={onUpdate}>
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
        <Modal.Body>
          <UpsertReceiptForm receiptInfo={receipt} mutate={updateReceiptMutation} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShowUpdateReceiptModal}>
            <Translation value="buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateReceiptButton.propTypes = {
  receipt: PropTypes.object,
  onUpdateCallback: PropTypes.func,
};

UpdateReceiptButton.defaultProps = {
  receipt: {},
  onUpdateCallback: () => {},
};

export default UpdateReceiptButton;
