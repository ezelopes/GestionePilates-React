const pool = require('./pool');
const moment = require('moment');

const mappingStudents = (rows) => {
  const students = rows.map(row => {
    return {
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
      RegistrationDate: moment(row.DataIscrizione).format('DD-MM-YYYY'),
      CertificateExpirationDate: moment(row.DataCertificato).format('DD-MM-YYYY'),
      DOB: moment(row.DataNascita).format('DD-MM-YYYY'),
      GreenPassExpirationDate: moment(row.DataGreenPass).format('DD-MM-YYYY'),
      ParentTaxCode: row.NomeGenitore,
      ParentName: row.CognomeGenitore,
      ParentSurname: row.CodiceFiscaleGenitore
    };
  });
  return students;
}

const countStudentReceiptsAmount = async (StudentID) => {
  const [rows] = await pool.execute('SELECT RicevutaID FROM Ricevuta WHERE FK_AllievaID = ? LIMIT 1', [StudentID]);
  return rows.length;
}

const getStudents = async () => {
  const [rows] = await pool.execute('SELECT * FROM allieva');
  const students = mappingStudents(rows);
  
  return students;
}

const getSingleStudent = async (TaxCode) => {
  const [rows] = await pool.execute('SELECT * FROM allieva WHERE CodiceFiscale= ?;', [TaxCode]);
  const student = mappingStudents(rows);
  
  return student[0];
}

const createStudent = async ({
  IsAdult,
  TaxCode,
  Name,
  Surname,
  City,
  Address,
  MobilePhone,
  Email,
  BirthPlace,
  Discipline,
  Course,
  School,
  RegistrationDate,
  CertificateExpirationDate,
  DOB,
  GreenPassExpirationDate,
  ParentTaxCode,
  ParentName,
  ParentSurname
}) => {
  try {
    const RegistrationDateFormatted = moment(RegistrationDate).format('YYYY-MM-DD');
    const CertificateExpirationDateFormatted = moment(CertificateExpirationDate).format('YYYY-MM-DD');
    const DOBFormatted = moment(DOB).format('YYYY-MM-DD');
    const GreenPassExpirationDateFormatted = moment(GreenPassExpirationDate).format('YYYY-MM-DD');

    await pool.execute(
      'INSERT INTO Allieva (CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizione, DataCertificato, DataNascita, DataGreenPass, LuogoNascita, Disciplina, Corso, Scuola, CodiceFiscaleGenitore, NomeGenitore, CognomeGenitore) \
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [TaxCode, IsAdult, Name, Surname, City, Address, MobilePhone, Email, RegistrationDateFormatted, CertificateExpirationDateFormatted, DOBFormatted, GreenPassExpirationDateFormatted, BirthPlace, Discipline, Course, School, ParentTaxCode, ParentName, ParentSurname]
    );
  
    const [rowsSelect] = await pool.execute('SELECT AllievaID FROM Allieva WHERE CodiceFiscale = ?', [TaxCode])
    const StudentID = rowsSelect[0].AllievaID;
  
    return StudentID;
  } catch (error) {
    console.log(error);
    return 'Errore nel creare Allieva!';
  }
}

const updateStudent = async ({
  StudentID,
  IsAdult,
  TaxCode,
  Name,
  Surname,
  City,
  Address,
  MobilePhone,
  Email,
  BirthPlace,
  Discipline,
  Course,
  School,
  RegistrationDate,
  CertificateExpirationDate,
  DOB,
  GreenPassExpirationDate,
  ParentTaxCode,
  ParentName,
  ParentSurname}) => {
  try {

    const RegistrationDateFormatted = moment(RegistrationDate).format('YYYY-MM-DD');
    const CertificateExpirationDateFormatted = moment(CertificateExpirationDate).format('YYYY-MM-DD');
    const DOBFormatted = moment(DOB).format('YYYY-MM-DD');
    const GreenPassExpirationDateFormatted = moment(GreenPassExpirationDate).format('YYYY-MM-DD');

    const receiptsAmount = await countStudentReceiptsAmount(StudentID);
  
    if (receiptsAmount > 0) {
      await pool.execute(
        `UPDATE Allieva, Ricevuta SET Allieva.CodiceFiscale=?, Allieva.Maggiorenne=?, Allieva.Nome=?, Allieva.Cognome=?, Allieva.Citta=?, Allieva.Indirizzo=?, Allieva.Cellulare=?, Allieva.Email=?, Allieva.DataIscrizione=?, Allieva.DataCertificato=?, Allieva.DataNascita=?, Allieva.DataGreenPass=?, Allieva.LuogoNascita=?, Allieva.Disciplina=?, Allieva.CodiceFiscaleGenitore=?, Allieva.NomeGenitore=?, Allieva.CognomeGenitore=?, Allieva.Corso=?, Allieva.Scuola=?, Ricevuta.FK_CodiceFiscale=? WHERE Allieva.AllievaID=? AND Ricevuta.FK_AllievaID=?;`,
        [TaxCode, IsAdult, Name, Surname, City, Address, MobilePhone, Email, RegistrationDateFormatted, CertificateExpirationDateFormatted, DOBFormatted, GreenPassExpirationDateFormatted, BirthPlace, Discipline, ParentTaxCode, ParentName, ParentSurname, Course, School, TaxCode, StudentID, StudentID]
      );
    } else {
      await pool.execute(
        `UPDATE Allieva SET CodiceFiscale=?, Maggiorenne=?, Nome=?, Cognome=?, Citta=?, Indirizzo=?, Cellulare=?, Email=?, DataIscrizione=?, DataCertificato=?, DataNascita=?, DataGreenPass=?, LuogoNascita=?, Disciplina=?, CodiceFiscaleGenitore=?, NomeGenitore=?, CognomeGenitore=?, Corso=?, Scuola=? WHERE AllievaID=?;`,
        [TaxCode, IsAdult, Name, Surname, City, Address, MobilePhone, Email, RegistrationDateFormatted, CertificateExpirationDateFormatted, DOBFormatted, GreenPassExpirationDateFormatted, BirthPlace, Discipline, ParentTaxCode, ParentName, ParentSurname, Course, School, StudentID]
      );
    }
  
    return 'Allieva Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Allieva!`;
  }
}

const updateRegistrationDate = async (RegistrationDate, StudentID) => {
  try {    
    const RegistrationDateFormatted = moment(RegistrationDate).format('YYYY-MM-DD');

    await pool.execute(`UPDATE Allieva SET DataIscrizione = ? WHERE AllievaID = ?;`, [RegistrationDateFormatted, StudentID]);
    return 'Data Iscrizione Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Data Iscrizione!`;
  }
}

const deleteStudent = async (StudentID) => {
  try {
    await pool.execute('DELETE FROM ricevuta WHERE FK_AllievaID=?;', [StudentID]);
    await pool.execute('DELETE FROM allieva WHERE AllievaID=?;', [StudentID]);
    return 'Allieva Eliminata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Allieva!`;
  }
}

module.exports = {
  getStudents,
  getSingleStudent,  
  createStudent,  
  updateStudent,  
  updateRegistrationDate,
  deleteStudent,
};