const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/dates');
const { mappingStudents, mappingReceipt } = require('./helpers/mapDatabaseEntries');

const STUDENT_TABLE = 'allieva';
const RECEIPT_TABLE = 'ricevuta';

const getStudents = async () => {
  try {
    const students = await knex(STUDENT_TABLE).select();

    return mappingStudents(students);
  } catch (error) {
    console.log(error);

    return { message: 'Errore nel recuperare i dati delle Allieve!' };
  }
};

const getStudent = async (TaxCode) => {
  try {
    const student = await knex(STUDENT_TABLE).select().where({ CodiceFiscale: TaxCode });

    return mappingStudents(student)[0];
  } catch (error) {
    console.log(error);

    return { message: `Errore nel recuperare i dati dell'Allieva!` };
  }
};

const getStudentWithReceipts = async (TaxCode) => {
  try {
    // Left join always return student info even if no receipts are found.
    const studentWithReceipts = await knex(STUDENT_TABLE)
      .leftJoin(RECEIPT_TABLE, `${STUDENT_TABLE}.AllievaID`, '=', `${RECEIPT_TABLE}.FK_AllievaID`)
      .where({ CodiceFiscale: TaxCode })
      .select();

    const student = mappingStudents(studentWithReceipts)[0];
    const receipts = mappingReceipt(studentWithReceipts);

    return { student, receipts };
  } catch (error) {
    console.log(error);

    return { message: `Errore nel recuperare i dati dell'Allieva!` };
  }
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
  getStudent,
  getStudentWithReceipts,
  createStudent,
  updateStudent,
  updateRegistrationDate,
  deleteStudent,
};
