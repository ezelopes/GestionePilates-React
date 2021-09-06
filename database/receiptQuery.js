const pool = require('./pool');
const moment = require('moment');

moment.locale('it');

const mappingReceipt = (rows) => {
  const receipts = rows.map(row => {
    return {
      ReceiptID: row.RicevutaID,
      ReceiptType: row.TipoRicevuta,
      ReceiptDate: moment(row.DataRicevuta).format('YYYY-MM-DD'),
      CourseStartDate: moment(row.DataInizioCorso).format('YYYY-MM-DD'),
      CourseEndDate: moment(row.DataScadenzaCorso).format('YYYY-MM-DD'),
      ReceiptNumber: row.NumeroRicevuta,
      AmountPaid: row.SommaEuro,
      FK_StudentID: row.FK_AllievaID,
      PaymentMethod: row.TipoPagamento,
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
      RegistrationDate: moment(row.DataIscrizione).format('YYYY-MM-DD'),
      CertificateExpirationDate: moment(row.DataCertificato).format('YYYY-MM-DD'),
      DOB: moment(row.DataNascita).format('YYYY-MM-DD'),
      BirthPlace: row.LuogoNascita,
      Discipline: row.Disciplina,
      Course: row.Corso,
      School: row.Scuola,
      ParentName: row.NomeGenitore,
      ParentSurname: row.CognomeGenitore,
      ParentTaxCode: row.CodiceFiscaleGenitore,

      ReceiptNumber: row.NumeroRicevuta,
      AmountPaid: row.SommaEuro,
      PaymentMethod: row.TipoPagamento,
      ReceiptType: row.TipoRicevuta,
      ReceiptDate: moment(row.DataRicevuta).format('YYYY-MM-DD'),
      CourseStartDate: moment(row.DataInizioCorso).format('YYYY-MM-DD'),
      CourseEndDate: moment(row.DataScadenzaCorso).format('YYYY-MM-DD'),
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
  ReceiptDate,
  CourseStartDate,
  CourseEndDate,
  AmountPaid,
  PaymentMethod,
  ReceiptType,
  TaxCode,
  StudentID,
  RegistrationDate
}) => {
  try {
    const ReceiptDateFormatted = moment(ReceiptDate).format('YYYY-MM-DD HH:mm:ss') || null;

    if (ReceiptType.toUpperCase() == 'QUOTA ASSOCIATIVA') {
      await pool.execute(
        'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, SommaEuro, FK_CodiceFiscale, FK_AllievaID, Archiviata) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [ReceiptNumber, PaymentMethod, ReceiptType, ReceiptDateFormatted, AmountPaid, TaxCode, StudentID, false]
      );
      return 'Ricevuta Inserita Correttamente!';
    }
  
    const CourseStartDateFormatted = moment(CourseStartDate).format('YYYY-MM-DD HH:mm:ss') || null;
    const CourseEndDateFormatted = moment(CourseEndDate).format('YYYY-MM-DD HH:mm:ss') || null;

    await pool.execute(
      'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, DataInizioCorso, DataScadenzaCorso, SommaEuro, FK_CodiceFiscale, FK_AllievaID, Archiviata) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [ReceiptNumber, PaymentMethod, ReceiptType, ReceiptDateFormatted, CourseStartDateFormatted, CourseEndDateFormatted, AmountPaid, TaxCode, StudentID, false]
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
  PaymentMethod,
  ReceiptType,
  ReceiptDate,
  CourseStartDate,
  CourseEndDate,
  AmountPaid,
}) => {
  try {
    const ReceiptDateFormatted = moment(ReceiptDate, "DD-MM-YYYY").format('YYYY-MM-DD HH:mm:ss') || null;

    if (ReceiptType.toUpperCase() == 'QUOTA ASSOCIATIVA') {
      await pool.execute(
        'UPDATE ricevuta SET NumeroRicevuta=?, TipoPagamento=?, TipoRicevuta=?, DataRicevuta=?, SommaEuro=? WHERE RicevutaID=?;', 
        [ReceiptNumber, PaymentMethod, ReceiptType, ReceiptDateFormatted, AmountPaid, ReceiptID]
      );
      return 'Ricevuta Aggiornata Correttamente!';
    }
  
    const CourseStartDateFormatted = moment(CourseStartDate, "DD-MM-YYYY").format('YYYY-MM-DD HH:mm:ss') || null;
    const CourseEndDateFormatted = moment(CourseEndDate, "DD-MM-YYYY").format('YYYY-MM-DD HH:mm:ss') || null;
      
    await pool.execute(
      `UPDATE ricevuta SET NumeroRicevuta=?, TipoPagamento=?, TipoRicevuta=?, DataRicevuta=?, DataInizioCorso=?, DataScadenzaCorso=?, SommaEuro=? WHERE RicevutaID=?;`,
      [ReceiptNumber, PaymentMethod, ReceiptType, ReceiptDateFormatted, CourseStartDateFormatted, CourseEndDateFormatted, AmountPaid, ReceiptID]
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
