import { formatDate } from '../helpers/dates';
import { BLANK_DATE } from '../commondata';

export const StudentsDataGreenPassTemplate = (studentsList, expiryMonth, expiryYear, labelLogo) => {
  const tableBody = [
    [
      { text: 'Allieva', bold: true },
      { text: 'Data Scadenza Green Pass', bold: true },
    ],
  ];
  studentsList.forEach((student) =>
    tableBody.push([
      `${student.Name} ${student.Surname}`,
      student.GreenPassExpirationDate ? formatDate(new Date(student.GreenPassExpirationDate)) : BLANK_DATE,
    ])
  );

  const content = [
    {
      image: labelLogo,
      alignment: 'right',
      fit: [100, 100],
      margin: [0, 0, 0, 10],
    },
    {
      text: `GREEN PASS CON SCADENZA ${expiryMonth} ${expiryYear}`,
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
        widths: ['50%', '50%'],

        body: tableBody,
      },
    },
  ];

  const docDefinition = {
    info: {
      title: `Informazioni Allieve Green Pass ${expiryMonth} ${expiryYear}.pdf`,
      author: 'Roxana Carro',
      subject: `Dati Allieve`,
    },
    pageMargins: [40, 40, 40, 40],
    content,
  };

  return docDefinition;
};
