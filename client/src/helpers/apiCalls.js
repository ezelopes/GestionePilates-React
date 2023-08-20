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

export { createTeacher, getStudentsWithRegistrationReceipt, getTeachersWithRegistrationReceipt };
