import React from 'react';
import PropTypes from 'prop-types';

import { isDateBetweenTwoDates } from '../../../helpers/dates';

import './expiring-students-list.css';

// TODO: ADD SELECTION FOR MONTH

const ExpiringStudentsList = ({ students }) => {
  const today = new Date();

  const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

  // GET ALL STUDENTS WHOSE CERITFICATE IS ABOUT TO EXPIRE. USE STUDENT LIST INSTEAD OF RECEIPT LIST TO AVOID DUPLICATES.
  const expiringStudents = students
    .flatMap((student) => {
      if (isDateBetweenTwoDates(today, nextMonth, new Date(student.CertificateExpirationDate))) {
        return student;
      }

      return null;
    })
    .filter((student) => !!student);

  return (
    <div className="container-fluid" style={{ width: 'fit-content' }}>
      <h3>Allieve con certificato in scadenza</h3> <br />
      {expiringStudents.map((student) => (
        <div key={student.TaxCode} className="expiringStudentRow">
          <span>
            {student.Name} {student.Surname}{' '}
          </span>
          <span>{student.CertificateExpirationDate}</span>
        </div>
      ))}
    </div>
  );
};

ExpiringStudentsList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default ExpiringStudentsList;
