/* eslint-disable max-len */
import { BLANK_DATE, BLANK_SPACE } from '../commondata';
import { formatDate } from '../helpers/dates';

export const RegistrationFormDanceOsioTemplate = (studentInfo, labelLogo) => {
  const docDefinition = {
    info: {
      title: `${studentInfo.Name}_${studentInfo.Surname}_Modulo_Iscrizione_Dance_Osio`,
      author: 'Roxana Carro',
      subject: `Modulo Iscrizione di ${studentInfo.Name} ${studentInfo.Surname}`,
    },
    pageMargins: [40, 20, 40, 0],
    content: [
      {
        image: labelLogo,
        fit: [100, 100],
      },
      { text: 'DOMANDA DI ISCRIZIONE A TESSERATO / ATLETA MINORENNE', style: 'header' },

      {
        text: [
          'Il/la sottoscritto/a ',
          { text: `${BLANK_SPACE}`, bold: true },
          ' chiede di ammettere PROPRIO FIGLIO/A ',
          { text: `${studentInfo.Name || BLANK_SPACE} ${studentInfo.Surname || BLANK_SPACE}`, bold: true },
          ' nato/a a ',
          { text: `${studentInfo.BirthPlace || BLANK_SPACE}`, bold: true },
          ' il ',
          { text: `${studentInfo.DOB ? formatDate(new Date(studentInfo.DOB)) : BLANK_DATE}`, bold: true },
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
            text: ' e richiede il tesseramento alla PIL ART SSD sito a STEZZANO Via CESARE BATTISTI n. 9/A.',
            bold: true,
          },
        ],
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 9,
        style: 'normal',
      },
      {
        text: ` IL MINORE E’ FISCALMENTE A CARICO DEL GENITORE ${studentInfo.ParentName || BLANK_SPACE} ${
          studentInfo.ParentSurname || BLANK_SPACE
        }`,
        bold: true,
        style: 'normal',
      },
      {
        text: '(Nome e cognome del genitore che detrae le spese per sport)',
        lineHeight: 1.5,
        fontSize: 9,
        alignment: 'right',
      },
      { text: ` Codice Fiscale ${studentInfo.ParentTaxCode || BLANK_SPACE}`, lineHeight: 1.5, fontSize: 9, bold: true },
      {
        text: [
          { text: 'La disciplina sportiva svolta dal minorenne nella SSD PIL ART è sotto la voce CONI: ' },
          { text: 'DANZA SPORTIVA ', bold: true },
          {
            text: 'per cui il tesserato ci consegna un certificato medico di idoneità sportiva con scadenza _____/______/______ del tipo',
          },
        ],
        style: 'normal',
      },

      { stack: ['[  ] AGONISTICA', '[  ] NON AGONISTICA'], style: 'normal' },

      {
        text: [
          { text: 'Per bambini da 8 a 17 anni ' },
          {
            text: 'RICHIEDERE IL MODULO PER VISITA MEDICA AGONISTICA GRATUITA.',
            italics: true,
            decoration: 'underline',
          },
        ],
        style: 'normal',
      },
      {
        text: 'La copertura assicurativa proposta è: BASE (tessera ASI per stagione sportiva 202__ - 202__)',
        style: 'normal',
      },
      {
        text: [
          { text: 'Pubblicazione FOTO: ', style: 'normal', bold: true },
          {
            text: 'Con riferimento alle immagini (FOTO E VIDEO) scattate e/o riprese presso i centri Pil Art SSD*, durante il corso della presente stagione sportiva, i genitori e/o tutori legali AUTORIZZANO',
            style: 'normal',
            bold: true,
            fontSize: 8,
          },
          {
            text: ' che il minore di cui sopra, a titolo gratuito, senza limiti di tempo, anche ai sensi degli artt. 10 e 320 cod.civ. e degli artt. 96 e 97 legge 22.4.1941, n. 633, Legge sul diritto d’autore, partecipi alla pubblicazione e/o diffusione in qualsiasi forma delle proprie immagini sul sito internet e sui profili social di PIL ART SSD, nonché autorizzano la conservazione delle foto e dei video stessi negli archivi informatici dell’Associazione e prendono atto che la finalità di tali pubblicazioni sono meramente di carattere informativo ed eventualmente promozionale.',
            style: 'normal',
            fontSize: 8,
          },
          {
            text: ' La presente liberatoria/autorizzazione potrà essere revocata in ogni tempo con comunicazione scritta da inviare via posta comune o e-mail.',
            style: 'normal',
            fontSize: 8,
          },
          {
            text: ' *Il materiale per la pubblicazione e/o diffusione in qualsiasi forma di materiale audio, video o fotografico in cui il sottoscritto appaia rappresentato o sia comunque riconoscibile che pregiudichi la dignità o il decoro delle persone interessate non sarà oggetto di trattamento e sarà immediatamente cancellato dagli Archivi di PIL ART SSD',
            italics: true,
            style: 'normal',
            fontSize: 8,
          },
        ],
      },
      { text: 'Do il consenso [  ]    Nego il consenso [  ]', bold: true, style: 'normal' },
      {
        text: 'Qualora il consenso in oggetto venga firmato da un solo genitore, visti gli artt. 316, comma 1, 337 ter, comma 3, e 337 quater del Codice Civile, si presuppone la condivisione da parte di entrambi i genitori.',
        italics: true,
        style: 'normal',
        fontSize: 8,
        margin: [0, 5, 0, 5],
      },

      {
        text: [
          { text: 'DATI PERSONALI - Informativa GDPR UE 679/16: ', style: 'normal', bold: true },
          {
            text: ' La scrivente Associazione dichiara che tutti i dati sensibili personali saranno utilizzati solo per scopi sportivi. La parte cartacea sarà archiviata presso la sede sociale di VIA C. BATTISTI 9/A e/o presso lo studio commerciale TOGNI, la parte in formato digitale sarà custodita dal Presidente e/o il Segretario della stessa SSD.  I dati per i tesseramenti saranno inseriti nella piattaforma nazionale di ASI (ente di promozione sportiva).',
            style: 'normal',
            fontSize: 8,
          },
        ],
        margin: [0, 5, 0, 5],
      },

      {
        text: 'LUOGO E DATA _______________________             FIRMA DEL GENITORE ____________________________',
        style: 'normal',
      },

      // Insert a page break here
      { text: '', pageBreak: 'after' },

      {
        text: 'SEDE OSIO',
        decoration: 'underline',
        style: 'header',
      },
      {
        text: 'PRESA VISIONE DEL REGOLAMENTO CHE SI TROVA SUL SITO DELL’ASSOCIAZIONE WWW.PIL-ART.COM',
        style: 'subheader',
      },
      {
        text: 'CHIEDO DI FARE DIVENTARE MIO/A FIGLIO/A TESSERATO DI PIL ART SSD e DI ISCRIVERLO/A AL/AI CORSO/I (segnare con una croce):',
        style: 'normal',
        bold: true,
      },

      {
        stack: [
          '[  ] GIOCODANZA (durata della lezione 1 ora)',
          '[  ] PROPEDEUTICA ALLA DANZA (durata della lezione 1 ora)',
          '[  ] APPROCCIO ALLA DANZA (durata della lezione 1 ora)',
          '[  ] TECNICA PROPEDEUTICA (durata della lezione 1 ora)',
          '[  ] CLASSICO PRE-ACCADEMICO (durata della lezione 1 ora e 1 ora e mezza)',
          '[  ] CLASSICO ACCADEMICO (durata della lezione 1 ora e mezza)',
          '[  ] DANZA MODERNA BABY (durata della lezione 1 ora)',
          '[  ] DANZA MODERNA KIDS (durata della lezione 1 ora)',
          '[  ] DANZA MODERNA CORSO INTERMEDIO (durata della lezione 1 ora)',
          '[  ] HIP HOP BABY (durata della lezione 1 ora)',
          '[  ] HIP HOP KIDS (durata della lezione 1 ora)',
        ],
        style: 'normal',
      },
      {
        text: [
          {
            text: 'CON QUESTO MODULO MI IMPEGNO A VERSARE IL CORRISPETTIVO DOVUTO PER IL/I CORSO/I SCELTO/I +',
          },
          {
            text: ' LA QUOTA D’ISCRIZIONE COMPRESA L’ASSICURAZIONE DI EURO 15.-  ',
            bold: true,
          },
        ],
        style: 'normal',
      },
      { text: 'SCELGO DI PAGARE IL CORSO PRESCELTO (SI ALLEGA LISTINO DI PREZZI):', style: 'subheader' },
      {
        stack: [
          '[  ] IN UN’UNICA SOLUZIONE (con 10% di sconto)',
          '[  ] IN 3 RATE RISPETTANDO LE DATE PRE-STABILITE PER IL VERSAMENTO DI CIASCUNA RATA (OTTOBRE, GENNAIO, MARZO) – IN CASO D’ISCRIZIONE A CORSO GIA’ AVVIATO, VERSERO’ IL CORRISPONDENTE DETRAENDO LE LEZIONI NON FATTE - IN CASO DI ABBANDONO DEL CORSO NON CI SARA’ NESSUN RIMBORSO DELL’ULTIMA RATA VERSATA',
          '[  ] IN 2 RATE RISPETTANDO LE DATE PRE-STABILITE PER IL VERSAMENTO DI CIASCUNA RATA (OTTOBRE E FEBBRAIO) - IN CASO D’ISCRIZIONE A CORSO GIA’ AVVIATO, VERSERO’ IL CORRISPONDENTE DETRAENDO SOLO LE LEZIONI NON FATTE - IN CASO DI ABBANDONO DEL CORSO NON CI SARA’ NESSUN RIMBORSO DELL’ULTIMA RATA VERSATA',
        ],
        style: 'normal',
      },

      {
        text: 'MI IMPEGNO INOLTRE A PRESENTARE REGOLARE CERTIFICATO MEDICO PER I MINORI DAI 6 ANNI IN SU’, CHE CERTIFICA CHE PUO’ SVOLGERE ATTIVITA’ SPORTIVA (da 6 a 8 anni certificato non agonistico)',
        style: 'normal',
      },
      {
        text: [
          {
            text: 'MI IMPEGNO INOLTRE A PRESENTARE REGOLARE ',
            style: 'normal',
          },
          {
            text: 'CERTIFICATO MEDICO ',
            bold: true,
            style: 'normal',
          },
          {
            text: 'PER I MINORI DAI 6 ANNI INSU’',
            fontSize: 10,
            decoration: 'underline',
          },
          {
            text: ' CHE CERTIFICA CHE PUO’ SVOLGERE ATTIVITA’ SPORTIVA ',
            style: 'normal',
          },
          {
            text: '(da 6 a 8 anni certificato non agonistico).',
            fontSize: 7,
          },
        ],
      },

      {
        text: 'LUOGO E DATA _______________________             FIRMA DEL GENITORE ____________________________',
        fontSize: 9,
        margin: [0, 5, 0, 5],
        lineHeight: 1.5,
        bold: true,
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
