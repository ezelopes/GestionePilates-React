const STUDENT_LIST_KEY = 'studentsList';

const addStudentToStorage = (newStudent) => {
  const studentsListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));

  studentsListCached.push(newStudent);

  sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentsListCached));
};

const updateStorageStudent = (updatedStudent) => {
  const studentsListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));

  const updatedList = studentsListCached.map((student) => {
    if (student.StudentID === updatedStudent.StudentID) {
      return updatedStudent;
    }

    return student;
  });

  sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(updatedList));
};

const updateStorageStudentRegistrationDate = (studentId, newStudentRegistrationDate) => {
  const studentListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));

  const studentIndex = studentListCached.findIndex((student) => student.StudentID === studentId);

  if (studentIndex !== -1) {
    studentListCached[studentIndex].RegistrationDate = newStudentRegistrationDate || null;
    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentListCached));
  }
};

const deleteStudentFromStorage = (studentId) => {
  const studentListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));

  const updatedStudentList = studentListCached.filter((student) => student.StudentID !== studentId);

  sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(updatedStudentList));
};

export { addStudentToStorage, updateStorageStudent, updateStorageStudentRegistrationDate, deleteStudentFromStorage };
