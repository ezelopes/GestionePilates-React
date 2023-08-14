import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

import axios from 'axios';
import { useQuery } from 'react-query';
import NotFoundPage from './NotFoundPage';
import { withReactQuery } from '../components/common/withReactQuery';
import Translation from '../components/common/Translation';

import { StudentProvider } from '../components/student/StudentContext';
import StudentReceiptsList from '../components/student/StudentReceiptsList';
import StudentCard from '../components/student/StudentCard';
import CreateReceiptForm from '../components/receipts/CreateReceiptForm';

import '../styles/student-page.css';

const StudentPage = () => {
  const [student, setStudent] = useState({});

  const [studentReceipts, setStudentReceipts] = useState([]);

  const [newRegistrationDate, setNewRegistrationDate] = useState(null);

  const history = useHistory();

  const studentTaxCode = useLocation().pathname?.split('/').pop();

  const { isSuccess, isLoading, isError } = useQuery(
    [studentTaxCode],
    async () => (await axios.get(`/api/student/getStudentWithReceipts/${studentTaxCode}`)).data,
    {
      onSuccess: (data) => {
        setStudent(data.student);

        setStudentReceipts(data.receipts);
      },
    }
  );

  const onReceiptCreate = (receiptData, receiptId) => {
    setStudentReceipts([...studentReceipts, { ...receiptData, ReceiptID: receiptId, FK_StudentID: student.StudentID }]);

    // If receipt date is created with "RegistrationDate" flag set to true, then update registration date of the student.
    if (receiptData.RegistrationDate) {
      setStudent((s) => ({ ...s, RegistrationDate: receiptData.ReceiptDate }));
    }
  };

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

      {isLoading && <Spinner animation="border" role="status" className="spinner" />}

      {isSuccess && (
        <>
          <div className="student-page">
            <StudentCard key={`${studentTaxCode}-actions`} />

            <CreateReceiptForm key={`${studentTaxCode}-receipt-form`} student={student} onCreateCallback={onReceiptCreate} />
          </div>

          <StudentReceiptsList key={`${studentTaxCode}-receipt-list`} />
        </>
      )}
    </StudentProvider>
  );
};

export default withReactQuery(StudentPage);
