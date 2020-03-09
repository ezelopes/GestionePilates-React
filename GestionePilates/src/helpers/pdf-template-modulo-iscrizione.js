const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('./get-base64-image');
const formatDate = require('./format-date-for-input-date');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfTemplateModuloIscrizione = async allievaInfo => {
  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const today = formatDate(new Date(), false);

  const docDefinition = {
    info: {
      title: `_${allievaInfo.Nome}_${allievaInfo.Cognome}_Modulo_Iscrizione`,
      author: 'Roxana Carro',
      subject: `Modulo Iscrizione di ${allievaInfo.Nome} ${allievaInfo.Cognome}`
    },
    pageMargins: [40, 40, 40, 0],
    content: [
      {
        image: label_logo,
        fit: [100, 100]
      },
      {
        text: `Data ____/____/________`,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        // bold
        text: 'DOMANDA DI ISCRIZIONE A SOCIO / ATLETA',
        alignment: 'center',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: `Il sottoscritto/a ${allievaInfo.Nome} ${allievaInfo.Cognome}, nato/a a ${allievaInfo.LuogoNascita} il ${allievaInfo.DataNascita}, C.F. ${allievaInfo.CodiceFiscale}. Residente in via ${allievaInfo.Indirizzo} NRO. ___ a ${allievaInfo.Citta} (____), cap. ________ . Cellulare ${allievaInfo.Cellulare} Email ${allievaInfo.Email}`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        // bold
        text:
          'richiede la tessere associativa alla A.S.D PIL ART sito a STEZZANO, Via CESARE BATTISTI n. 9/A',
        alignment: 'center',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },

      {
        text: `1- Dichiaro di conoscere lo Statuto ...`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'La disciplina sportiva svolta nella ASD PIL ART è: ', // add checkbox FITNESS and DANZA SPORTIVA
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: `per cui il socio ci consegna un certificato medico di idoneità sportiva con scadenza ${allievaInfo.DataCertificato} del tipo:`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'AGONISTICA (certificato di idoneità agonistica sportiva)', // add checkbox
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'NON AGONISTICA (certificato di idoneità per attività sportive non agonistiche)', // add checkbox
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'La copertura assicurativa proposta è (barrare la copertura scelta)', // add checkbox Base Integrativa Superintegrativa
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'N. Tessera ACSI assegnato __________________',
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Firma __________________________',
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 15]
      },
      {
        // bold
        text: 'PER I MINORI',
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: `Cognome e Nome di chi esercita la Patria Potestà __________________________________________`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Codice Fiscale di chi firma __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __',
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'documento _______________________ n. _______________ rilasciato il _________________',
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Firma di chi esercita la Patria Potestà ______________________________',
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 10]
      }
    ]
  };

  return docDefinition;
};

module.exports = pdfTemplateModuloIscrizione;
