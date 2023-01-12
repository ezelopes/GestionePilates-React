import { isAdult } from '../commondata';
import { formatDate } from '../helpers/dates';

export const StudentsWithRegistrationReceiptTemplate = (studentsWithReceipts, year) => {
  const docTitle = `ALLIEVE ISCRITTE NEL ${parseInt(year, 10) - 1} (dal 01-09-${parseInt(year, 10) - 1} al 31-08-${year})`;

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

  studentsWithReceipts.forEach((student) => {
    tableBody.push([
      { text: `${student.Surname} ${student.Name}`, fontSize: 9 },
      { text: `${student.Address} ${student.City}`, fontSize: 9 },
      { text: formatDate(new Date(student.DOB)), fontSize: 9 },
      { text: student.BirthPlace, fontSize: 9 },
      { text: student.TaxCode, fontSize: 9 },
      { text: formatDate(new Date(student.ReceiptDate)), fontSize: 9 },
      { text: `Anno ${new Date(student.ReceiptDate).getFullYear()}`, fontSize: 9 },
      { text: `${isAdult(student.IsAdult) ? 'Associatio Ordinario' : 'Associatio Junior'}`, fontSize: 9 },
    ]);
  });

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
      title: docTitle,
      author: 'Roxana Carro',
      subject: 'Iscrizione allieve per anno',
    },
    pageMargins: [20, 40, 20, 40],
    content,
  };

  return docDefinition;
};
