const endpoints = {
  student: {
    getSingleWithReceipts: '/api/student/getStudentWithReceipts',
    getMultiple: '/api/student/getStudents',
    getMultipleWithRegistrationReceipt: '/api/student/getStudentsWithRegistrationReceipt',
    create: '/api/student/createStudent',
    update: '/api/student/updateStudent',
    updateRegistrationDate: '/api/student/updateRegistrationDate',
    delete: '/api/student/deleteStudent',
  },
  teacher: {
    getMultiple: '/api/teacher/getTeachers',
    getMultipleWithRegistrationDate: '/api/teacher/getTeachersWithRegistrationDate',
    create: '/api/teacher/createTeacher',
    update: '/api/teacher/updateTeacher',
    delete: '/api/teacher/deleteTeacher',
  },
  receipt: {
    getMultiple: '/api/receipt/getAllReceipts',
    create: '/api/receipt/createReceipt',
    update: '/api/receipt/updateReceipt',
    delete: '/api/receipt/deleteReceipt',
    deleteMultiple: '/api/receipt/deleteReceipts',
  },
};

export default endpoints;
