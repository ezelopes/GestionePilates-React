import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import { useTeacher } from '../TeacherContext';

import Translation from '../../common/Translation';

const DeleteTeacherModal = ({ isOpen, closeModal, handleTeacherDeletion }) => {
  const { teacherInfo } = useTeacher();

  return (
    <Modal show={isOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.deleteTeacherHeader" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Translation
          value="modalsContent.deleteConfirmationBody"
          replace={{ fullname: `${teacherInfo.Name} ${teacherInfo.Surname}` }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleTeacherDeletion}>
          <Translation value="buttons.teacher.deleteTeacher" />
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleTeacherDeletion: PropTypes.func.isRequired,
};

export default DeleteTeacherModal;
