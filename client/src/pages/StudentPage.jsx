import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

import NotFoundPage from './NotFoundPage';

import { StudentProvider } from '../components/student/StudentContext';
import StudentReceiptsList from '../components/student/StudentReceiptsList';
import StudentCard from '../components/student/StudentCard';
import UpsertReceiptForm from '../components/receipts/UpsertReceiptForm';
import Translation from '../components/common/Translation';

import { createReceipt, getStudentWithReceipts } from '../helpers/apiCalls';

import '../styles/student-page.css';

const StudentPage = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({});
  const [studentReceipts, setStudentReceipts] = useState([]);

  const [newRegistrationDate, setNewRegistrationDate] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const { student, receipts } = await getStudentWithReceipts(match.params.TaxCode);

      setStudentInfo(student);
      setNewRegistrationDate(student?.RegistrationDate);
      setStudentReceipts(receipts);

      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!studentInfo) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <Spinner animation="border" role="status" className="spinner" />;
  }

  return (
    <StudentProvider
      studentInfo={studentInfo}
      studentReceipts={studentReceipts}
      setStudentInfo={setStudentInfo}
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
          <UpsertReceiptForm isForCreating callback={createReceipt} />
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

export default StudentPage;
