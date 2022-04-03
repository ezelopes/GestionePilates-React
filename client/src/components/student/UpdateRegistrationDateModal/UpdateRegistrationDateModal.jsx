import React from 'react';
import PropTypes from 'prop-types';

import { Form, Modal, Button } from 'react-bootstrap';

import { useStudent } from '../StudentContext';

import Translation from '../../common/Translation';

const UpdateRegistrationDateModal = ({ isOpen, closeModal, handleRegistrationDateUpdate }) => {
  const { studentInfo, setNewRegistrationDate } = useStudent();

  return (
    <Modal show={isOpen} onHide={closeModal} dialogClassName="update-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.updateRegistrationDateHeader" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="date"
          defaultValue={studentInfo?.RegistrationDate}
          onChange={({ target }) => setNewRegistrationDate(target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleRegistrationDateUpdate}>
          <Translation value="buttons.student.updateStudent" />
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdateRegistrationDateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleRegistrationDateUpdate: PropTypes.func.isRequired,
};

export default UpdateRegistrationDateModal;
