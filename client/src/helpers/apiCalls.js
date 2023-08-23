import endpoints from '../commondata/endpoints.config';

const getStudentsWithRegistrationReceipt = async (Year) => {
  const response = await fetch(`${endpoints.student.getMultipleWithRegistrationReceipt}/${Year}`);
  const { studentsWithRegistrationReceipt } = await response.json();

  return studentsWithRegistrationReceipt;
};

const getTeachersWithRegistrationReceipt = async (Year) => {
  const response = await fetch(`${endpoints.teacher.getMultipleWithRegistrationDate}/${Year}`);
  const teachers = await response.json();

  return teachers;
};

export { getStudentsWithRegistrationReceipt, getTeachersWithRegistrationReceipt };
