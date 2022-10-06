const { getFormattedDate } = require('./dates');

/**
 * Mapping Database student entries to match the Student Object for client side.
 */
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

/**
 * Mapping Database receipt entries to match the Receipt Object for client side.
 */
const mappingReceipt = (rows) =>
  rows
    .map((row) => ({
      ReceiptID: row.RicevutaID,
      ReceiptType: row.TipoRicevuta,
      ReceiptDate: getFormattedDate(row.DataRicevuta),
      CourseStartDate: getFormattedDate(row.DataInizioCorso),
      CourseEndDate: getFormattedDate(row.DataScadenzaCorso),
      ReceiptNumber: row.NumeroRicevuta,
      AmountPaid: row.SommaEuro,
      FK_StudentID: row.FK_AllievaID,
      PaymentMethod: row.TipoPagamento,
      IncludeMembershipFee: Boolean(row.IncludeQuotaAssociativa),
    }))
    .filter((row) => !!row.ReceiptID); // Remove null values

/**
 * Mapping both Database receipt and students entries to match Receipt_Student Object for client side.
 */
const mappingReceiptsWithStudentInfo = (rows) =>
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

    ReceiptID: row.RicevutaID,
    ReceiptNumber: row.NumeroRicevuta,
    AmountPaid: row.SommaEuro,
    PaymentMethod: row.TipoPagamento,
    ReceiptType: row.TipoRicevuta,
    ReceiptDate: getFormattedDate(row.DataRicevuta),
    CourseStartDate: getFormattedDate(row.DataInizioCorso),
    CourseEndDate: getFormattedDate(row.DataScadenzaCorso),
    IncludeMembershipFee: Boolean(row.IncludeQuotaAssociativa),
  }));

/**
 * Mapping Database teacher entries to match the Teacher Object for client side.
 */
const mappingTeachers = (rows) =>
  rows.map((row) => ({
    TeacherID: row.InsegnanteID,
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
    GreenPassExpirationDate: getFormattedDate(row.DataGreenPass),
    BirthPlace: row.LuogoNascita,
    Discipline: row.Disciplina,
    Course: row.Corso,
    School: row.Scuola,
  }));

module.exports = {
  mappingStudents,
  mappingReceipt,
  mappingReceiptsWithStudentInfo,
  mappingTeachers,
};
