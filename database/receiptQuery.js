const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/index');

const receiptType = [{ type: 'Quota' }, { type: 'Quota Associativa' }];

const STUDENT_TABLE = 'allieva';
const RECEIPT_TABLE = 'ricevuta';

const mappingReceipt = (rows) =>
  rows.map((row) => ({
    ReceiptID: row.RicevutaID,
    ReceiptType: row.TipoRicevuta,
    ReceiptDate: getFormattedDate(row.DataRicevuta),
    CourseStartDate: getFormattedDate(row.DataInizioCorso),
    CourseEndDate: getFormattedDate(row.DataScadenzaCorso),
    ReceiptNumber: row.NumeroRicevuta,
    AmountPaid: row.SommaEuro,
    FK_StudentID: row.FK_AllievaID,
    PaymentMethod: row.TipoPagamento,
    IncludeMembershipFee: Boolean(row.IncludeMembershipFee),
  }));

const mappingAllReceipts = (rows) =>
  rows.map((row) => ({
    IsAdult: row.Maggiorenne,
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
    ReceiptDate: getFormattedDate(row.DataRicevuta),
    CourseStartDate: getFormattedDate(row.DataInizioCorso),
    CourseEndDate: getFormattedDate(row.DataScadenzaCorso),
    IncludeMembershipFee: Boolean(row.IncludeMembershipFee),
  }));

const getStudentReceipts = async (TaxCode) => {
  const receipts = await knex(RECEIPT_TABLE).select().where({ FK_CodiceFiscale: TaxCode });

  return mappingReceipt(receipts);
};

const getAllReceipts = async () => {
  const receipts = await knex(RECEIPT_TABLE)
    .join(STUDENT_TABLE, `${RECEIPT_TABLE}.FK_AllievaID`, '=', `${STUDENT_TABLE}.AllievaID`)
    .select();

  return mappingAllReceipts(receipts);
};

const createReceipt = async (receiptInfo) => {
  try {
    const isMembershipFee = receiptInfo.ReceiptType === receiptType[1].type;

    const newReceiptID = await knex(RECEIPT_TABLE).insert({
      NumeroRicevuta: receiptInfo.ReceiptNumber,
      TipoPagamento: receiptInfo.PaymentMethod,
      TipoRicevuta: receiptInfo.ReceiptType,
      DataRicevuta: getFormattedDate(receiptInfo.ReceiptDate),
      DataInizioCorso: isMembershipFee ? null : getFormattedDate(receiptInfo.CourseStartDate),
      DataScadenzaCorso: isMembershipFee ? null : getFormattedDate(receiptInfo.CourseEndDate),
      SommaEuro: receiptInfo.AmountPaid,
      FK_CodiceFiscale: receiptInfo.TaxCode,
      FK_AllievaID: receiptInfo.StudentID,
      IncludeMembershipFee: isMembershipFee ? false : receiptInfo.IncludeMembershipFee,
    });

    if (receiptInfo.RegistrationDate === true) {
      await knex(STUDENT_TABLE)
        .where({ AllievaID: receiptInfo.StudentID })
        .update({ DataIscrizione: getFormattedDate(receiptInfo.CourseStartDate) });
    }

    return { ReceiptID: newReceiptID[0], message: 'Ricevuta Inserita Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: 'Errore nel creare la Ricevuta!' };
  }
};

const updateReceipt = async (receiptInfo) => {
  try {
    const isMembershipFee = receiptInfo.ReceiptType === receiptType[1].type;

    await knex(RECEIPT_TABLE)
      .where({ RicevutaID: receiptInfo.ReceiptID })
      .update({
        NumeroRicevuta: receiptInfo.ReceiptNumber,
        TipoPagamento: receiptInfo.PaymentMethod,
        TipoRicevuta: receiptInfo.ReceiptType,
        DataRicevuta: getFormattedDate(receiptInfo.ReceiptDate),
        DataInizioCorso: isMembershipFee ? null : getFormattedDate(receiptInfo.CourseStartDate),
        DataScadenzaCorso: isMembershipFee ? null : getFormattedDate(receiptInfo.CourseEndDate),
        SommaEuro: receiptInfo.AmountPaid,
        IncludeMembershipFee: isMembershipFee ? false : receiptInfo.IncludeMembershipFee,
      });

    return { message: 'Ricevuta Aggiornata Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: `Errore nell'aggiornare Ricevuta!` };
  }
};

const deleteReceipt = async (ReceiptID) => {
  try {
    await knex(RECEIPT_TABLE).where({ RicevutaID: ReceiptID }).del();

    return { message: 'Ricevuta Eliminata Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: `Errore nell'eliminare Ricevute!` };
  }
};

module.exports = {
  getStudentReceipts,
  getAllReceipts,
  createReceipt,
  updateReceipt,
  deleteReceipt,
};
