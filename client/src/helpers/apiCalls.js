import produce from 'immer';

const STUDENT_LIST_KEY = 'studentsList';
const studentListCached = JSON.parse(sessionStorage.getItem(STUDENT_LIST_KEY));
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const createStudent = async (newStudent) => {
  const response = await fetch('/api/student/createStudent', {
    method: 'PUT',
    headers,
    body: JSON.stringify(newStudent),
  });

  const responseParsed = await response.json();

  if (response.status === 200) {
    const { StudentID } = responseParsed;

    const newStudentWithID = produce(newStudent, (draft) => {
      draft.StudentID = StudentID;
    });

    studentListCached.push(newStudentWithID);
    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentListCached));
  }

  return { status: response.status, message: responseParsed.message };
};

const createTeacher = async (newTeacher) => {
  const response = await fetch('/api/teacher/createTeacher', {
    method: 'PUT',
    headers,
    body: JSON.stringify(newTeacher),
  });

  const responseParsed = await response.json();
  return { status: response.status, message: responseParsed.message };
};

const updateTeacher = async (updatedTeacherInfo) => {
  const response = await fetch('/api/teacher/updateTeacher', {
    method: 'POST',
    headers,
    body: JSON.stringify(updatedTeacherInfo),
  });

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message };
};

const updateRegistrationDate = async (StudentID, RegistrationDate) => {
  const response = await fetch('/api/student/updateRegistrationDate', {
    method: 'POST',
    headers,
    body: JSON.stringify({ StudentID, RegistrationDate }),
  });

  const responseParsed = await response.json();

  if (response.status === 200) {
    let updatedStudent = null;

    for (let i = 0; i < studentListCached.length; i += 1) {
      if (StudentID === studentListCached[i].StudentID) {
        studentListCached[i].RegistrationDate = RegistrationDate || null;
        updatedStudent = studentListCached[i];
        break;
      }
    }

    sessionStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentListCached));
    return { status: response.status, message: responseParsed.message, updatedStudent };
  }
  return { status: response.status, message: responseParsed.message };
};

const deleteTeacher = async (TeacherID) => {
  const response = await fetch('/api/teacher/deleteTeacher', {
    method: 'DELETE',
    headers,
    body: JSON.stringify({
      TeacherID,
    }),
  });

  const responseParsed = await response.json();

  return { status: response.status, message: responseParsed.message };
};

const getAllTeachers = async () => {
  const result = await fetch('/api/teacher/getTeachers');
  const body = await result.json();

  return { teachers: body };
};

const getStudentsWithRegistrationReceipt = async (Year) => {
  const response = await fetch(`/api/student/getStudentsWithRegistrationReceipt/${Year}`);
  const { studentsWithRegistrationReceipt } = await response.json();

  return studentsWithRegistrationReceipt;
};

const getTeachersWithRegistrationReceipt = async (Year) => {
  const response = await fetch(`/api/teacher/getTeachersWithRegistrationDate/${Year}`);
  const teachers = await response.json();

  return teachers;
};

export {
  createStudent,
  createTeacher,
  updateRegistrationDate,
  updateTeacher,
  deleteTeacher,
  getAllTeachers,
  getStudentsWithRegistrationReceipt,
  getTeachersWithRegistrationReceipt,
};
