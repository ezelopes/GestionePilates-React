const pool = require('./pool');
const moment = require('moment');

moment.locale('it');

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
      RegistrationDate: moment(row.DataIscrizione).format('YYYY-MM-DD'),
      CertificateExpirationDate: moment(row.DataCertificato).format('YYYY-MM-DD'),
      DOB: moment(row.DataNascita).format('YYYY-MM-DD'),
      GreenPassExpirationDate: moment(row.DataGreenPass).format('YYYY-MM-DD'),
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
    const RegistrationDateFormatted = moment(RegistrationDate).format('YYYY-MM-DD HH:mm:ss') || null;
    const CertificateExpirationDateFormatted = moment(CertificateExpirationDate).format('YYYY-MM-DD HH:mm:ss') || null;
    const DOBFormatted = moment(DOB).format('YYYY-MM-DD HH:mm:ss') || null;
    const GreenPassExpirationDateFormatted = moment(GreenPassExpirationDate).format('YYYY-MM-DD HH:mm:ss') || null;

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
    const RegistrationDateFormatted = moment(RegistrationDate).format('YYYY-MM-DD HH:mm:ss') || null;
    const CertificateExpirationDateFormatted = moment(CertificateExpirationDate).format('YYYY-MM-DD HH:mm:ss') || null;
    const DOBFormatted = moment(DOB).format('YYYY-MM-DD HH:mm:ss') || null;
    const GreenPassExpirationDateFormatted = moment(GreenPassExpirationDate).format('YYYY-MM-DD HH:mm:ss') || null;

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
