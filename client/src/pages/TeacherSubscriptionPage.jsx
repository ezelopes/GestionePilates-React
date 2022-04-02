import React from 'react';
import { createTeacher } from '../helpers/apiCalls';

import UpsertUserForm from '../components/user/UpsertUserForm';

const TeacherSubscriptionPage = () => (
  <div className="form-wrapper subscription-form">
    <UpsertUserForm callback={createTeacher} isForCreating />
  </div>
);

export default TeacherSubscriptionPage;
