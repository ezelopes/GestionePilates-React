const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('../helpers/get-base64-image');
const convertNumberIntoWord = require('../helpers/convert-number-in-words');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const pdfTemplateQuotaAssociativaMinorenni = async (allievaInfo, ricevutaInfo) => {
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
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text:
          'L’associazione sportiva dilettantistica PIL-ART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'DICHIARA',
        bold: true,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${
          allievaInfo.NomeGenitore
        } ${
          allievaInfo.CognomeGenitore
        }, C.F. ${
          allievaInfo.CodiceFiscaleGenitore
        }, il pagamento effetuato${(tipoPagamento !== 'CONTANTI' ? ` tramite ${tipoPagamento}` : '' )} equilavente alla somma di ${
          ricevutaInfo.SommaEuro
        }€ (${
          EuroInLettere.toUpperCase()
        } EURO${
          CentesimiInLettere.toUpperCase()
        }), per il contributo relativo alla quota associativa di ${
          allievaInfo.Nome
        } ${
          allievaInfo.Cognome
        }, C.F. ${
          allievaInfo.CodiceFiscale
        } nato/a a ${
          allievaInfo.LuogoNascita
        }, il ${ 
          (ricevutaInfo.DataNascita === 'Invalid date' || !ricevutaInfo.DataNascita) 
            ? '______/______/________'
            : ricevutaInfo.DataNascita
        } residente in ${
          allievaInfo.Indirizzo
        }, ${
          allievaInfo.Citta
        } della durata di un anno.`,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text:
          'Si comunica che ai sensi dell-art. 15, comma 1°, lett. I-quinquies del TUIR, le spese, per un importo non superiore a 210 euro all’anno, sostenute per l’iscrizione annuale e l’abbonamento, per i ragazzi di età compresa tra 5 e 18 anni, ad associazioni sportive dilettantistiche sono detraibili nella misura del 19% e che l’associazione risulta in possesso dei requisiti a tal fine richiesti',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: `Stezzano, ${ 
          (ricevutaInfo.DataRicevuta === 'Invalid date' || !ricevutaInfo.DataRicevuta) 
            ? '______/______/________'
            : ricevutaInfo.DataRicevuta
        }`,
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'Il Presidente',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Roxana Carro',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'FIRMA ______________________________',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'Pil Art è affiliata all’ACSI e regolarmente iscritta sul registro del CONI',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 8,
        margin: [0, 0, 0, 12]
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 12]
      },
      {
        image: label_logo,
        fit: [100, 100]
      },
      {
        text: `Ricevuta n° ${ricevutaInfo.NumeroRicevuta}`,
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text:
          'L’associazione sportiva dilettantistica PIL-ART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'DICHIARA',
        bold: true,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${
          allievaInfo.NomeGenitore
        } ${
          allievaInfo.CognomeGenitore
        }, C.F. ${
          allievaInfo.CodiceFiscaleGenitore
        }, il pagamento effetuato${(tipoPagamento !== 'CONTANTI' ? ` tramite ${tipoPagamento}` : '' )} equilavente alla somma di ${
          ricevutaInfo.SommaEuro
        }€ (${
          EuroInLettere.toUpperCase()
        } EURO${
          CentesimiInLettere.toUpperCase()
        }), per il contributo relativo alla quota associativa di ${
          allievaInfo.Nome
        } ${
          allievaInfo.Cognome
        }, C.F. ${
          allievaInfo.CodiceFiscale
        } nato/a a ${
          allievaInfo.LuogoNascita
        }, il ${ 
          (ricevutaInfo.DataNascita === 'Invalid date' || !ricevutaInfo.DataNascita) 
            ? '______/______/________'
            : ricevutaInfo.DataNascita
        } residente in ${
          allievaInfo.Indirizzo
        }, ${
          allievaInfo.Citta
        } della durata di un anno.`,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text:
          'Si comunica che ai sensi dell-art. 15, comma 1°, lett. I-quinquies del TUIR, le spese, per un importo non superiore a 210 euro all’anno, sostenute per l’iscrizione annuale e l’abbonamento, per i ragazzi di età compresa tra 5 e 18 anni, ad associazioni sportive dilettantistiche sono detraibili nella misura del 19% e che l’associazione risulta in possesso dei requisiti a tal fine richiesti',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: `Stezzano, ${ 
          (ricevutaInfo.DataRicevuta === 'Invalid date' || !ricevutaInfo.DataRicevuta) 
            ? '______/______/________'
            : ricevutaInfo.DataRicevuta
        }`,
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'Il Presidente',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Roxana Carro',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'FIRMA ______________________________',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 12]
      },
      {
        text: 'Pil Art è affiliata all’ACSI e regolarmente iscritta sul registro del CONI',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 8,
        margin: [0, 0, 0, 12]
      }
    ]
  };

  return docDefinition;
};

export default pdfTemplateQuotaAssociativaMinorenni;
