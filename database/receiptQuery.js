/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-multi-str */
const { knex, pool } = require('./connection');
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

const createReceipt = async (newReceipt) => {
  try {
    const isMembershipFee = newReceipt.ReceiptType === receiptType[1].type;

    const newReceiptID = await knex(RECEIPT_TABLE).insert({
      NumeroRicevuta: newReceipt.ReceiptNumber,
      TipoPagamento: newReceipt.PaymentMethod,
      TipoRicevuta: newReceipt.ReceiptType,
      DataRicevuta: getFormattedDate(newReceipt.ReceiptDate),
      DataInizioCorso: isMembershipFee ? null : getFormattedDate(newReceipt.CourseStartDate),
      DataScadenzaCorso: isMembershipFee ? null : getFormattedDate(newReceipt.CourseEndDate),
      SommaEuro: newReceipt.AmountPaid,
      FK_CodiceFiscale: newReceipt.TaxCode,
      FK_AllievaID: newReceipt.StudentID,
      IncludeMembershipFee: isMembershipFee ? false : newReceipt.IncludeMembershipFee,
    });

    if (newReceipt.RegistrationDate === true) {
      await knex(STUDENT_TABLE)
        .where({ AllievaID: newReceipt.StudentID })
        .update({ DataIscrizione: getFormattedDate(newReceipt.CourseStartDate) });
    }

    return { ReceiptID: newReceiptID[0], message: 'Ricevuta Inserita Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: 'Errore nel creare la Ricevuta!' };
  }
};

const updateReceipt = async (receipt) => {
  try {
    const isMembershipFee = receipt.ReceiptType === receiptType[1].type;

    await knex(RECEIPT_TABLE)
      .where({ RicevutaID: receipt.ReceiptID })
      .update({
        NumeroRicevuta: receipt.ReceiptNumber,
        TipoPagamento: receipt.PaymentMethod,
        TipoRicevuta: receipt.ReceiptType,
        DataRicevuta: getFormattedDate(receipt.ReceiptDate),
        DataInizioCorso: isMembershipFee ? null : getFormattedDate(receipt.CourseStartDate),
        DataScadenzaCorso: isMembershipFee ? null : getFormattedDate(receipt.CourseEndDate),
        SommaEuro: receipt.AmountPaid,
        IncludeMembershipFee: isMembershipFee ? false : receipt.IncludeMembershipFee,
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
