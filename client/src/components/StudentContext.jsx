import React, { createContext, useContext } from 'react'

const StudentContext = createContext(null)

const useStudent = () => useContext(StudentContext)

const StudentProvider = ({ studentInfo, studentReceipts, setStudentReceipts, children }) => (
    <StudentContext.Provider value={{ studentInfo, studentReceipts, setStudentReceipts }}>{children}</StudentContext.Provider>
)

export { StudentProvider, useStudent }