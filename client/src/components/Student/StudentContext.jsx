import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const StudentContext = createContext(null);

const useStudent = () => useContext(StudentContext);

const StudentProvider = ({ studentInfo, studentReceipts, setStudentReceipts, children }) => (
  <StudentContext.Provider value={{ studentInfo, studentReceipts, setStudentReceipts }}>{children}</StudentContext.Provider>
);

StudentProvider.propTypes = {
  studentInfo: PropTypes.object.isRequired,
  studentReceipts: PropTypes.array.isRequired,
  setStudentReceipts: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export { StudentProvider, useStudent };
