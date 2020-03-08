const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('./get-base64-image');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfTemplateMaggiorenni = async (allievaInfo, ricevutaInfo) => {
  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const today = new Date();
  const day = ('0' + today.getDate()).slice(-2);
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const todayFormatted = `${day}-${month}-${today.getFullYear()}`;

  const docDefinition = {
    pageMargins: [40, 10, 40, 0],
    content: [
      {
        image: label_logo,
        fit: [100, 100]
      },
      {
        text: `Ricevuta n° ${ricevutaInfo.NumeroRicevuta}`,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text:
          'L’associazione sportiva dilettantistica PIL-ART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167',
        alignment: 'center',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'DICHIARA',
        alignment: 'center',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        // ${sommaEuroInLettere.ToUpper()}
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${allievaInfo.Nome} ${allievaInfo.Cognome} , C.F. ${allievaInfo.CodiceFiscale},
          nato/a a ${allievaInfo.LuogoNascita}, il ${allievaInfo.DataNascita}
          residente in ${allievaInfo.Indirizzo}, ${allievaInfo.Citta}, la somma di ${ricevutaInfo.SommaEuro}€ (... Euro) per l'iscrizione al corso di ${allievaInfo.Disciplina} dal ${ricevutaInfo.DataInizio}
          al ${ricevutaInfo.DataScadenza}`,
        alignment: 'center',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: `Stezzano, ${todayFormatted}`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Il Presidente',
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Roxana Carro',
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Pil Art è affiliata all’ACSI e regolarmente iscritta sul registro del CONI',
        alignment: 'left',
        fontSize: 8,
        margin: [0, 0, 0, 15]
      },
      {
        text:
          '----------------------------------------------------------------------------------------------------------------------',
        alignment: 'center',
        fontSize: 8,
        margin: [0, 0, 0, 15]
      }
    ]
  };

  return docDefinition;
};

module.exports = pdfTemplateMaggiorenni;
