const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('../helpers/getBase64ImageFromURL');
const formatDate = require('../helpers/formatDateForInputDate');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AmountPaidSummaryTemplate = async (
    receiptList,
    filteredAmountPaid,
    filteredPaymentMethod,
    fromDate,
    toDate
  ) => {

  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const BLANK_DATE = '____-____-________'

  const tableBody = [
    [
      { text: 'Numero Ricevuta', bold: true },
      { text: 'Data Ricevuta', bold: true },
      { text: 'Importo in €', bold: true }
    ]
  ]
  receiptList.forEach(receipt => 
    tableBody.push([receipt.ReceiptNumber, receipt.ReceiptDate ? formatDate(new Date(receipt.ReceiptDate)) : BLANK_DATE, receipt.AmountPaid])
  )

  const content = [
    {
      image: label_logo,
      alignment: 'right',
      fit: [100, 100],
      margin: [0, 0, 0, 10]
    },
    {
      text: `RIEPILOGO IMPORTI PAGATI`,
      lineHeight: 1.5,
      fontSize: 16,
      margin: [0, 0, 0, 10],
      bold: true
    },
    {
      text: [
        {
          text: 'Metodo Pagamento: '

        },
        {
          text: `${filteredPaymentMethod.toUpperCase()}`,
          bold: true
        },
      ],
      lineHeight: 1.5,
      fontSize: 12,
      margin: [0, 0, 0, 10],
    },
    {
      text: [
        {
          text: 'Periodo dal '
        },
        {
          text: `${ fromDate ? formatDate(new Date(fromDate)) : BLANK_DATE }` ,
          bold: true
        },
        {
          text: ' al '
        },
        {
          text: `${ toDate ? formatDate(new Date(toDate)) : BLANK_DATE }`,
          bold: true
        },
      ],
      lineHeight: 1.5,
      fontSize: 12,
      margin: [0, 0, 0, 10],
    },
    {
      text: [
        {
          text: 'Totale: '

        },
        {
          text: `${filteredAmountPaid}€`,
          bold: true
        },
      ],
      lineHeight: 1.5,
      fontSize: 12,
      margin: [0, 0, 0, 0],
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
        widths: [ '33.3%', '33.3%', '33.3%' ],

        body: tableBody
      }
    }
  ];

  const docDefinition = {
    info: {
    // filteredPaymentMethod,
      title: `Riepilogo Importo pagato tramite ${filteredPaymentMethod} dal ${fromDate ? formatDate(new Date(fromDate)) : BLANK_DATE} al ${toDate ? formatDate(new Date(toDate)) : BLANK_DATE}`,
      author: 'Roxana Carro',
      subject: `Riepilogo Importo`
    },
    pageMargins: [40, 40, 40, 40],
    content: content
  };

  return docDefinition;
};

export default AmountPaidSummaryTemplate;
