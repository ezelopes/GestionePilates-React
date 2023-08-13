import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { withReactQuery } from '../components/common/withReactQuery/withReactQuery';
import NotFoundPage from './NotFoundPage';

import { StudentProvider } from '../components/student/StudentContext';
import StudentReceiptsList from '../components/student/StudentReceiptsList';
import StudentCard from '../components/student/StudentCard';
import UpsertReceiptForm from '../components/receipts/UpsertReceiptForm';
import Translation from '../components/common/Translation';
import toastConfig from '../commondata/toast.config';

import '../styles/student-page.css';

const StudentPage = ({ match }) => {
  const [student, setStudent] = useState({});

  const [studentReceipts, setStudentReceipts] = useState([]);

  const [newRegistrationDate, setNewRegistrationDate] = useState(null);

  const history = useHistory();

  const { isLoading, isError } = useQuery(
    ['student'],
    async () => (await axios.get(`/api/student/getStudentWithReceipts/${match.params.TaxCode}`)).data,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        setStudent(data.student);

        setStudentReceipts(data.receipts);
      },
    }
  );

  const { mutateAsync: createReceiptMutation } = useMutation(
    async (newReceipt) => axios.put('/api/receipt/createReceipt', newReceipt),
    {
      onSuccess: (response, variables) => {
        setStudentReceipts([...studentReceipts, { ReceiptID: response.ReceiptID, ...variables }]);

        toast.success(response.data.message, toastConfig);
      },
      onError: (err) => toast.error(err?.message, toastConfig),
    }
  );

  if (isLoading) {
    return <Spinner animation="border" role="status" className="spinner" />;
  }

  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <StudentProvider
      studentInfo={student}
      studentReceipts={studentReceipts}
      setStudentInfo={setStudent}
      setStudentReceipts={setStudentReceipts}
      newRegistrationDate={newRegistrationDate}
      setNewRegistrationDate={setNewRegistrationDate}
    >
      <Button variant="warning" onClick={history.goBack} className="backButton">
        <span role="img" aria-label="back">
          🔙 <Translation value="common.back" />
        </span>
      </Button>

      <div className="student-page">
        <StudentCard />

        <div className="form-wrapper create-receipt-form">
          <UpsertReceiptForm isForCreating mutate={createReceiptMutation} />
        </div>
      </div>

      <StudentReceiptsList />
    </StudentProvider>
  );
};

StudentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      TaxCode: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

StudentPage.defaultValue = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      TaxCode: '',
    }),
  }),
};

export default withReactQuery(StudentPage);
