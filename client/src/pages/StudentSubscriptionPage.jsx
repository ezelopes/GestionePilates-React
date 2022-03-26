import React from 'react';
import { createStudent } from '../helpers/apiCalls';

import CreateUpdateUserForm from '../components/forms/CreateUpdateUserForm';

const StudentSubscriptionPage = () => (
  <>
    <div className="form-wrapper subscription-form">
      <CreateUpdateUserForm isStudent callback={createStudent} isForCreating />
    </div>
  </>
);

export default StudentSubscriptionPage;
