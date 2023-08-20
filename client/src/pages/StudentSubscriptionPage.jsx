import React from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { withReactQuery } from '../components/common/withReactQuery';
import UserFormFields from '../components/user/UserFormFields';
import Translation from '../components/common/Translation';

import { addStudentToStorage } from '../helpers/sessionStorage';
import { studentFactory } from '../helpers/studentFactory';

import toastConfig from '../commondata/toast.config';

const StudentSubscriptionPage = () => {
  const defaultValues = studentFactory();

  const form = useForm({ defaultValues });

  const { handleSubmit, reset } = form;

  const { mutateAsync, isLoading } = useMutation(async (data) => axios.put('/api/student/createStudent', data), {
    onSuccess: (response, variables) => {
      const newStudent = { ...variables, StudentID: response.data.StudentID };

      addStudentToStorage(newStudent);

      reset();

      toast.success(response.data.message, toastConfig);
    },
    onError: (err) => toast.error(err.message, toastConfig),
  });

  return (
    <div className="form-wrapper subscription-form">
      <FormProvider {...form}>
        <form className="create-student-form" id="create-student-form" onSubmit={handleSubmit(mutateAsync)}>
          <UserFormFields idPrefix="create-student-form" defaultValues={defaultValues} isStudent />
        </form>
      </FormProvider>
      <div className="buttons-container justify-content-center">
        <Button form="create-student-form" type="submit" variant="success" disabled={isLoading}>
          {isLoading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            <Translation value="buttons.student.createStudent" />
          )}
        </Button>
        <Button variant="secondary" onClick={() => reset()}>
          <Translation value="buttons.resetForm" />
        </Button>
      </div>
    </div>
  );
};

export default withReactQuery(StudentSubscriptionPage);
