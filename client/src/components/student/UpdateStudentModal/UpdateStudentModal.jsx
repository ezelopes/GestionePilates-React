import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'react-bootstrap';

import UpsertUserForm from '../../user/UpsertUserForm';

import { updateStudent } from '../../../helpers/apiCalls';
import { useStudent } from '../StudentContext';

import Translation from '../../common/Translation';

const UpdateStudentModal = ({ isOpen, closeModal }) => {
  const { studentInfo, setStudentInfo } = useStudent();

  return (
    <Modal show={isOpen} onHide={closeModal} dialogClassName="update-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.updateStudentHeader" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpsertUserForm
          personInfo={studentInfo}
          isStudent
          callback={updateStudent}
          handleModal={closeModal}
          setUserInfo={setStudentInfo}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdateStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UpdateStudentModal;
