import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDate, isDateBetweenTwoDates } from '../../../helpers/dates';

import './expiring-students-list.css';
import Translation from '../../common/Translation';

const PAGINATION = 10;

const ExpiringStudentsList = ({ students }) => {
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

  const [studentsToShow, setStudentsToShow] = useState(sortedExpiringStudents.slice(0, 10));

  const [next, setNext] = useState(10);

  const showMore = () => {
    setStudentsToShow(sortedExpiringStudents.slice(0, next + PAGINATION));

    setNext(next + PAGINATION);
  };

  return (
    <Container fluid>
      <div className="title">
        <h3>
          <Translation value="chart.expiringStudentsList.title" replace={{ total: expiringStudents.length }} />
        </h3>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <Translation value="chart.expiringStudentsList.table.name" />
              </th>
              <th>
                <Translation value="chart.expiringStudentsList.table.certificateExpirationDate" />
              </th>
              <th>
                <Translation value="chart.expiringStudentsList.table.status" />
              </th>
            </tr>
          </thead>
          <tbody className="expiring-student-table">
            {studentsToShow.map((student) => (
              <tr key={student.TaxCode}>
                <td>
                  <Link to={`/students/${student.TaxCode}`}>{`${student.Name} ${student.Surname}`}</Link>
                </td>
                <td>{formatDate(new Date(student.CertificateExpirationDate))}</td>
                <td>
                  {student.hasExpired ? (
                    <Translation value="chart.expiringStudentsList.table.expired" />
                  ) : (
                    <Translation value="chart.expiringStudentsList.table.expiring" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="load-more-button">
        <Button variant="primary" onClick={showMore} disabled={studentsToShow.length === expiringStudents.length}>
          <Translation value="buttons.loadMore" />
        </Button>
      </div>
    </Container>
  );
};

ExpiringStudentsList.propTypes = {
  /**
   * List of students.
   */
  students: PropTypes.array.isRequired,
};

export default ExpiringStudentsList;
