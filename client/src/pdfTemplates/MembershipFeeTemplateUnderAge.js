const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('../helpers/getBase64ImageFromURL');
const convertNumberIntoWord = require('../helpers/convertNumberIntoWord');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const MembershipFeeTemplateUnderAge = async (studentInfo, receiptInfo) => {
  const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const signature = await getBase64ImageFromURL('../images/Signature.png');
  const stamp = await getBase64ImageFromURL('../images/Stamp.png');
  const BLANK_SPACE = '___________________________';

  const totalAmount = receiptInfo.SommaEuro.replace('.', ',');
  const euroAndCents = totalAmount.split(',');
  const euro = euroAndCents[0];
  const cents = euroAndCents[1];

  const eurosInLetters = convertNumberIntoWord(euro);
  const centsInLetters = (cents !== '00' && cents !== '0' && cents !== undefined) 
    ? ` e ${convertNumberIntoWord(cents)} Centesimi`
    : ''

  const docDefinition = {
    info: {
      title: `${receiptInfo.NumeroRicevuta}_${studentInfo.Nome}_${studentInfo.Cognome}_Ricevuta`,
      author: 'Roxana Carro',
      subject: `Ricevuta ${receiptInfo.NumeroRicevuta} di ${studentInfo.Nome} ${studentInfo.Cognome}`
    },
    pageMargins: [40, 5, 40, 0],
    content: [
      {
        image: label_logo,
        fit: [100, 100]
      },
      {
        text: `Ricevuta n° ${receiptInfo.NumeroRicevuta || BLANK_SPACE}`,
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
          studentInfo.NomeGenitore || BLANK_SPACE
        } ${
          studentInfo.CognomeGenitore || BLANK_SPACE
        }, C.F. ${
          studentInfo.CodiceFiscaleGenitore || BLANK_SPACE
        }, il pagamento effetuato${(receiptInfo.TipoPagamento.toUpperCase() !== 'CONTANTI' ? ` tramite ${receiptInfo.TipoPagamento.toUpperCase()}` : '' )} equilavente alla somma di ${
          receiptInfo.SommaEuro || BLANK_SPACE
        }€ (${
          eurosInLetters.toUpperCase() || BLANK_SPACE
        } EURO${
          centsInLetters.toUpperCase()
        }), per il contributo relativo alla quota associativa di ${
          studentInfo.Nome || BLANK_SPACE
        } ${
          studentInfo.Cognome || BLANK_SPACE
        }, C.F. ${
          studentInfo.CodiceFiscale || BLANK_SPACE
        } nato/a a ${
          studentInfo.LuogoNascita || BLANK_SPACE
        }, il ${ 
          (receiptInfo.DataNascita === 'Invalid date' || !receiptInfo.DataNascita) 
            ? '______/______/________'
            : receiptInfo.DataNascita
        } residente in ${
          studentInfo.Indirizzo || BLANK_SPACE
        }, ${
          studentInfo.Citta || BLANK_SPACE
        } della durata di un anno.`,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text:
          'Si comunica che ai sensi dell-art. 15, comma 1°, lett. I-quinquies del TUIR, le spese, per un importo non superiore a 210 euro all’anno, sostenute per l’iscrizione annuale e l’abbonamento, per i ragazzi di età compresa tra 5 e 18 anni, ad associazioni sportive dilettantistiche sono detraibili nella misura del 19% e che l’associazione risulta in possesso dei requisiti a tal fine richiesti',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: `Stezzano, ${ 
          (receiptInfo.DataRicevuta === 'Invalid date' || !receiptInfo.DataRicevuta) 
            ? '______/______/________'
            : receiptInfo.DataRicevuta
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
    ]
  };

  return docDefinition;
};

export default MembershipFeeTemplateUnderAge;
