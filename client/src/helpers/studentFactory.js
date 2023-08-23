import { ages, courses, disciplines, schools } from '../commondata';

export const studentFactory = (student = {}) => ({
  IsAdult: ages[0].value,
  StudentID: student?.StudentID || null,
  TaxCode: student?.TaxCode || '',
  Name: student?.Name || '',
  Surname: student?.Surname || '',
  City: student?.City || '',
  Address: student?.Address || '',
  MobilePhone: student?.MobilePhone || '',
  Email: student?.Email || '',
  BirthPlace: student?.BirthPlace || '',
  DOB: student?.DOB || '',
  Discipline: student?.Discipline || disciplines[0].value,
  Course: student?.Course || courses[0].value,
  School: student?.School || schools[0].value,
  RegistrationDate: student?.RegistrationDate || '',
  CertificateExpirationDate: student?.CertificateExpirationDate || '',
  ParentTaxCode: student?.ParentTaxCode || '',
  ParentName: student?.ParentName || '',
  ParentSurname: student?.ParentSurname || '',
});
