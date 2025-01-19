/* eslint-disable max-len */
import { BLANK_DATE, BLANK_SPACE } from '../commondata';
import { formatDate } from '../helpers/dates';

export const RegistrationFormFitnessTemplate = (studentInfo, labelLogo) => {
  const docDefinition = {
    info: {
      title: `${studentInfo.Name}_${studentInfo.Surname}_Modulo_Iscrizione_Fitness`,
      author: 'Roxana Carro',
      subject: `Modulo Iscrizione di ${studentInfo.Name} ${studentInfo.Surname}`,
    },
    pageMargins: [40, 20, 40, 0],
    content: [
      {
        image: labelLogo,
        fit: [100, 100],
      },
      {
        text: 'DOMANDA DI ISCRIZIONE A TESSERATO / ATLETA (FITNESS)',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 9,
        margin: [0, 0, 0, 10],
        bold: true,
        style: 'header',
      },
      {
        text: [
          'Il/la sottoscritto/a ',
          { text: `${studentInfo.name || BLANK_SPACE} ${studentInfo.surname || BLANK_SPACE}`, bold: true },
          ' nato/a a ',
          { text: `${studentInfo.BirthPlace || BLANK_SPACE}`, bold: true },
          ' il ',
          { text: `${studentInfo.DOB ? formatDate({ date: studentInfo.DOB }) : BLANK_DATE}`, bold: true },
          ' C.F. ',
          { text: `${studentInfo.TaxCode || BLANK_SPACE}`, bold: true },
          '. Residente in via ',
          { text: `${studentInfo.Address || BLANK_SPACE}`, bold: true },
          ' a ',
          { text: `${studentInfo.City || BLANK_SPACE}`, bold: true },
          '. Cellulare: ',
          { text: `${studentInfo.MobilePhone || BLANK_SPACE}`, bold: true },
          ' Email: ',
          { text: `${studentInfo.Email || BLANK_SPACE}`, bold: true },
          {
            text: ' richiede il tesseramento alla PIL ART SSD sito a STEZZANO Via CESARE BATTISTI n. 9/A.',
            bold: true,
          },
        ],
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 9,
      },
      {
        text: 'La disciplina sportiva svolta dal magiorenne nella PIL ART SSD è sotto la voce CONI: GINNASTICA FINALIZZATA ALLA SALUTE E AL FITNESS per cui il tesserato ci consegna un certificato medico di idoneità sportiva con scadenza _____/______/______ del tipo:',
        style: 'normal',
      },
      { stack: ['[  ] AGONISTICA', '[  ] NON AGONISTICA'], style: 'normal' },
      {
        text: 'La copertura assicurativa proposta è: BASE (tessera ASI per stagione sportiva 202__ - 202__)',
        style: 'normal',
      },

      {
        text: [
          { text: 'DATI PERSONALI - Informativa GDPR UE 679/16: ', style: 'normal', bold: true },
          {
            text: 'La scrivente Associazione dichiara che tutti i dati sensibili personali saranno utilizzati solo per scopi sportivi. La parte cartacea sarà archiviata presso la sede sociale di VIA C. BATTISTI 9/A e/o presso lo studio commerciale TOGNI, la parte in formato digitale sarà custodita dal Presidente e/o il Segretario della stessa ASD. I dati per i tesseramenti saranno inseriti nella piattaforma nazionale di ASI (ente di promozione sportiva).',
            style: 'normal',
            fontSize: 8,
          },
        ],
        margin: [0, 5, 0, 5],
      },
      {
        text: [
          { text: 'Pubblicazione FOTO: ', style: 'normal', bold: true },
          {
            text: 'Con riferimento alle immagini (FOTO E VIDEO) eventualmente scattate e/o riprese presso i centri Pil Art SSD* durante il corso della presente stagione sportiva AUTORIZZO: ',
            style: 'normal',
            bold: true,
            fontSize: 8,
          },
          {
            text: 'a titolo gratuito, senza limiti di tempo, anche ai sensi degli artt. 10 e 320 cod.civ. e degli artt. 96 e 97 legge 22.4.1941, n. 633, Legge sul diritto d’autore, partecipare alla pubblicazione e/o diffusione in qualsiasi forma delle proprie immagini sul sito internet e sui profili social di PIL ART SSD, nonché autorizzo la conservazione delle foto e dei video stessi negli archivi informatici dell’Associazione e prendo atto che la finalità di tali pubblicazioni sono meramente di carattere informativo e/o promozionale.',
            style: 'normal',
            fontSize: 8,
          },
          {
            text: 'La presente liberatoria/autorizzazione potrà essere revocata in ogni tempo con comunicazione scritta da inviare via posta comune o e-mail.',
            style: 'normal',
            fontSize: 8,
          },
          {
            text: ' *Il materiale per la pubblicazione e/o diffusione in qualsiasi forma di materiale audio, video o fotografico in cui il sottoscritto appaia rappresentato o sia comunque riconoscibile che pregiudichi la dignità o il decoro delle persone interessate non sarà oggetto di trattamento e sarà immediatamente cancellato dagli Archivi di PIL ART SSD.',
            italics: true,
            style: 'normal',
            fontSize: 8,
          },
        ],
      },
      { text: 'Do il consenso [  ]    Nego il consenso [  ]', bold: true, style: 'normal' },
      { text: 'LUOGO E DATA _______________________                  FIRMA ____________________________', style: 'normal' },

      {
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 10],
      },
      {
        text: 'PER I MINORI',
        alignment: 'left',
        bold: true,
        style: 'subheader',
      },
      {
        // eslint-disable-next-line max-len
        text: `Figlio fiscalmente a carico del genitore: ${studentInfo.ParentName || BLANK_SPACE} ${
          studentInfo.ParentSurname || BLANK_SPACE
        }`,
        alignment: 'left',
        style: 'normal',
      },
      {
        text: `Codice Fiscale di chi firma: ${studentInfo.ParentTaxCode || BLANK_SPACE}`,
        alignment: 'left',
        style: 'normal',
      },
      {
        text: 'Firma del genitore ______________________________',
        alignment: 'left',
        style: 'normal',
      },

      // Insert a page break here
      { text: '', pageBreak: 'after' },

      {
        text: 'PRESA VISIONE DELLO STATUTO E REGOLAMENTO CHE SI TROVA SUL SITO DELL’ASSOCIAZIONE WWW.PIL-ART.COM CHIEDO DI DIVENTARE SOCIO ORDINARIO DI PIL ART SSD e DI ISCRIVERMI AL/AI CORSO/I:',
        style: 'normal',
      },
      {
        columns: [
          { text: 'PALESTRE COMUNALI - MATTINO:', style: 'subheader' },
          { text: 'SEDE VIA GEROLE 29 - MATTINO:', style: 'subheader' },
        ],
      },
      {
        columns: [
          {
            stack: [
              '[  ] PILATES CLASSICO LUNEDÌ ORE 9.15',
              '[  ] PILATES CLASSICO MERCOLEDÌ ORE 9.15',
              '[  ] PILATES CLASSICO GIOVEDÌ ORE 9.15',
              '[  ] PILATES CLASSICO VENERDÌ ORE 10.30',
              '[  ] CARDIOPILATES LUNEDÌ ORE 10.15',
              '[  ] CARDIOPILATES GIOVEDÌ ORE 10.15',
            ],
          },
          {
            stack: [
              '[  ] POSTURAL PILATES LUNEDÌ ORE 9.00',
              '[  ] POSTURAL PILATES LUNEDÌ ORE 10.00',
              '[  ] PILATES BASE & STRETCHING MARTEDÌ ORE 9.00',
              '[  ] TONIFICAZIONE MARTEDÌ ORE 10.00',
              '[  ] POSTURAL PILATES GIOVEDÌ ORE 9.00',
              '[  ] TONIFICAZIONE GIOVEDÌ ORE 10.00',
              '[  ] PILATES BASE & STRETCHING VENERDÌ ORE 9.00',
              '[  ] PILATES TONE VENERDÌ ORE 10.00',
              '[  ] YOGA FLOW MERCOLEDÌ ORE 9.15',
              '[  ] AERIAL YOGA MERCOLEDÌ ORE 10.15',
            ],
          },
        ],
        style: 'normal',
      },
      {
        columns: [
          { text: 'PALESTRE COMUNALI - POMERIGGIO/SERA:', style: 'subheader' },
          { text: 'SEDE VIA GEROLE 29 - POMERIGGIO/SERA:', style: 'subheader' },
        ],
      },
      {
        columns: [
          {
            stack: [
              '[  ] WALKING PILATES LUNEDÌ ORE 14.00',
              '[  ] POWER PILATES LUNEDÌ ORE 20.15',
              '[  ] POWER PILATES MARTEDÌ ORE 17.30',
              '[  ] PILATES CLASSICO MARTEDÌ ORE 18.30',
              '[  ] CARDIOPILATES MARTEDÌ ORE 19.30',
              '[  ] PILATES CLASSICO MERCOLEDÌ ORE 20.15',
              '[  ] CARDIOPILATES GIOVEDÌ ORE 17.30',
              '[  ] PILATES CLASSICO GIOVEDÌ ORE 18.30',
              '[  ] TONIFICAZIONE GIOVEDÌ ORE 18.30',
              '[  ] PILATES CLASSICO VENERDÌ ORE 18.30',
              '[  ] ALLENAMENTO FUNZIONALE VENERDÌ ORE 18.30',
              '[  ] PILATES CLASSICO VENERDÌ ORE 19.30',
            ],
          },
          {
            stack: [
              '[  ] PILATES GAG GIOVEDI’ ORE 14.00',
              '[  ] YOGA FLOW LUNEDI’ ORE 18.00',
              '[  ] AERIAL YOGA LUNEDI’ ORE 19.00',
              '[  ] YOGA FLOW LUNEDI’ ORE 20.00',
              '[  ] PILATES DINAMICO MERCOLEDI’ ORE 17.00',
              '[  ] PILATES BASE & STRETCHING MERCOLEDI’ ORE 17.00',
              '[  ] POSTURAL PILATES MERCOLEDI’ ORE 19.00',
              '[  ] AERIAL YOGA GIOVEDI’ ORE 20.00',
              '[  ] PILATES DINAMICO CON TRX VENERDI’ ORE 17.00',
              '[  ] TRX VENERDI’ ORE 18.00',
              '[  ] POSTURAL PILATES VENERDI’ ORE 19.00',
              '[  ] PILATES DINAMICO CON TRX SABATO ORE 9.30',
            ],
          },
        ],
        style: 'normal',
      },
      {
        text: [
          {
            text: 'CON QUESTO MODULO MI IMPEGNO A VERSARE IL CORRISPETTIVO DOVUTO PER IL/I CORSO/I SCELTO/I + ',
          },
          {
            text: 'LA QUOTA DELL’ASSICURAZIONE DI EURO 10.',
            bold: true,
          },
        ],
        style: 'normal',
      },
      {
        text: 'SCELGO DI PAGARE IL CORSO PRESCELTO (SI ALLEGA LISTINO DI PREZZI):',
        bold: true,
        style: 'normal',
        margin: [0, 0, 0, 0],
      },
      {
        stack: [
          '[  ] IN 3 RATE RISPETTANDO LE DATE PRE-STABILITE PER IL VERSAMENTO DI CIASCUNA RATA (OTTOBRE, GENNAIO E APRILE) – IN CASO D’ISCRIZIONE A CORSO GIÀ AVVIATO, VERSERO’ IL CORRISPONDENTE DETRAENDO SOLO LE LEZIONI NON FATTE - IN CASO DI ABBANDONO DEL CORSO NON CI SARÀ NESSUN RIMBORSO DELL’ULTIMA RATA VERSATA',
          '[  ] IN 2 RATE RISPETTANDO LE DATE PRE-STABILITE PER IL VERSAMENTO DI CIASCUNA RATA (OTTOBRE E FEBBRAIO) - IN CASO D’ISCRIZIONE A CORSO GIÀ AVVIATO, VERSERO’ IL CORRISPONDENTE DETRAENDO SOLO LE LEZIONI NON FATTE - IN CASO DI ABBANDONO DEL CORSO NON CI SARÀ NESSUN RIMBORSO DELL’ULTIMA RATA VERSATA',
        ],
        style: 'normal',
      },
      {
        text: [
          {
            text: 'MI IMPEGNO INOLTRE A PRESENTARE REGOLARE ',
            style: 'normal',
          },
          {
            text: 'CERTIFICATO MEDICO',
            bold: true,
            style: 'normal',
          },
          {
            text: ' CHE CERTIFICA CHE POSSO SVOLGERE ATTIVITÀ SPORTIVA.',
            style: 'normal',
          },
        ],
      },
      {
        text: 'LUOGO E DATA _____________________________             FIRMA ____________________________',
        bold: true,
        style: 'normal',
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 10],
      },
      {
        text: 'PER I MINORI',
        alignment: 'left',
        bold: true,
        style: 'normal',
      },
      {
        // eslint-disable-next-line max-len
        text: `Figlio fiscalmente a carico del genitore: ${studentInfo.ParentName || BLANK_SPACE} ${
          studentInfo.ParentSurname || BLANK_SPACE
        }`,
        alignment: 'left',
        style: 'normal',
      },
      {
        text: `Codice Fiscale di chi firma: ${studentInfo.ParentTaxCode || BLANK_SPACE}`,
        alignment: 'left',
        style: 'normal',
      },
      {
        text: 'Firma del genitore ______________________________',
        alignment: 'left',
        style: 'normal',
      },
    ],
    styles: {
      header: { fontSize: 12, bold: true, alignment: 'center', margin: [0, 10, 0, 10] },
      subheader: { fontSize: 9, bold: true, margin: [0, 10, 0, 5] },
      normal: { fontSize: 9, margin: [0, 5, 0, 5], lineHeight: 1.5 },
    },
  };

  return docDefinition;
};
