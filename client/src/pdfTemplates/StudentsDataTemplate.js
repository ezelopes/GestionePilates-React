import { formatDate } from '../helpers/dates';
import { BLANK_DATE } from '../commondata';

export const StudentsDataTemplate = (studentsList, registrationMonth, registrationYear, labelLogo) => {
  const docTitle = `ALLIEVE ISCRITTE - ${registrationMonth} ${registrationYear}.pdf`;

  const tableBody = [
    [
      { text: 'Allieva', bold: true },
      { text: 'Data Nascita', bold: true },
      { text: 'Numero Cellulare', bold: true },
    ],
  ];

  studentsList.forEach((student) =>
    tableBody.push([
      `${student.Name} ${student.Surname}`,
      student.DOB ? formatDate(new Date(student.DOB)) : BLANK_DATE,
      student.MobilePhone,
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
        widths: ['40%', '30%', '30%'],

        body: tableBody,
      },
    },
  ];

  const docDefinition = {
    info: {
      title: docTitle,
      author: 'Roxana Carro',
      subject: `Dati Allieve`,
    },
    pageMargins: [40, 40, 40, 40],
    content,
  };

  return docDefinition;
};
