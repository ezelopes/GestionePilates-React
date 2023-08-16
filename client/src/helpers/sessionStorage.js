const STUDENT_LIST_KEY = 'studentsList';

const updateStorageStudentRegistrationDate = (studentId, newStudentRegistrationDate) => {
  const studentListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));

  const studentIndex = studentListCached.findIndex((student) => student.StudentID === studentId);

  if (studentIndex !== -1) {
    studentListCached[studentIndex].RegistrationDate = newStudentRegistrationDate || null;
    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentListCached));
  }
};

export { updateStorageStudentRegistrationDate };
