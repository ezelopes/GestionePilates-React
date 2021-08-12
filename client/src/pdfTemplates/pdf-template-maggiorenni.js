const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('../helpers/get-base64-image');
const convertNumberIntoWord = require('../helpers/convert-number-in-words');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfTemplateMaggiorenni = async (allievaInfo, ricevutaInfo) => {
  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const signature = await getBase64ImageFromURL('../images/Signature.png');
  const stamp = await getBase64ImageFromURL('../images/Stamp.png');
  const BLANK_SPACE = '___________________________';

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
    pageMargins: [40, 20, 40, 0],
    content: [
      {
        image: label_logo,
        fit: [100, 100]
      },
      {
        text: `Ricevuta n° ${ricevutaInfo.NumeroRicevuta || BLANK_SPACE }`,
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text:
          'L’associazione sportiva dilettantistica PIL-ART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'DICHIARA',
        bold: true,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${
          allievaInfo.Nome || BLANK_SPACE 
        } ${
          allievaInfo.Cognome || BLANK_SPACE 
        } , C.F. ${
          allievaInfo.CodiceFiscale || BLANK_SPACE 
        }, nato/a a ${
          allievaInfo.LuogoNascita || BLANK_SPACE 
        }, il ${ 
          (allievaInfo.DataNascita === 'Invalid date' || !allievaInfo.DataNascita) 
            ? '______/______/________'
            : allievaInfo.DataNascita
        } residente in ${
          allievaInfo.Indirizzo || BLANK_SPACE 
        }, ${
          allievaInfo.Citta || BLANK_SPACE 
        }, il pagamento effetuato${(tipoPagamento !== 'CONTANTI' ? ` tramite ${tipoPagamento}` : '' )} equilavente alla somma di ${
          ricevutaInfo.SommaEuro || BLANK_SPACE 
        }€ (${
          EuroInLettere.toUpperCase() || BLANK_SPACE 
        } EURO${
          CentesimiInLettere.toUpperCase()
        }) per l'iscrizione al corso di ${
          allievaInfo.Disciplina || BLANK_SPACE 
        } dal ${ 
          (ricevutaInfo.DataInizioCorso === 'Invalid date' || !ricevutaInfo.DataInizioCorso) 
            ? '______/______/________'
            : ricevutaInfo.DataInizioCorso
        } al ${ 
          (ricevutaInfo.DataScadenzaCorso === 'Invalid date' || !ricevutaInfo.DataScadenzaCorso) 
            ? '______/______/________'
            : ricevutaInfo.DataScadenzaCorso
        }`,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: `Stezzano, ${ 
          (ricevutaInfo.DataRicevuta === 'Invalid date' || !ricevutaInfo.DataRicevuta) 
            ? '______/______/________'
            : ricevutaInfo.DataRicevuta
        }`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 2]
      },
      {
        text: 'Il Presidente',
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 2]
      },
      {
        text: 'Roxana Carro',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 0]
      },
      {
        margin: [0, 0, 0, 2],
        columnGap: 5,
        columns: [{
            text: 'Firma ',
            alignment: 'left',
            width: 50,
            height: 70,
            margin: [0, 20, 0, 10]
        }, {
            image: signature,
            width: 80,
            height: 40,
            margin: [-15, -5, 0, 10]
        }, {
          image: stamp,
          width: 80,
          height: 40,
          margin: [15, -5, 0, 10]
        }]
      },
      {
        text: 'Pil Art è affiliata all’ACSI e regolarmente iscritta sul registro del CONI',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 8,
        margin: [0, 0, 0, 5]
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 10]
      },
      {
        image: label_logo,
        fit: [100, 100]
      },
      {
        text: `Ricevuta n° ${ricevutaInfo.NumeroRicevuta || BLANK_SPACE }`,
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text:
          'L’associazione sportiva dilettantistica PIL-ART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'DICHIARA',
        bold: true,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${
          allievaInfo.Nome || BLANK_SPACE 
        } ${
          allievaInfo.Cognome || BLANK_SPACE 
        } , C.F. ${
          allievaInfo.CodiceFiscale || BLANK_SPACE 
        }, nato/a a ${
          allievaInfo.LuogoNascita || BLANK_SPACE 
        }, il ${ 
          (allievaInfo.DataNascita === 'Invalid date' || !allievaInfo.DataNascita) 
            ? '______/______/________'
            : allievaInfo.DataNascita
        } residente in ${
          allievaInfo.Indirizzo || BLANK_SPACE 
        }, ${
          allievaInfo.Citta || BLANK_SPACE 
        }, il pagamento effetuato${(tipoPagamento !== 'CONTANTI' ? ` tramite ${tipoPagamento}` : '' )} equilavente alla somma di ${
          ricevutaInfo.SommaEuro || BLANK_SPACE 
        }€ (${
          EuroInLettere.toUpperCase() || BLANK_SPACE 
        } EURO${
          CentesimiInLettere.toUpperCase()
        }) per l'iscrizione al corso di ${
          allievaInfo.Disciplina || BLANK_SPACE 
        } dal ${ 
          (ricevutaInfo.DataInizioCorso === 'Invalid date' || !ricevutaInfo.DataInizioCorso) 
            ? '______/______/________'
            : ricevutaInfo.DataInizioCorso
        } al ${ 
          (ricevutaInfo.DataScadenzaCorso === 'Invalid date' || !ricevutaInfo.DataScadenzaCorso) 
            ? '______/______/________'
            : ricevutaInfo.DataScadenzaCorso
        }`,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: `Stezzano, ${ 
          (ricevutaInfo.DataRicevuta === 'Invalid date' || !ricevutaInfo.DataRicevuta) 
            ? '______/______/________'
            : ricevutaInfo.DataRicevuta
        }`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 2]
      },
      {
        text: 'Il Presidente',
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 2]
      },
      {
        text: 'Roxana Carro',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 0]
      },
      {
        margin: [0, 0, 0, 2],
        columnGap: 5,
        columns: [{
            text: 'Firma ',
            alignment: 'left',
            width: 50,
            height: 70,
            margin: [0, 20, 0, 10]
        }, {
            image: signature,
            width: 80,
            height: 40,
            margin: [-15, -5, 0, 10]
        }, {
          image: stamp,
          width: 80,
          height: 40,
          margin: [15, -5, 0, 10]
        }]
      },
      {
        text: 'Pil Art è affiliata all’ACSI e regolarmente iscritta sul registro del CONI',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 8,
        margin: [0, 0, 0, 0]
      },
    ]
  };

  return docDefinition;
};

export default pdfTemplateMaggiorenni;
