import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers/dates';

import './expiring-students-list.css';
import Translation from '../../common/Translation';

const PAGINATION = 10;

const ExpiringStudentsList = ({ students }) => {
  const [studentsToShow, setStudentsToShow] = useState([]);
  const [next, setNext] = useState(0);

  useEffect(() => {
    setStudentsToShow(students.slice(0, next + PAGINATION));
  }, [next, setStudentsToShow, students]);

  return (
    <Container fluid>
      <div className="title">
        <h3>
          <Translation value="chart.expiringStudentsList.title" replace={{ total: students.length }} />
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
        <Button variant="primary" onClick={() => setNext(next + PAGINATION)} disabled={studentsToShow.length === students.length}>
          <Translation value="buttons.loadMore" />
        </Button>
      </div>
    </Container>
  );
};

ExpiringStudentsList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default ExpiringStudentsList;
