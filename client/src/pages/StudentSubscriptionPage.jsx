import React from 'react';
import { createStudent } from '../helpers/apiCalls';

import UpsertUserForm from '../components/user/UpsertUserForm';

const StudentSubscriptionPage = () => (
  <div className="form-wrapper subscription-form">
    <UpsertUserForm isStudent callback={createStudent} isForCreating />
  </div>
);

export default StudentSubscriptionPage;
