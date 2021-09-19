import React from 'react';
import { createStudent } from '../helpers/apiCalls';

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';

const StudentSubscriptionPage = () => {
  return (
    <>
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
