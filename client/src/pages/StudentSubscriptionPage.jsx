import React from 'react';
import { createStudent } from '../helpers/apiCalls';

import { userType } from '../commondata/commondata'

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';

const StudentSubscriptionPage = () => (
    <>
      <div className="form-wrapper subscription-form">
        <CreateUpdateUserForm
          personType={userType[0].user}
          callback={createStudent}
          isForCreating
        />
      </div>
    </>
  )

export default StudentSubscriptionPage;
