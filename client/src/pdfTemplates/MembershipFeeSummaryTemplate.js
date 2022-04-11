import { formatDate } from '../helpers/dates';
import { BLANK_DATE } from '../commondata';

export const MembershipFeeSummaryTemplate = (studentReceiptList, fromDate, toDate, labelLogo) => {
  const tableBody = [
    [
      { text: 'Allieva', bold: true },
      { text: 'Data Quota Associativa', bold: true },
    ],
  ];

  studentReceiptList.forEach(({ Name, Surname, ReceiptDate }) =>
    tableBody.push([`${Name} ${Surname}`, ReceiptDate ? formatDate(new Date(ReceiptDate)) : BLANK_DATE])
  );

  const content = [
    {
      image: labelLogo,
      alignment: 'right',
      fit: [100, 100],
      margin: [0, 0, 0, 10],
    },
    {
      text: [
        {
          text: 'RIEPILOGO QUOTE ASSOCIATIVE DAL ',
        },
        {
          text: `${fromDate || BLANK_DATE}`,
          bold: true,
        },
        {
          text: ' AL ',
        },
        {
          text: `${toDate || BLANK_DATE}`,
          bold: true,
        },
      ],
      lineHeight: 1.5,
      fontSize: 16,
      margin: [0, 0, 0, 5],
    },
    {
      margin: [0, 5, 0, 5],
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
      title: `Riepilogo Quote Associative dal ${fromDate} al ${toDate}`,
      author: 'Roxana Carro',
      subject: `Dati Allieve`,
    },
    pageMargins: [40, 40, 40, 40],
    content,
  };

  return docDefinition;
};
