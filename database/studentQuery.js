const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/dates');
const { mappingStudents, mappingReceipt, mappingReceiptsWithStudentInfo } = require('./helpers/mapDatabaseEntries');
const { studentResponseMessages } = require('./helpers/responses');

const STUDENT_TABLE = 'allieva';
const RECEIPT_TABLE = 'ricevuta';

const getStudents = async () => {
  try {
    const students = await knex(STUDENT_TABLE).select();

    return mappingStudents(students);
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.getMultiple };
  }
};

const getStudent = async (TaxCode) => {
  try {
    const student = await knex(STUDENT_TABLE).select().where({ CodiceFiscale: TaxCode });

    return mappingStudents(student)[0];
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.getSingle };
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

    return { message: studentResponseMessages.error.getSingle };
  }
};

const getStudentsWithRegistrationReceipt = async (year) => {
  try {
    const from = `${year}-09-01`;
    const to = `${year + 1}-06-30`; // ? `${year + 1}-08-31`

    const studentWithReceipts = await knex(`${STUDENT_TABLE} as a`)
      .select(
        'a.CodiceFiscale',
        'a.Nome',
        'a.Cognome',
        'a.Citta',
        'a.Indirizzo',
        'a.DataNascita',
        'a.LuogoNascita',
        'r.DataRicevuta',
        'r.NumeroRicevuta'
      )
      .join(
        `${RECEIPT_TABLE} as r`,
        `r.FK_AllievaID`,
        '=',
        knex.raw(
          `(SELECT ric.FK_AllievaID
            FROM ricevuta AS ric
            WHERE a.AllievaID = ric.FK_AllievaID
            AND r.NumeroRicevuta NOT LIKE 'C%'
            AND (r.DataRicevuta BETWEEN '${from}' AND '${to}')
            ORDER BY ric.DataRicevuta LIMIT 1)`
        )
      )
      .groupBy(`a.CodiceFiscale`)
      .orderBy(`r.DataRicevuta`, 's.Nome', 's.Cognome');

    return mappingReceiptsWithStudentInfo(studentWithReceipts);
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.getMultiple };
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

    return { StudentID: newStudentID[0], message: studentResponseMessages.ok.create };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.create };
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

    return { message: studentResponseMessages.ok.update };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.update };
  }
};

const updateRegistrationDate = async (StudentID, RegistrationDate) => {
  try {
    await knex(STUDENT_TABLE)
      .where({ AllievaID: StudentID })
      .update({ DataIscrizione: getFormattedDate(RegistrationDate) });

    return { message: studentResponseMessages.ok.updateRegistration };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.updateRegistration };
  }
};

const deleteStudent = async (StudentID) => {
  try {
    await knex(RECEIPT_TABLE).where({ FK_AllievaID: StudentID }).del();
    await knex(STUDENT_TABLE).where({ AllievaID: StudentID }).del();

    return { message: studentResponseMessages.ok.delete };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.delete };
  }
};

module.exports = {
  getStudents,
  getStudent,
  getStudentWithReceipts,
  getStudentsWithRegistrationReceipt,
  createStudent,
  updateStudent,
  updateRegistrationDate,
  deleteStudent,
};
