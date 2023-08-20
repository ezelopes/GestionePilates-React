import axios from 'axios';
import PropTypes from 'prop-types';

import { isFunction } from 'is-what';
import React from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Modal, Spinner } from 'react-bootstrap';

import { useToggle } from '../../../common/useToggle';
import Translation from '../../../common/Translation';

import toastConfig from '../../../../commondata/toast.config';

const DeleteTeacherButton = ({ teacherInfo, onDelete }) => {
  const [showModal, toggleShowModal] = useToggle();

  const { mutateAsync, isLoading } = useMutation(
    async () => axios.delete('/api/teacher/deleteTeacher', { data: { TeacherID: teacherInfo.TeacherID } }),
    {
      onSuccess: (response) => {
        if (isFunction(onDelete)) {
          onDelete(teacherInfo.TeacherID);
        }

        toggleShowModal();

        toast.success(response.data.message, toastConfig);
      },
    }
  );

  return (
    <>
      <Button variant="danger" onClick={toggleShowModal}>
        <span role="img" aria-label="bin">
          🗑️ <Translation value="buttons.teacher.deleteTeacher" />
        </span>
      </Button>
      <Modal show={showModal} onHide={toggleShowModal} centered>
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
          <Button variant="danger" onClick={mutateAsync}>
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              <Translation value="buttons.teacher.deleteTeacher" />
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

DeleteTeacherButton.propTypes = {
  teacherInfo: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

DeleteTeacherButton.defaultProps = {
  onDelete: () => {},
};

export default DeleteTeacherButton;
