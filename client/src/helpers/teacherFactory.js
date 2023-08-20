import { courses, disciplines, schools } from '../commondata';

export const teacherFactory = (teacher = {}) => ({
  TeacherID: teacher?.TeacherID || null,
  TaxCode: teacher?.TaxCode || '',
  Name: teacher?.Name || '',
  Surname: teacher?.Surname || '',
  City: teacher?.City || '',
  Address: teacher?.Address || '',
  MobilePhone: teacher?.MobilePhone || '',
  Email: teacher?.Email || '',
  BirthPlace: teacher?.BirthPlace || '',
  DOB: teacher?.DOB || '',
  Discipline: teacher?.Discipline || disciplines[0].value,
  Course: teacher?.Course || courses[0].value,
  School: teacher?.School || schools[0].value,
  RegistrationDate: teacher?.RegistrationDate || '',
  CertificateExpirationDate: teacher?.CertificateExpirationDate || '',
});
