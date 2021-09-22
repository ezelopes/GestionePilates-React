import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const TeacherContext = createContext(null)

const useTeacher = () => useContext(TeacherContext)

const TeacherProvider = ({ teacherInfo, children }) => (
    <TeacherContext.Provider value={{ teacherInfo }}>{children}</TeacherContext.Provider>
)

TeacherProvider.propTypes = {
	teacherInfo: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
}

export { TeacherProvider, useTeacher }
