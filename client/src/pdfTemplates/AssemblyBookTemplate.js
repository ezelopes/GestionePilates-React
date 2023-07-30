import { convertToTitleCase } from '../helpers/convertToTitleCase';

const createSubarraysWithMaxLength = (arr, maxLength) => {
  const parentArray = [
    [{ text: 'ALLIEVI', bold: true, colSpan: maxLength, alignment: 'center' }, ...Array(maxLength - 1).fill({})],
  ];
  let subArray = [];

  for (let i = 0; i < arr.length; i += 1) {
    subArray.push({ text: `${convertToTitleCase(arr[i].Name)} ${convertToTitleCase(arr[i].Surname)}`, colSpan: 1 });

    if (subArray.length === maxLength) {
      parentArray.push(subArray);

      subArray = [];
    }

    // Fill last items with empty object so it follows the table structure
    if (i === arr.length - 1 && subArray.length > 0) {
      while (subArray.length < maxLength) {
        subArray.push({});
      }

      parentArray.push(subArray);
    }
  }

  return parentArray;
};

export const AssemblyBookTemplate = (studentsList, registrationMonth, registrationYear, labelLogo) => {
  const docTitle = `ALLIEVI ISCRITTI - ${registrationMonth} ${registrationYear}`;

  const tableBody = createSubarraysWithMaxLength(studentsList, 3);

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
        widths: ['33.33%', '33.33%', '33.33%'],

        body: tableBody,
      },
    },
  ];

  const docDefinition = {
    info: {
      title: docTitle,
      author: 'Roxana Carro',
      subject: `Libro Assemblea`,
    },
    pageMargins: [40, 40, 40, 40],
    content,
  };

  return docDefinition;
};
