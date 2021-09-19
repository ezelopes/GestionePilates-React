import React, { createContext, useContext } from 'react'

const TeacherContext = createContext(null)

const useTeacher = () => useContext(TeacherContext)

const TeacherProvider = ({ teacherInfo, children }) => (
    <TeacherContext.Provider value={{ teacherInfo }}>{children}</TeacherContext.Provider>
)

export { TeacherProvider, useTeacher }