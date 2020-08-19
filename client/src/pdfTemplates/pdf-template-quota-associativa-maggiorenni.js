const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('../helpers/get-base64-image');
const formatDate = require('../helpers/format-date-for-input-date');
const convertNumberIntoWord = require('../helpers/convert-number-in-words');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfTemplateQuotaAssociativaMaggiorenni = async (allievaInfo, ricevutaInfo) => {
  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');

  let somma = ricevutaInfo.SommaEuro;
  somma = somma.replace('.', ',')
  const euro_and_centesimi = somma.split(',');
  const euro = euro_and_centesimi[0];
  const centesimi = euro_and_centesimi[1];

  const EuroInLettere = convertNumberIntoWord(euro);
  let CentesimiInLettere = '';
  if (centesimi !== '00' && centesimi !== '0' && centesimi !== undefined) {
    CentesimiInLettere = ` e ${convertNumberIntoWord(centesimi)} Centesimi`;
  }

  const tipoPagamento = ricevutaInfo.TipoPagamento.toUpperCase();

  const docDefinition = {
    info: {
      title: `${ricevutaInfo.NumeroRicevuta}_${allievaInfo.Nome}_${allievaInfo.Cognome}_Ricevuta`,
      author: 'Roxana Carro',
      subject: `Ricevuta ${ricevutaInfo.NumeroRicevuta} di ${allievaInfo.Nome} ${allievaInfo.Cognome}`
    },
    pageMargins: [40, 40, 40, 0],
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
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${
            allievaInfo.Nome
        } ${
            allievaInfo.Cognome
        } , C.F. ${
            allievaInfo.CodiceFiscale
        }, nato/a a ${
            allievaInfo.LuogoNascita
        }, il ${ 
          (allievaInfo.DataNascita === 'Invalid date' || !allievaInfo.DataNascita) 
            ? '____/____/________'
            : allievaInfo.DataNascita
        } residente in ${
            allievaInfo.Indirizzo
        }, ${
            allievaInfo.Citta
        }, il pagamento effetuato${(tipoPagamento !== 'CONTANTI' ? ` tramite ${tipoPagamento}` : '' )} equilavente alla somma di ${
            ricevutaInfo.SommaEuro
        }€ (${
            EuroInLettere.toUpperCase()
        } EURO${
            CentesimiInLettere.toUpperCase()
        }) per il contributo relativo alla quota associativa della durata di un anno.`,
        alignment: 'center',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: `Stezzano, ${ 
          (ricevutaInfo.DataRicevuta === 'Invalid date' || !ricevutaInfo.DataRicevuta) 
            ? '____/____/________'
            : ricevutaInfo.DataRicevuta
        }`,
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
        text: 'FIRMA ______________________________',
        alignment: 'left',
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
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 15]
      },
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
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${
            allievaInfo.Nome
        } ${
            allievaInfo.Cognome
        } , C.F. ${
            allievaInfo.CodiceFiscale
        }, nato/a a ${
            allievaInfo.LuogoNascita
        }, il ${ 
          (allievaInfo.DataNascita === 'Invalid date' || !allievaInfo.DataNascita) 
            ? '____/____/________'
            : allievaInfo.DataNascita
        } residente in ${
            allievaInfo.Indirizzo
        }, ${
            allievaInfo.Citta
        }, il pagamento effetuato${(tipoPagamento !== 'CONTANTI' ? ` tramite ${tipoPagamento}` : '' )} equilavente alla somma di ${
            ricevutaInfo.SommaEuro
        }€ (${
            EuroInLettere.toUpperCase()
        } EURO${
            CentesimiInLettere.toUpperCase()
        }) per il contributo relativo alla quota associativa della durata di un anno.`,
        alignment: 'center',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: `Stezzano, ${ 
          (ricevutaInfo.DataRicevuta === 'Invalid date' || !ricevutaInfo.DataRicevuta) 
            ? '____/____/________'
            : ricevutaInfo.DataRicevuta
        }`,
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
        text: 'FIRMA ______________________________',
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Pil Art è affiliata all’ACSI e regolarmente iscritta sul registro del CONI',
        alignment: 'left',
        fontSize: 8,
        margin: [0, 0, 0, 15]
      }
    ]
  };

  return docDefinition;
};

export default pdfTemplateQuotaAssociativaMaggiorenni;
