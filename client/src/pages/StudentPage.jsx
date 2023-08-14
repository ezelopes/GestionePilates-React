import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import NotFoundPage from './NotFoundPage';
import { withReactQuery } from '../components/common/withReactQuery/withReactQuery';

import { StudentProvider } from '../components/student/StudentContext';
import StudentReceiptsList from '../components/student/StudentReceiptsList';
import StudentCard from '../components/student/StudentCard';
import ReceiptFormFields from '../components/receipts/ReceiptFormFields';
import Translation from '../components/common/Translation';
import toastConfig from '../commondata/toast.config';

import { receiptFactory } from '../helpers/receipts';

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

  const form = useForm({ defaultValues: receiptFactory() });

  const { handleSubmit, reset } = form;

  const { mutateAsync } = useMutation(
    async (newReceipt) =>
      axios.put('/api/receipt/createReceipt', { ...newReceipt, TaxCode: student.TaxCode, StudentID: student.StudentID }),
    {
      onSuccess: (response, variables) => {
        setStudentReceipts([
          ...studentReceipts,
          { ...variables, ReceiptID: response.data.ReceiptID, FK_StudentID: student.StudentID },
        ]);

        // TODO: Set RegistrationDate with `setStudent` if receipt has been updated with `variables.RegistrationDate: true`

        reset();

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
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(mutateAsync)}>
              <ReceiptFormFields idPrefix="create" />

              <Button type="submit" variant="success">
                <Translation value="buttons.receipt.createReceipt" />
              </Button>
            </form>
          </FormProvider>
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
