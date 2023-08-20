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

export { getStudentsWithRegistrationReceipt, getTeachersWithRegistrationReceipt };
