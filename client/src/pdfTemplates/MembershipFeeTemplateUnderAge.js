import convertNumberIntoWord from '../helpers/convertNumberIntoWord';
import { formatDate } from '../helpers/dates';
import { BLANK_DATE, BLANK_SPACE } from '../commondata';

export const MembershipFeeTemplateUnderAge = (studentInfo, receiptInfo, labelLogo, signature, stamp) => {
  const amountPaid = receiptInfo.AmountPaid.replace('.', ',');
  const euroAndCents = amountPaid.split(',');
  const euro = euroAndCents[0];
  const cents = euroAndCents[1];

  const eurosInLetters = convertNumberIntoWord(euro);
  const centsInLetters =
    cents !== '00' && cents !== '0' && cents !== undefined ? ` e ${convertNumberIntoWord(cents)} Centesimi` : '';

  const docDefinition = {
    info: {
      title: `${receiptInfo.ReceiptNumber}_${studentInfo.Name}_${studentInfo.Surname}_Ricevuta.pdf`.replace('/', '-'),
      author: 'Roxana Carro',
      subject: `Ricevuta ${receiptInfo.ReceiptNumber} di ${studentInfo.Name} ${studentInfo.Surname}`,
    },
    pageMargins: [40, 5, 40, 0],
    content: [
      {
        image: labelLogo,
        fit: [100, 100],
      },
      {
        text: `Ricevuta n° ${receiptInfo.ReceiptNumber || BLANK_SPACE}`,
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text:
          new Date(receiptInfo.ReceiptDate).getFullYear() >= 2025
            ? 'La società dilettantistica PIL-ART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167'
            : 'L’associazione sportiva dilettantistica PILART con sede legale a Stezzano in Via C. Battisti 9°, C.F. 95229530167',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'DICHIARA',
        bold: true,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: `di aver ricevuto dal/dalla Sig./Sig.Ra ${studentInfo.ParentName || BLANK_SPACE} ${
          studentInfo.ParentSurname || BLANK_SPACE
        }, C.F. ${studentInfo.ParentTaxCode || BLANK_SPACE}, il pagamento effetuato${
          receiptInfo.PaymentMethod.toUpperCase() !== 'CONTANTI' ? ` tramite ${receiptInfo.PaymentMethod.toUpperCase()}` : ''
        } equilavente alla somma di ${receiptInfo.AmountPaid || BLANK_SPACE}€ (${
          eurosInLetters.toUpperCase() || BLANK_SPACE
        } EURO${centsInLetters.toUpperCase()}), per il contributo relativo alla quota associativa di ${
          studentInfo.Name || BLANK_SPACE
        } ${studentInfo.Surname || BLANK_SPACE}, C.F. ${studentInfo.TaxCode || BLANK_SPACE} nato/a a ${
          studentInfo.BirthPlace || BLANK_SPACE
        }, il ${studentInfo.DOB ? formatDate(new Date(studentInfo.DOB)) : BLANK_DATE} residente in ${
          studentInfo.Address || BLANK_SPACE
        }, ${studentInfo.City || BLANK_SPACE} della durata di un anno.`,
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text:
          'Si comunica che ai sensi dell-art. 15, comma 1°, lett. I-quinquies del TUIR, le spese, per un ' +
          'importo non superiore a 210 euro all’anno, sostenute per l’iscrizione annuale e l’abbonamento, ' +
          'per i ragazzi di età compresa tra 5 e 18 anni, ad associazioni sportive dilettantistiche sono ' +
          'detraibili nella misura del 19% e che l’associazione risulta in possesso dei requisiti ' +
          'a tal fine richiesti',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Stezzano, ${receiptInfo.ReceiptDate ? formatDate(new Date(receiptInfo.ReceiptDate)) : BLANK_DATE}`,
        alignment: 'left',
        fontSize: 10,
        margin: [0, 0, 0, 2],
      },
      {
        text: 'Il Presidente',
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 2],
      },
      {
        text: 'Roxana Carro',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 0],
      },
      {
        margin: [0, 0, 0, 2],
        columnGap: 5,
        columns: [
          {
            text: 'Firma ',
            alignment: 'left',
            width: 50,
            height: 70,
            margin: [0, 20, 0, 10],
          },
          {
            image: signature,
            width: 80,
            height: 40,
            margin: [-15, -5, 0, 10],
          },
          {
            image: stamp,
            width: 80,
            height: 40,
            margin: [15, -5, 0, 10],
          },
        ],
      },
      {
        text: 'Pil Art è affiliata all’ASI e regolarmente iscritta sul registro del CONI',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 8,
        margin: [0, 0, 0, 5],
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 10],
      },
    ],
  };

  return docDefinition;
};
