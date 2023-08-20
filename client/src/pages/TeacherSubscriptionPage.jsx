import React from 'react';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { withReactQuery } from '../components/common/withReactQuery';

import UserFormFields from '../components/user/UserFormFields';
import Translation from '../components/common/Translation';

import toastConfig from '../commondata/toast.config';
import { teacherFactory } from '../helpers/teacherFactory';
import endpoints from '../commondata/endpoints.config';

const TeacherSubscriptionPage = () => {
  const defaultValues = teacherFactory();

  const form = useForm({ defaultValues });

  const { handleSubmit, reset } = form;

  const { mutateAsync, isLoading } = useMutation(async (data) => axios.put(endpoints.teacher.create, data), {
    onSuccess: (response) => {
      reset();

      toast.success(response.data.message, toastConfig);
    },
    onError: (err) => toast.error(err.message, toastConfig),
  });

  return (
    <div className="form-wrapper subscription-form">
      <FormProvider {...form}>
        <form className="create-teacher-form" id="create-teacher-form" onSubmit={handleSubmit(mutateAsync)}>
          <UserFormFields idPrefix="create-teacher-form" defaultValues={defaultValues} isStudent={false} />
        </form>
      </FormProvider>
      <div className="buttons-container justify-content-center">
        <Button form="create-teacher-form" type="submit" variant="success" disabled={isLoading}>
          {isLoading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            <Translation value="buttons.teacher.createTeacher" />
          )}
        </Button>
        <Button variant="secondary" onClick={() => reset()}>
          <Translation value="buttons.resetForm" />
        </Button>
      </div>
    </div>
  );
};

export default withReactQuery(TeacherSubscriptionPage);
