import React from 'react';
import { ToastContainer } from 'react-toastify';
import { createTeacher } from '../helpers/apiCalls';

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';

const TeacherSubscriptionPage = () => {
  return (
    <>
      <ToastContainer />
      <div className="form-wrapper subscription-form">
        <CreateUpdateUserForm
          personType={'Teacher'}
          callback={createTeacher}
          isForCreating={true}
        />
      </div>
    </>
  );
}

export default TeacherSubscriptionPage;
