import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { isFunction } from 'is-what';

import toastConfig from '../../../../commondata/toast.config';
import { useToggle } from '../../../common/useToggle';
import Translation from '../../../common/Translation';
import UserFormFields from '../../../user/UserFormFields/UserFormFields';
import endpoints from '../../../../commondata/endpoints.config';

const UpdateTeacherButton = ({ defaultValues, onUpdate }) => {
  const [showModal, toggleShowModal] = useToggle();

  const form = useForm({ defaultValues });

  const { handleSubmit, reset } = form;

  const { mutateAsync, isLoading } = useMutation(async (data) => axios.post(endpoints.teacher.update, data), {
    onSuccess: (response, variables) => {
      if (isFunction(onUpdate)) {
        onUpdate(variables);
      }

      toggleShowModal();

      toast.success(response.data.message, toastConfig);
    },
    onError: (err) => toast.error(err.message, toastConfig),
  });

  const handleOnClose = () => {
    reset();

    toggleShowModal();
  };

  return (
    <>
      <Button variant="primary" onClick={toggleShowModal}>
        <span role="img" aria-label="update">
          🔄 <Translation value="buttons.teacher.updateTeacher" />
        </span>
      </Button>

      <Modal show={showModal} onHide={handleOnClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.updateTeacherHeader" />
          </Modal.Title>
        </Modal.Header>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(mutateAsync)}>
            <Modal.Body className="update-teacher-form">
              <UserFormFields idPrefix="update-teacher-form" defaultValues={defaultValues} isStudent={false} />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                  <Translation value="buttons.teacher.updateTeacher" />
                )}
              </Button>
              <Button variant="secondary" onClick={handleOnClose}>
                <Translation value="buttons.close" />
              </Button>
            </Modal.Footer>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

UpdateTeacherButton.propTypes = {
  defaultValues: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};

UpdateTeacherButton.defaultProps = {
  onUpdate: () => {},
};

export default UpdateTeacherButton;
