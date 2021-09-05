const pool = require('./pool');
const moment = require('moment');

const mappingReceipt = (rows) => {
  const receipts = rows.map(row => {
    return {
      ReceiptID: row.RicevutaID,
      ReceiptType: row.TipoRicevuta,
      ReceiptDate: moment(row.DataRicevuta).format('DD-MM-YYYY'),
      CourseStartDate: moment(row.DataInizioCorso).format('DD-MM-YYYY'),
      CourseEndDate: moment(row.DataScadenzaCorso).format('DD-MM-YYYY'),
      ReceiptNumber: row.NumeroRicevuta,
      AmountPaid: row.SommaEuro,
      FK_StudentID: row.FK_AllievaID,
      PaymentType: row.TipoPagamento,
      Archived: row.Archiviata
    };
  });
  return receipts;
}
  
const mappingAllReceipts = (rows) => {
  const receipts = rows.map(row => {
    return {
      IsAdult: row.Maggiorenne,
      TaxCode: row.CodiceFiscale,
      Name: row.Nome,
      Surname: row.Cognome,
      City: row.Citta,
      Address: row.Indirizzo,
      MobilePhone: row.Cellulare,
      Email: row.Email,
      RegistrationDate: moment(row.DataIscrizione).format('DD-MM-YYYY'),
      CertificateExpirationDate: moment(row.DataCertificato).format('DD-MM-YYYY'),
      DOB: moment(row.DataNascita).format('DD-MM-YYYY'),
      BirthPlace: row.LuogoNascita,
      Discipline: row.Disciplina,
      Course: row.Corso,
      School: row.Scuola,
      ParentName: row.NomeGenitore,
      ParentSurname: row.CognomeGenitore,
      ParentTaxCode: row.CodiceFiscaleGenitore,

      ReceiptNumber: row.NumeroRicevuta,
      AmountPaid: row.SommaEuro,
      PaymentType: row.TipoPagamento,
      ReceiptType: row.TipoRicevuta,
      ReceiptDate: moment(row.DataRicevuta).format('DD-MM-YYYY'),
      CourseStartDate: moment(row.DataInizioCorso).format('DD-MM-YYYY'),
      CourseEndDate: moment(row.DataScadenzaCorso).format('DD-MM-YYYY'),
    };
  });
  return receipts;
}

const getStudentReceipts = async (TaxCode) => {
  const [rows] = await pool.execute('SELECT * FROM Ricevuta WHERE FK_CodiceFiscale = ?', [TaxCode]);
  const receipts = mappingReceipt(rows);
  
  return receipts;
}

const getAllReceipts = async () => {
  const [rows] = await pool.execute(
    'SELECT * \
    FROM ricevuta \
    INNER JOIN allieva \
    ON ricevuta.FK_AllievaID = allieva.AllievaID;'
  );
  const receipts = mappingAllReceipts(rows);
  
  return receipts;
}

const createReceipt = async ({
  ReceiptNumber,
  PaymentType,
  ReceiptType,
  ReceiptDate,
  CourseStartDate,
  CourseEndDate,
  AmountPaid,
  CodiceFiscale,
  StudentID,
  RegistrationDate
}) => {
  try {
    const ReceiptDateFormatted = moment(ReceiptDate).format('YYYY-MM-DD HH:mm:ss');
    if (ReceiptType.toUpperCase() == 'QUOTA ASSOCIATIVA') {
      await pool.execute(
        'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, SommaEuro, FK_CodiceFiscale, FK_AllievaID, Archiviata) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [ReceiptNumber, PaymentType, ReceiptType, ReceiptDateFormatted, AmountPaid, CodiceFiscale, StudentID, false]
      );
      return 'Ricevuta Inserita Correttamente!';
    }
  
    let CourseStartDateFormatted = moment(CourseStartDate).format('YYYY-MM-DD HH:mm:ss');
    let CourseEndDateFormatted = moment(CourseEndDate).format('YYYY-MM-DD HH:mm:ss');
  
    await pool.execute(
      'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, DataInizioCorso, DataScadenzaCorso, SommaEuro, FK_CodiceFiscale, FK_AllievaID, Archiviata) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [ReceiptNumber, PaymentType, ReceiptType, ReceiptDateFormatted, CourseStartDateFormatted, CourseEndDateFormatted, AmountPaid, CodiceFiscale, AllievaID, false]
    );

    if (RegistrationDate === true) {
      await pool.execute(
        `UPDATE Allieva SET DataIscrizione=? WHERE AllievaID=?;`,
        [CourseStartDateFormatted, StudentID]
      );
    }

    return 'Ricevuta Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare la Ricevuta!';
  }
}
  
const updateReceipt = async({
  ReceiptID,
  ReceiptNumber,
  PaymentType,
  ReceiptType,
  ReceiptDate,
  CourseStartDate,
  CourseEndDate,
  AmountPaid,
}) => {
  try {
    const ReceiptDateFormatted = moment(ReceiptDate).format('YYYY-MM-DD HH:mm:ss');
  
    if (ReceiptType.toUpperCase() == 'QUOTA ASSOCIATIVA') {
      await pool.execute(
        'UPDATE ricevuta SET NumeroRicevuta=?, TipoPagamento=?, TipoRicevuta=?, DataRicevuta=?, SommaEuro=? WHERE RicevutaID=?;', 
        [ReceiptNumber, PaymentType, ReceiptType, ReceiptDateFormatted, AmountPaid, ReceiptID]
      );
      return 'Ricevuta Aggiornata Correttamente!';
    }
  
    const CourseStartDateFormatted = moment(CourseStartDate).format('YYYY-MM-DD HH:mm:ss');
    const CourseEndDateFormatted = moment(CourseEndDate).format('YYYY-MM-DD HH:mm:ss');
      
    await pool.execute(
      `UPDATE ricevuta SET NumeroRicevuta=?, TipoPagamento=?, TipoRicevuta=?, DataRicevuta=?, DataInizioCorso=?, DataScadenzaCorso=?, SommaEuro=? WHERE RicevutaID=?;`,
      [ReceiptNumber, PaymentType, ReceiptType, ReceiptDateFormatted, CourseStartDateFormatted, CourseEndDateFormatted, AmountPaid, ReceiptID]
    );
    return 'Ricevuta Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Ricevuta!`;
  }
} 

const deleteReceipt = async (ReceiptID) => {
  try {
    await pool.execute('DELETE FROM Ricevuta WHERE RicevutaID=?;', [ReceiptID])

    return 'Ricevuta Eliminata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Ricevute!`;
  }
}

module.exports = {
  getStudentReceipts,
  getAllReceipts,
  createReceipt,
  updateReceipt,
  deleteReceipt
};
