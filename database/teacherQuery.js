const pool = require('./pool');

import { getFormattedDate } from './helpers'

const mappingTeachers = (rows) => {
  const teachers = rows.map(row => {
    return {
      TeacherID: row.InsegnanteID,
      TaxCode: row.CodiceFiscale,
      Name: row.Nome,
      Surname: row.Cognome,
      City: row.Citta,
      Address: row.Indirizzo,
      MobilePhone: row.Cellulare,
      Email: row.Email,
      RegistrationDate: getFormattedDate(row.DataIscrizione),
      CertificateExpirationDate: getFormattedDate(row.DataCertificato),
      DOB: getFormattedDate(row.DataNascita),
      GreenPassExpirationDate: getFormattedDate(row.DataGreenPass),
      BirthPlace: row.LuogoNascita,
      Discipline: row.Disciplina,
      Course: row.Corso,
      School: row.Scuola,
    };
  });
  return teachers;
}

const getTeachers = async () => {
  const [rows] = await pool.execute('SELECT * FROM insegnante');
  const teachers = mappingTeachers(rows);

  return teachers;
}

const getSingleTeacher = async (CodiceFiscale) => {
  const [rows] = await pool.execute('SELECT * FROM insegnante WHERE CodiceFiscale= ?;', [CodiceFiscale]);
  const teacher = mappingTeachers(rows);

  return teacher;
}

const createTeacher = async ({
  TaxCode,
  Name,
  Surname,
  City,
  Address,
  MobilePhone,
  Email,
  RegistrationDate,
  CertificateExpirationDate,
  DOB,
  GreenPassExpirationDate,
  BirthPlace,
  Discipline,
  Course,
  School,
}) => {
  try {
    const RegistrationDateFormatted = getFormattedDate(RegistrationDate);
    const CertificateExpirationDateFormatted = getFormattedDate(CertificateExpirationDate);
    const DOBFormatted = getFormattedDate(DOB);
    const GreenPassExpirationDateFormatted = getFormattedDate(GreenPassExpirationDate);

    await pool.execute(
      'INSERT INTO Insegnante (CodiceFiscale, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizione, DataCertificato, DataNascita, DataGreenPass, LuogoNascita, Disciplina, Corso, Scuola) \
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [TaxCode, Name, Surname, City, Address, MobilePhone, Email, RegistrationDateFormatted, CertificateExpirationDateFormatted, DOBFormatted, GreenPassExpirationDateFormatted, BirthPlace, Discipline, Course, School]
    );
    return 'Insegnante Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare Insegnante!';
  }
}

const updateTeacher = async ({
  TeacherID,
  TaxCode,
  Name,
  Surname,
  City,
  Address,
  MobilePhone,
  Email,
  RegistrationDate,
  CertificateExpirationDate,
  DOB,
  GreenPassExpirationDate,
  BirthPlace,
  Discipline,
  Course,
  School,
}) => {
  try {
    const RegistrationDateFormatted = getFormattedDate(RegistrationDate);
    const CertificateExpirationDateFormatted = getFormattedDate(CertificateExpirationDate);
    const DOBFormatted = getFormattedDate(DOB);
    const GreenPassExpirationDateFormatted = getFormattedDate(GreenPassExpirationDate);

    await pool.execute(
      `UPDATE insegnante SET CodiceFiscale=?, Nome=?, Cognome=?, Citta=?, Indirizzo=?, Cellulare=?, Email=?, DataIscrizione=?, DataCertificato=?, DataNascita=?, DataGreenPass=?, LuogoNascita=?, Disciplina=?, Corso=?, Scuola=? WHERE InsegnanteID=?;`,
      [TaxCode, Name, Surname, City, Address, MobilePhone, Email, RegistrationDateFormatted, CertificateExpirationDateFormatted, DOBFormatted, GreenPassExpirationDateFormatted, BirthPlace, Discipline, Course, School, TeacherID]
    );
    return 'Insegnante Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Insegnante!`;
  }
}

const deleteTeacher = async (TeacherID) => {
  try {
    await pool.execute('DELETE FROM insegnante WHERE InsegnanteID=?;', [TeacherID]);
    return 'Insegnante Eliminata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Insegnante!`;
  }
}

module.exports = {
  getTeachers,
  getSingleTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
};
