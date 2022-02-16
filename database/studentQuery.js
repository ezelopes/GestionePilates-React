const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/index');

const STUDENT_TABLE = 'allieva';
const RECEIPT_TABLE = 'ricevuta';

const mappingStudents = (rows) =>
  rows.map((row) => ({
    StudentID: row.AllievaID,
    IsAdult: row.Maggiorenne,
    TaxCode: row.CodiceFiscale,
    Name: row.Nome,
    Surname: row.Cognome,
    City: row.Citta,
    Address: row.Indirizzo,
    MobilePhone: row.Cellulare,
    Email: row.Email,
    BirthPlace: row.LuogoNascita,
    Discipline: row.Disciplina,
    Course: row.Corso,
    School: row.Scuola,
    RegistrationDate: getFormattedDate(row.DataIscrizione),
    CertificateExpirationDate: getFormattedDate(row.DataCertificato),
    DOB: getFormattedDate(row.DataNascita),
    GreenPassExpirationDate: getFormattedDate(row.DataGreenPass),
    ParentTaxCode: row.CodiceFiscaleGenitore,
    ParentName: row.NomeGenitore,
    ParentSurname: row.CognomeGenitore,
  }));

const getStudents = async () => {
  const students = await knex(STUDENT_TABLE).select();

  return mappingStudents(students);
};

// TODO: Get single student should retrieve both student info and their receipts.
// SELECT * FROM allieva INNER JOIN ricevuta ON ricevuta.FK_CodiceFiscale = allieva.CodiceFiscale where allieva.CodiceFiscale = ?;
const getSingleStudent = async (TaxCode) => {
  const student = await knex(STUDENT_TABLE).select().where({ CodiceFiscale: TaxCode });

  return mappingStudents(student)[0];
};

const createStudent = async (studentInfo) => {
  try {
    const newStudentID = await knex(STUDENT_TABLE).insert({
      CodiceFiscale: studentInfo.TaxCode,
      Maggiorenne: studentInfo.IsAdult,
      Nome: studentInfo.Name,
      Cognome: studentInfo.Surname,
      Citta: studentInfo.City,
      Indirizzo: studentInfo.Address,
      Cellulare: studentInfo.MobilePhone,
      Email: studentInfo.Email,
      DataIscrizione: getFormattedDate(studentInfo.RegistrationDate),
      DataCertificato: getFormattedDate(studentInfo.CertificateExpirationDate),
      DataNascita: getFormattedDate(studentInfo.DOB),
      DataGreenPass: getFormattedDate(studentInfo.GreenPassExpirationDate),
      LuogoNascita: studentInfo.BirthPlace,
      Disciplina: studentInfo.Discipline,
      Corso: studentInfo.Course,
      Scuola: studentInfo.School,
      CodiceFiscaleGenitore: studentInfo.ParentTaxCode,
      NomeGenitore: studentInfo.ParentName,
      CognomeGenitore: studentInfo.ParentSurname,
    });

    return { StudentID: newStudentID[0], message: 'Allieva creata correttamente' };
  } catch (error) {
    console.log(error);

    return { message: 'Errore nel creare Allieva!' };
  }
};

const updateStudent = async (studentInfo) => {
  try {
    await knex(STUDENT_TABLE)
      .where({ AllievaID: studentInfo.StudentID })
      .update({
        CodiceFiscale: studentInfo.TaxCode,
        Maggiorenne: studentInfo.IsAdult,
        Nome: studentInfo.Name,
        Cognome: studentInfo.Surname,
        Citta: studentInfo.City,
        Indirizzo: studentInfo.Address,
        Cellulare: studentInfo.MobilePhone,
        Email: studentInfo.Email,
        DataIscrizione: getFormattedDate(studentInfo.RegistrationDate),
        DataCertificato: getFormattedDate(studentInfo.CertificateExpirationDate),
        DataNascita: getFormattedDate(studentInfo.DOB),
        DataGreenPass: getFormattedDate(studentInfo.GreenPassExpirationDate),
        LuogoNascita: studentInfo.BirthPlace,
        Disciplina: studentInfo.Discipline,
        CodiceFiscaleGenitore: studentInfo.ParentTaxCode,
        NomeGenitore: studentInfo.ParentName,
        CognomeGenitore: studentInfo.ParentSurname,
        Corso: studentInfo.Course,
        Scuola: studentInfo.School,
      });

    await knex(RECEIPT_TABLE).where({ FK_AllievaID: studentInfo.StudentID }).update({ FK_CodiceFiscale: studentInfo.TaxCode });

    return { message: 'Allieva Aggiornata Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: `Errore nell'aggiornare Allieva!` };
  }
};

const updateRegistrationDate = async (StudentID, RegistrationDate) => {
  try {
    await knex(STUDENT_TABLE)
      .where({ AllievaID: StudentID })
      .update({ DataIscrizione: getFormattedDate(RegistrationDate) });

    return { message: 'Data Iscrizione Aggiornata Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: `Errore nell'aggiornare Data Iscrizione!` };
  }
};

const deleteStudent = async (StudentID) => {
  try {
    await knex(RECEIPT_TABLE).where({ FK_AllievaID: StudentID }).del();
    await knex(STUDENT_TABLE).where({ AllievaID: StudentID }).del();

    return { message: 'Allieva Eliminata Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: `Errore nell'eliminare Allieva!` };
  }
};

module.exports = {
  getStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  updateRegistrationDate,
  deleteStudent,
};
