import React from 'react';
import { ToastContainer } from 'react-toastify';
import { createStudent } from '../helpers/apiCalls';

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';



const StudentSubscriptionPage = () => {
  return (
    <>
      <ToastContainer />
      <div className="form-wrapper subscription-form">
        <CreateUpdateUserForm
          personType={'Student'}
          callback={createStudent}
          isForCreating={true}
        />
      </div>
    </>
  );
}

export default StudentSubscriptionPage;
