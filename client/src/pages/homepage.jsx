import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import StudentCountChart from '../components/charts/StudentCountChart';
import { getAllStudents, getAllReceipts } from '../helpers/apiCalls';
import { isMembershipFee } from '../commondata';

import IncomePerCourseChart from '../components/charts/IncomePerCourseChart';
import ExpiringStudentsList from '../components/charts/ExpiringStudentsList';
import { isDateBetweenTwoDates } from '../helpers/dates';
import { printStudentsWithRegistrationReceipt } from '../helpers/printPDF';

const HomePage = () => {
  const [receiptsWithStudentInfo, setReceiptsWithStudentInfo] = useState([]);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { receipts } = await getAllReceipts();

      const { allStudents } = await getAllStudents();

      setStudents(allStudents);

      const filteredReceipts = receipts.filter(({ ReceiptType }) => !isMembershipFee(ReceiptType));

      setReceiptsWithStudentInfo(filteredReceipts);
    };

    fetchData();
  }, []);

  const today = new Date();

  const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

  const { expiringStudents } = students.reduce(
    (accumulator, student) => {
      if (isDateBetweenTwoDates(today, nextMonth, new Date(student.CertificateExpirationDate))) {
        accumulator.expiringStudents.push({ ...student, hasExpired: false });
      }

      if (today > new Date(student.CertificateExpirationDate)) {
        accumulator.expiringStudents.push({ ...student, hasExpired: true });
      }

      return accumulator;
    },
    {
      expiringStudents: [],
    }
  );

  const sortedExpiringStudents = expiringStudents.sort(
    (a, b) => new Date(b.CertificateExpirationDate) - new Date(a.CertificateExpirationDate)
  );

  return (
    <Container>
      <Row>
        <Col>
          <Container fluid>
            <div className="buttons-container mt-0">
              <Button onClick={() => printStudentsWithRegistrationReceipt(2021)}>Hello</Button>
            </div>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <StudentCountChart receiptsWithStudentInfo={receiptsWithStudentInfo} />
        </Col>
        <Col>
          <IncomePerCourseChart receiptsWithStudentInfo={receiptsWithStudentInfo} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ExpiringStudentsList students={sortedExpiringStudents} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
