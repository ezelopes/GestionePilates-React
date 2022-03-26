import React from 'react';
import { createTeacher } from '../helpers/apiCalls';

import CreateUpdateUserForm from '../components/forms/CreateUpdateUserForm';

const TeacherSubscriptionPage = () => (
  <>
    <div className="form-wrapper subscription-form">
      <CreateUpdateUserForm callback={createTeacher} isForCreating />
    </div>
  </>
);

export default TeacherSubscriptionPage;
