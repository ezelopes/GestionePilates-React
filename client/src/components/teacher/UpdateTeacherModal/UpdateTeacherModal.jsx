import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import { useTeacher } from '../TeacherContext';

import UpsertUserForm from '../../user/UpsertUserForm';
import Translation from '../../common/Translation';

import { updateTeacher } from '../../../helpers/apiCalls';

const UpdateTeacherModal = ({ isOpen, closeModal }) => {
  const { teacherInfo, setTeacherInfo } = useTeacher();

  return (
    <Modal show={isOpen} onHide={closeModal} dialogClassName="update-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.updateTeacherHeader" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpsertUserForm personInfo={teacherInfo} callback={updateTeacher} handleModal={closeModal} setUserInfo={setTeacherInfo} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdateTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UpdateTeacherModal;
