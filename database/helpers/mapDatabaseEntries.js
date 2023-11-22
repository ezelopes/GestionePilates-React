const { getFormattedDate } = require('./dates');

/**
 * Mapping member to domain.
 */
const memberToDomain = (row) => ({
  id: row.id,
  isAdult: row.is_adult,
  taxCode: row.tax_code,
  name: row.name,
  surname: row.surname,
  city: row.city,
  address: row.address,
  phone: row.phone,
  email: row.email,
  placeOfBirth: row.place_of_birth,
  subscriptionDate: getFormattedDate(row.subscription_date),
  certificateExpiryDate: getFormattedDate(row.certificate_expiry_date),
  DOB: getFormattedDate(row.dob),
  parentTaxCode: row.parent_tax_code,
  parentName: row.parent_name,
  parentSurname: row.parent_surname,
});

// /**
//  * Mapping Database receipt entries to match the Receipt Object for client side.
//  */
// const mappingReceipt = (rows) =>
//   rows
//     .map((row) => ({
//       ReceiptID: row.RicevutaID,
//       ReceiptType: row.TipoRicevuta,
//       ReceiptDate: getFormattedDate(row.DataRicevuta),
//       CourseStartDate: getFormattedDate(row.DataInizioCorso),
//       CourseEndDate: getFormattedDate(row.DataScadenzaCorso),
//       ReceiptNumber: row.NumeroRicevuta,
//       AmountPaid: row.SommaEuro,
//       FK_StudentID: row.FK_AllievaID,
//       PaymentMethod: row.TipoPagamento,
//       IncludeMembershipFee: Boolean(row.IncludeQuotaAssociativa),
//     }))
//     .filter((row) => !!row.ReceiptID); // Remove null values

// /**
//  * Mapping both Database receipt and students entries to match Receipt_Student Object for client side.
//  */
// const mappingReceiptsWithStudentInfo = (rows) =>
//   rows.map((row) => ({
//     IsAdult: row.Maggiorenne,
//     TaxCode: row.CodiceFiscale,
//     Name: row.Nome,
//     Surname: row.Cognome,
//     City: row.Citta,
//     Address: row.Indirizzo,
//     MobilePhone: row.Cellulare,
//     Email: row.Email,
//     RegistrationDate: getFormattedDate(row.DataIscrizione),
//     CertificateExpirationDate: getFormattedDate(row.DataCertificato),
//     DOB: getFormattedDate(row.DataNascita),
//     BirthPlace: row.LuogoNascita,
//     Discipline: row.Disciplina,
//     Course: row.Corso,
//     School: row.Scuola,
//     ParentName: row.NomeGenitore,
//     ParentSurname: row.CognomeGenitore,
//     ParentTaxCode: row.CodiceFiscaleGenitore,

//     ReceiptID: row.RicevutaID,
//     ReceiptNumber: row.NumeroRicevuta,
//     AmountPaid: row.SommaEuro,
//     PaymentMethod: row.TipoPagamento,
//     ReceiptType: row.TipoRicevuta,
//     ReceiptDate: getFormattedDate(row.DataRicevuta),
//     CourseStartDate: getFormattedDate(row.DataInizioCorso),
//     CourseEndDate: getFormattedDate(row.DataScadenzaCorso),
//     IncludeMembershipFee: Boolean(row.IncludeQuotaAssociativa),
//   }));

/**
 * Mapping Database subcription to domain.
 */
const subscriptionToDomain = (row) => ({
  id: row.id,
  memberId: row.fk_member_id,
  startDate: row.start_date,
  endDate: row.end_date,
  isMemberRetired: row.is_member_retired,
});

/**
 * Mapping Database subcription with courses to domain.
 */
const subscriptionWithCoursesToDomain = (row) => ({
  id: row.id,
  startDate: row.start_date,
  endDate: row.end_date,
  isMemberRetired: row.is_member_retired,
  courseName: row.course_name,
  disciplineName: row.discipline_name,
  locationName: row.location_name,
});

/**
 * Mapping Database subcription with payments to domain.
 */
const subscriptionWithPaymentsToDomain = (row) => ({
  subscriptionId: row.subscription_id,
  paymentId: row.payment_id,
  startDate: row.start_date,
  endDate: row.end_date,
  isMemberRetired: row.is_member_retired,
  paymentNumber: row.payment_number,
  paymentDate: row.payment_date,
  amountPaid: row.amount_paid,
  includeMembershipFee: row.include_membership_fee,
  isShadow: row.is_shadow,
  paymentType: row.payment_type_name,
  paymentMethod: row.payment_method_name,
});

/**
 * Mapping Database teacher entries to match the Teacher Object for client side.
 */
const teachersToDomain = (row) => ({
  id: row.id,
  taxCode: row.tax_code,
  name: row.name,
  surname: row.surname,
  city: row.city,
  address: row.address,
  phone: row.phone,
  email: row.email,
  placeOfBirth: row.place_of_birth,
  subscriptionDate: getFormattedDate(row.subscription_date),
  certificateExpiryDate: getFormattedDate(row.certificate_expiry_date),
  DOB: getFormattedDate(row.dob),
});

module.exports = {
  memberToDomain,
  subscriptionToDomain,
  subscriptionWithCoursesToDomain,
  subscriptionWithPaymentsToDomain,
  teachersToDomain,
  // MappingReceipt,
  // mappingReceiptsWithStudentInfo,
};
