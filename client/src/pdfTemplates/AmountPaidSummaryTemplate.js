const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('../helpers/getBase64ImageFromURL');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AmountPaidSummaryTemplate = async (
    receiptList,
    filteredTotalAmount,
    filteredPaymentMethod,
    fromDate,
    toDate
  ) => {

  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');

  const tableBody = [
    [
      { text: 'Numero Ricevuta', bold: true },
      { text: 'Data Ricevuta', bold: true },
      { text: 'Importo in €', bold: true }
    ]
  ]
  receiptList.forEach(receipt => 
    tableBody.push([receipt.ReceiptNumber, receipt.ReceiptDate, receipt.AmountPaid])
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
          text: `${fromDate}`,
          bold: true
        },
        {
          text: ' al '
        },
        {
          text: `${toDate}`,
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
          text: `${filteredTotalAmount}€`,
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
        paddingLeft: function (i, node) { return 5; },
        paddingRight: function (i, node) { return 5; },
        paddingTop: function (i, node) { return 5; },
        paddingBottom: function (i, node) { return 5; },
      },
      table: {
        headerRows: 1,
        widths: [ '33.3%', '33.3%', '33.3%' ],

        body: tableBody
      }
    }
  ]; 
  
  // Map through array and populate content

  const docDefinition = {
    info: {
    filteredPaymentMethod,
      title: `Riepilogo Importo pagato tramite ${filteredPaymentMethod} dal ${fromDate} al ${toDate}`,
      author: 'Roxana Carro',
      subject: `Riepilogo Importo`
    },
    pageMargins: [40, 40, 40, 40],
    content: content
  };

  return docDefinition;
};

export default AmountPaidSummaryTemplate;
