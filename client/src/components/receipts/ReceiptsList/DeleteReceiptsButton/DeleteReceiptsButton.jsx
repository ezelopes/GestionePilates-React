import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { useMutation } from 'react-query';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useToggle } from '../../../common/useToggle';
import Translation from '../../../common/Translation';
import toastConfig from '../../../../commondata/toast.config';
import endpoints from '../../../../commondata/endpoints.config';

const DeleteReceiptsButton = ({ receiptIDs, onDelete }) => {
  const [showModal, toggleShowModal] = useToggle();

  const { mutate, isLoading } = useMutation(
    async () =>
      axios.delete(endpoints.receipt.deleteMultiple, {
        data: { ReceiptIDs: receiptIDs },
      }),
    {
      onSuccess: ({ data }) => {
        onDelete();

        toggleShowModal();

        toast.success(data.message, toastConfig);
      },
      onError: (err) => toast.error(err?.message, toastConfig),
    }
  );

  return (
    <>
      <Button variant="danger" onClick={toggleShowModal} disabled={receiptIDs.length < 1}>
        <span role="img" aria-label="delete-selected">
          🗑️ <Translation value="buttons.receipt.deleteSelectedReceipts" />
        </span>
      </Button>
      <Modal show={showModal} onHide={toggleShowModal} dialogClassName="update-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.deleteReceiptsHeader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Translation value="modalsContent.deleteReceiptsBody" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={mutate} disabled={isLoading}>
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              <Translation value="buttons.receipt.deleteReceipts" />
            )}
          </Button>
          <Button variant="secondary" onClick={toggleShowModal}>
            <Translation value="buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DeleteReceiptsButton.propTypes = {
  /**
   * List of receipt IDs to delete.
   */
  receiptIDs: PropTypes.array.isRequired,
  /**
   * Optional callback to run after deletion is completed.
   */
  onDelete: PropTypes.func,
};

DeleteReceiptsButton.defaultProps = {
  onDelete: () => {},
};

export default DeleteReceiptsButton;
