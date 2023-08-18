const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
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
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeachers,
  getStudentsWithRegistrationReceipt,
  getTeachersWithRegistrationReceipt,
};
