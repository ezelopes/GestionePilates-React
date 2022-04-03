import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'react-bootstrap';

import { useStudent } from '../StudentContext';

import Translation from '../../common/Translation';

const DeleteStudentModal = ({ isOpen, closeModal, handleStudentDeletion }) => {
  const { studentInfo } = useStudent();

  return (
    <Modal show={isOpen} onHide={closeModal} dialogClassName="update-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.deleteStudentHeader" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Translation
          value="modalsContent.deleteConfirmationBody"
          replace={{ fullname: `${studentInfo.Name} ${studentInfo.Surname}` }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleStudentDeletion}>
          <Translation value="buttons.student.deleteStudent" />
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleStudentDeletion: PropTypes.func.isRequired,
};

export default DeleteStudentModal;
