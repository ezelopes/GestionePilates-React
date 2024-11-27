import { isAdult } from '../commondata';
import { formatDate } from '../helpers/dates';
import { founderMembers } from './constants';

export const MembersRegisterTemplate = (studentsWithReceipts, teachersWithRegistrationReceipt, year) => {
  const docTitle = `STAGIONE SPORTIVA ${parseInt(year, 10)}`;

  const tableBody = [
    [
      { text: 'Cognome Nome', bold: true },
      { text: 'Residenza', bold: true },
      { text: 'Data Nascita', bold: true },
      { text: 'Luogo di Nascita', bold: true },
      { text: 'Codice Fiscale', bold: true },
      { text: 'Data Iscrizione', bold: true },
      { text: 'Anno', bold: true },
      { text: 'Qualifica Tesserato', bold: true },
    ],
  ];

  founderMembers.forEach((founder) =>
    tableBody.push([
      { text: `${founder.surname} ${founder.name}`, fontSize: 9 },
      { text: `${founder.address} ${founder.city}`, fontSize: 9 },
      { text: formatDate(new Date(founder.DOB)), fontSize: 9 },
      { text: founder.birthPlace, fontSize: 9 },
      { text: founder.taxCode, fontSize: 9 },
      { text: `${formatDate(new Date(year - 1, 8, 1))}`, fontSize: 9 }, // 1st September of the year
      { text: `Anno ${year - 1}`, fontSize: 9 },
      { text: 'Associato Fondatore', fontSize: 9 },
    ])
  );

  teachersWithRegistrationReceipt.forEach((teacher) =>
    tableBody.push([
      { text: `${teacher.Surname} ${teacher.Name}`, fontSize: 9 },
      { text: `${teacher.Address} ${teacher.City}`, fontSize: 9 },
      { text: formatDate(new Date(teacher.DOB)), fontSize: 9 },
      { text: teacher.BirthPlace, fontSize: 9 },
      { text: teacher.TaxCode, fontSize: 9 },
      { text: formatDate(new Date(teacher.RegistrationDate)), fontSize: 9 }, // This is the only different field.
      { text: `Anno ${new Date(teacher.RegistrationDate).getFullYear()}`, fontSize: 9 },
      { text: 'Associato Ordinario', fontSize: 9 },
    ])
  );

  studentsWithReceipts.forEach((student) =>
    tableBody.push([
      { text: `${student.Surname} ${student.Name}`, fontSize: 9 },
      { text: `${student.Address} ${student.City}`, fontSize: 9 },
      { text: formatDate(new Date(student.DOB)), fontSize: 9 },
      { text: student.BirthPlace, fontSize: 9 },
      { text: student.TaxCode, fontSize: 9 },
      { text: formatDate(new Date(student.ReceiptDate)), fontSize: 9 },
      { text: `Anno ${new Date(student.ReceiptDate).getFullYear()}`, fontSize: 9 },
      { text: `${isAdult(student.IsAdult) ? 'Associato Ordinario' : 'Associato Junior'}`, fontSize: 9 },
    ])
  );

  const content = [
    {
      text: docTitle,
      lineHeight: 1.5,
      fontSize: 16,
      margin: [0, 0, 0, 10],
      bold: true,
    },
    {
      margin: [0, 0, 0, 0],
      layout: {
        defaultBorder: true,
        paddingLeft() {
          return 5;
        },
        paddingRight() {
          return 5;
        },
        paddingTop() {
          return 5;
        },
        paddingBottom() {
          return 5;
        },
      },
      table: {
        headerRows: 1,
        body: tableBody,
      },
    },
  ];

  const docDefinition = {
    info: {
      title: `${docTitle}.pdf`,
      author: 'Roxana Carro',
      subject: 'Iscrizione allieve per anno',
    },
    pageMargins: [20, 40, 20, 40],
    content,
  };

  return docDefinition;
};
