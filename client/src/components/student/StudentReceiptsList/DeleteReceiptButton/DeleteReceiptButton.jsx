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

const DeleteReceiptButton = ({ receipt, onDeleteCallback }) => {
  const { studentReceipts, setStudentReceipts } = useStudent();

  const [showDeleteReceiptModal, toggleShowDeleteReceiptModal] = useToggle(false);

  const { mutateAsync: updateReceiptMutation } = useMutation(
    async () => axios.delete('/api/receipt/deleteReceipt', { data: { ReceiptID: receipt.ReceiptID } }),
    {
      onSuccess: (response) => {
        const updatedList = studentReceipts.filter((r) => r.ReceiptID === receipt.ReceiptID);

        setStudentReceipts(updatedList);

        if (isFunction(onDeleteCallback)) {
          onDeleteCallback();
        }

        toggleShowDeleteReceiptModal();

        toast.success(response.message, toastConfig);
      },
    }
  );

  return (
    <>
      <Button
        variant="danger"
        onClick={() => {
          if (!receipt) {
            return toast.error(getTranslation('toast.error.noReceiptSelectedForDelete'), toastConfig);
          }
          return toggleShowDeleteReceiptModal();
        }}
      >
        <span role="img" aria-label="bin">
          🗑️ <Translation value="buttons.receipt.deleteReceipt" />
        </span>
      </Button>
      <Modal show={showDeleteReceiptModal} onHide={toggleShowDeleteReceiptModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.deleteReceiptHeader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Translation value="modalsContent.deleteReceiptBody" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={updateReceiptMutation}>
            <Translation value="buttons.receipt.deleteReceipt" />
          </Button>
          <Button variant="secondary" onClick={toggleShowDeleteReceiptModal}>
            <Translation value="buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteReceiptButton.propTypes = {
  receipt: PropTypes.object,
  onDeleteCallback: PropTypes.func,
};

DeleteReceiptButton.defaultProps = {
  receipt: {},
  onDeleteCallback: () => {},
};

export default DeleteReceiptButton;
