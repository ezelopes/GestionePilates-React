import React from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useQuery } from 'react-query';
import StudentCountChart from '../components/charts/StudentCountChart';
import { isSubscriptionFee } from '../commondata';

import IncomePerCourseChart from '../components/charts/IncomePerCourseChart';
import ExpiringStudentsList from '../components/charts/ExpiringStudentsList';
import ReportSummary from '../components/charts/ReportSummary';
import { withReactQuery } from '../components/common/withReactQuery/withReactQuery';
import Translation from '../components/common/Translation';

const HomePage = () => {
  const cachedStudents = JSON.parse(sessionStorage.getItem('studentsList'));

  const {
    data: students,
    isLoading: isStudentsLoading,
    isError: isStudentsError,
  } = useQuery(['students'], async () => (await axios.get('/api/student/getStudents')).data, {
    enabled: !cachedStudents || cachedStudents.length === 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      sessionStorage.setItem('studentsList', JSON.stringify(data));
    },
  });

  const {
    data: receipts,
    isLoading: isReceiptsLoading,
    isError: isReceiptsError,
  } = useQuery(['receipts'], async () => (await axios.get('/api/receipt/getAllReceipts')).data, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // TODO: Make API call that returns only Subscription Fees
  // Only subscription fees are needed for statistics
  const filteredReceipts = receipts?.filter(({ ReceiptType }) => isSubscriptionFee(ReceiptType));

  // TODO: Apply spinner in the corresponding places rather than on the whole page.
  if (isStudentsLoading || isReceiptsLoading) {
    return <Spinner animation="border" role="status" className="spinner" />;
  }

  if (isStudentsError || isReceiptsError) {
    return (
      <Alert variant="danger">
        <Translation value="common.requestFailed" />
      </Alert>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <StudentCountChart receiptsWithStudentInfo={filteredReceipts} />
        </Col>
        <Col>
          <IncomePerCourseChart receiptsWithStudentInfo={filteredReceipts} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ReportSummary />
        </Col>
      </Row>
      <Row>
        <Col>
          <ExpiringStudentsList students={cachedStudents || students} />
        </Col>
      </Row>
    </Container>
  );
};

export default withReactQuery(HomePage);
