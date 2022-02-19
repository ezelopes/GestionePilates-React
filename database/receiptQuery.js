const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/dates');
const { mappingReceipt, mappingReceiptsWithStudentInfo } = require('./helpers/mapDatabaseEntries');

const receiptTypes = {
  paymentFee: 'QUOTA',
  membershipFee: 'QUOTA ASSOCIATIVA',
};

const STUDENT_TABLE = 'allieva';
const RECEIPT_TABLE = 'ricevuta';

const getStudentReceipts = async (TaxCode) => {
  try {
    const receipts = await knex(RECEIPT_TABLE).select().where({ FK_CodiceFiscale: TaxCode });

    return mappingReceipt(receipts);
  } catch (error) {
    console.log(error);

    return { message: 'Errore nel recuperare le ricevute!' };
  }
};

const getAllReceipts = async () => {
  try {
    const receipts = await knex(RECEIPT_TABLE)
      .join(STUDENT_TABLE, `${RECEIPT_TABLE}.FK_AllievaID`, '=', `${STUDENT_TABLE}.AllievaID`)
      .select();

    return mappingReceiptsWithStudentInfo(receipts);
  } catch (error) {
    console.log(error);

    return { message: 'Errore nel recuperare le ricevute!' };
  }
};

const createReceipt = async (receiptInfo) => {
  try {
    const isMembershipFee = receiptInfo.ReceiptType?.toUpperCase() === receiptTypes.membershipFee;

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
    const isMembershipFee = receiptInfo.ReceiptType?.toUpperCase() === receiptTypes.membershipFee;

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
