import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { useMutation } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { isFunction } from 'is-what';

import { useStudent } from '../StudentContext';

import Translation from '../../common/Translation';
import UserFormFields from '../../user/UserFormFields/UserFormFields';
import { updateStorageStudent } from '../../../helpers/sessionStorage';
import toastConfig from '../../../commondata/toast.config';

const UpdateStudentModal = ({ isOpen, onClose, onUpdate }) => {
  const { studentInfo } = useStudent();

  const form = useForm({ defaultValues: { ...studentInfo } });

  const { handleSubmit } = form;

  const { mutateAsync, isLoading } = useMutation(async (data) => axios.post('/api/student/updateStudent', data), {
    onSuccess: (response, variables) => {
      updateStorageStudent(variables);

      if (isFunction(onUpdate)) {
        onUpdate(variables);
      }

      onClose();

      toast.success(response.data.message, toastConfig);
    },
    onError: (err) => toast.error(err.message, toastConfig),
  });

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.updateStudentHeader" />
        </Modal.Title>
      </Modal.Header>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(mutateAsync)}>
          <Modal.Body className="student-form">
            <UserFormFields idPrefix={`${studentInfo?.StudentID}`} defaultValues={studentInfo} isStudent />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success" disabled={isLoading}>
              {isLoading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                <Translation value="buttons.student.updateStudent" />
              )}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              <Translation value="buttons.close" />
            </Button>
          </Modal.Footer>
        </form>
      </FormProvider>
    </Modal>
  );
};

UpdateStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateStudentModal;
