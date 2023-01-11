import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Translation from '../../common/Translation';

import { printStudentsWithRegistrationReceipt } from '../../../helpers/printPDF';

const ReportSummary = () => {
  const yearRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    printStudentsWithRegistrationReceipt(yearRef.current.value);
  };

  return (
    <Container fluid>
      <Form className="mt-0" onSubmit={handleSubmit}>
        <h3>
          <Translation value="chart.reportSummary.title" />
        </h3>
        <Form.Label htmlFor="registration_year">
          <Translation value="chart.reportSummary.selectYear" />
        </Form.Label>
        <input
          id="registration_year"
          type="number"
          defaultValue={new Date().getFullYear() - 1}
          min="2018"
          className="form-control w-25"
          ref={yearRef}
        />
        <Button className="mt-3" type="submit" variant="success">
          🖨️ <Translation value="buttons.student.printStudents" />
        </Button>
      </Form>
    </Container>
  );
};

export default ReportSummary;
