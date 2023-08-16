import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { isFunction } from 'is-what';
import { toast } from 'react-toastify';
import { Modal, Button, Spinner } from 'react-bootstrap';

import ControlledFormDateField from '../../form/ControlledFormDateField';
import Translation from '../../common/Translation';

import { updateStorageStudentRegistrationDate } from '../../../helpers/sessionStorage';

import toastConfig from '../../../commondata/toast.config';

const UpdateRegistrationDateModal = ({ id, defaultValue = undefined, isOpen, onClose, onUpdate }) => {
  const form = useForm({ defaultValues: { RegistrationDate: defaultValue } });

  const { handleSubmit, reset } = form;

  // Listen to updates made by other components to keep this form up to date.
  useEffect(() => {
    reset({ RegistrationDate: defaultValue });
  }, [defaultValue, reset]);

  const { mutateAsync, isLoading } = useMutation(
    async (RegistrationDate) => axios.post('/api/student/updateRegistrationDate', { StudentID: id, ...RegistrationDate }),
    {
      onSuccess: (response, variables) => {
        // Session storage update
        updateStorageStudentRegistrationDate(id, variables.RegistrationDate);

        if (isFunction(onUpdate)) {
          onUpdate(variables.RegistrationDate);
        }

        onClose();

        toast.success(response.data.message, toastConfig);
      },
      onError: (err) => toast.error(err.message, toastConfig),
    }
  );

  return (
    <Modal show={isOpen} onHide={onClose} dialogClassName="update-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation value="modalsContent.updateRegistrationDateHeader" />
        </Modal.Title>
      </Modal.Header>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(mutateAsync)}>
          <Modal.Body>
            <ControlledFormDateField id={`${id}-registration-date`} name="RegistrationDate" defaultValue={defaultValue} />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success">
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

UpdateRegistrationDateModal.propTypes = {
  id: PropTypes.number.isRequired,
  defaultValue: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};

UpdateRegistrationDateModal.defaultProps = {
  defaultValue: undefined,
  onUpdate: () => {},
};

export default UpdateRegistrationDateModal;
