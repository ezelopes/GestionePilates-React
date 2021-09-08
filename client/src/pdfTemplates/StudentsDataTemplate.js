const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const formatDate = require('../helpers/formatDateForInputDate');
const getBase64ImageFromURL = require('../helpers/getBase64ImageFromURL');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const StudentsDataTemplate = async (
    studentsList,
  ) => {

  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const BLANK_DATE = '____-____-________'

  const tableBody = [
    [
      { text: 'Allieva', bold: true },
      { text: 'Data Nascita', bold: true },
      { text: 'Numero Cellulare', bold: true }
    ]
  ]
  studentsList.forEach(student => 
    tableBody.push([`${student.Name} ${student.Surname}` , student.DOB ? formatDate(new Date(student.DOB)) : BLANK_DATE, student.MobilePhone])
  )

  const content = [
    {
      image: label_logo,
      alignment: 'right',
      fit: [100, 100],
      margin: [0, 0, 0, 10]
    },
    {
      text: `INFORMAZIONI ALLIEVE`,
      lineHeight: 1.5,
      fontSize: 16,
      margin: [0, 0, 0, 10],
      bold: true
    },
    {
      margin: [0, 20, 0, 20],
      layout: {
        defaultBorder: true,
        paddingLeft: function () { return 5; },
        paddingRight: function () { return 5; },
        paddingTop: function () { return 5; },
        paddingBottom: function () { return 5; },
      },
      table: {
        headerRows: 1,
        widths: [ '40%', '30%', '30%' ],

        body: tableBody
      }
    }
  ];

  const docDefinition = {
    info: {
      title: `Informazioni Allieve per Comune`,
      author: 'Roxana Carro',
      subject: `Dati Allieve`
    },
    pageMargins: [40, 40, 40, 40],
    content: content
  };

  return docDefinition;
};

export default StudentsDataTemplate;
