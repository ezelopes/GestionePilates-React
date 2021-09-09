const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const formatDate = require('../helpers/formatDateForInputDate');
const getBase64ImageFromURL = require('../helpers/getBase64ImageFromURL');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const StudentsDataGreenPassTemplate = async (
    studentsList,
    expiryMonth,
    expiryYear,
  ) => {

  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const BLANK_DATE = '____-____-________'

  const tableBody = [
    [
      { text: 'Allieva', bold: true },
      { text: 'Data Scadenza Green Pass', bold: true },
    ]
  ]
  studentsList.forEach(student => 
    tableBody.push([`${student.Name} ${student.Surname}` , student.GreenPassExpirationDate ? formatDate(new Date(student.GreenPassExpirationDate)) : BLANK_DATE])
  )

  const content = [
    {
      image: label_logo,
      alignment: 'right',
      fit: [100, 100],
      margin: [0, 0, 0, 10]
    },
    {
      text: `GREEN PASS CON SCADENZA ${expiryMonth} ${expiryYear}`,
      lineHeight: 1.5,
      fontSize: 16,
      margin: [0, 0, 0, 10],
      bold: true
    },
    {
      margin: [0, 0, 0, 0],
      layout: {
        defaultBorder: true,
        paddingLeft: function () { return 5; },
        paddingRight: function () { return 5; },
        paddingTop: function () { return 5; },
        paddingBottom: function () { return 5; },
      },
      table: {
        headerRows: 1,
        widths: [ '50%', '50%' ],

        body: tableBody
      }
    }
  ];

  const docDefinition = {
    info: {
      title: `Informazioni Allieve Green Pass ${expiryMonth} ${expiryYear}`,
      author: 'Roxana Carro',
      subject: `Dati Allieve`
    },
    pageMargins: [40, 40, 40, 40],
    content: content
  };

  return docDefinition;
};

export default StudentsDataGreenPassTemplate;
