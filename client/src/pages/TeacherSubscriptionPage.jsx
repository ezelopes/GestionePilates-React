import React from 'react';
import { createTeacher } from '../helpers/apiCalls';

import { userType } from '../commondata';

import CreateUpdateUserForm from '../components/forms/CreateUpdateUserForm';

const TeacherSubscriptionPage = () => (
  <>
    <div className="form-wrapper subscription-form">
      <CreateUpdateUserForm personType={userType[1].user} callback={createTeacher} isForCreating />
    </div>
  </>
);

export default TeacherSubscriptionPage;
