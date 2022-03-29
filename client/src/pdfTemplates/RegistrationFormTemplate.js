const formatDate = require('../helpers/formatDateForInputDate');
const getBase64ImageFromURL = require('../helpers/getBase64ImageFromURL');

const RegistrationFormTemplate = async (studentInfo) => {
  const labelLogo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
  const BLANK_SPACE = '________________________________________';
  const BLANK_DATE = '______-______-________';

  const docDefinition = {
    info: {
      title: `${studentInfo.Name}_${studentInfo.Surname}_Modulo_Iscrizione`,
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
        text: `Data ______/______/________`,
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'DOMANDA DI ISCRIZIONE A SOCIO / ATLETA',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
        bold: true,
      },
      {
        text: [
          'Il sottoscritto/a ',
          { text: `${studentInfo.Name || BLANK_SPACE} ${studentInfo.Surname || BLANK_SPACE}`, bold: true },
          ' nato/a a ',
          { text: `${studentInfo.BirthPlace || BLANK_SPACE}`, bold: true },
          ' il ',
          { text: `${studentInfo.DOB ? formatDate(new Date(studentInfo.DOB)) : BLANK_DATE}`, bold: true },
          ' C.F. ',
          { text: `${studentInfo.TaxCode || BLANK_SPACE}`, bold: true },
          '. Residente in ',
          { text: `${studentInfo.Address || BLANK_SPACE}`, bold: true },
          ' a ',
          { text: `${studentInfo.City || BLANK_SPACE}`, bold: true },
          '. Cellulare: ',
          { text: `${studentInfo.MobilePhone || BLANK_SPACE}`, bold: true },
          ' Email: ',
          { text: `${studentInfo.Email || BLANK_SPACE}`, bold: true },
        ],
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'richiede la tessere associativa alla A.S.D PIL ART sito a STEZZANO, Via CESARE BATTISTI n. 9/A',
        alignment: 'center',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
        bold: true,
      },

      {
        text: [
          {
            text:
              '1-Dichiaro di conoscere lo Statuto, di accettarlo integralmente, si impegna a fare quanto nelle sue ' +
              'possibilità per il raggiungimento degli scopi sociali e ad osservare le deliberazioni ' +
              'degli organi sociali, di conoscere le condizioni delle polizze assicurative presenti ' +
              'sul sito www.asinazionale.it. 2-Informativa GDPR UE 679/16: La scrivente Associazione ' +
              'dichiara tutti i dati sensibili personali saranno utilizzati solo per scopi sportivi. ' +
              'La parte che, cartacea sarà archiviata presso la sede sociale di VIA C. BATTISTI 9/A e/o' +
              ' presso lo studio commerciale PROGGETTO IMPRESA SRL, la parte in formato digitale sarà ' +
              'custodita dal Presidente e/o il Segretario della stessa ASD. I dati per i tesseramenti ' +
              'saranno inseriti nella piattaforma nazionale di ASI (ente di promozione sportiva).',
            lineHeight: 1.5,
            fontSize: 10,
          },
          {
            text:
              ' 3-Autorizzo ad effettuare ed utilizzare riprese fotografiche e video per poter propagandare ' +
              'le attività sociali sui canali ufficiali dell’Associazione (sitoweb/facebook/ecc...), ',
            bold: true,
            lineHeight: 1.5,
            fontSize: 10,
          },
          {
            text: ' delle voci 1, 2, 3 ',
            fontSize: 10,
          },
          {
            text: 'ACCETTO',
            bold: true,
            lineHeight: 1.5,
            fontSize: 10,
          },
        ],
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: [
          'La disciplina sportiva svolta nella ASD PIL ART è ',
          { text: `${studentInfo.Discipline || BLANK_SPACE}`, bold: true },
          ' per cui il socio ci consegna un certificato medico di idoneità sportiva con scadenza ',
          { text: `${BLANK_DATE}`, bold: true },
          ' del tipo:',
        ],
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: [
          {
            text: ['___ ', { text: 'AGONISTICA', bold: true }, '\t\t\t  - certificato di idoneità agonistica sportiva \n'],
          },
          {
            text: [
              '___ ',
              { text: 'NON AGONISTICA', bold: true },
              '\t- certificato di idoneità per attività sportive non agonistiche',
            ],
          },
        ],
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'La copertura assicurativa proposta è (barrare la copertura scelta)',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: '___ Base \t\t\t  ___ Integrativa \t\t\t ___ Superintegrativa',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'N. Tessera ASI assegnato __________________',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'Firma __________________________',
        alignment: 'right',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 25],
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
        margin: [0, 0, 0, 25],
      },
      {
        text: 'PER I MINORI',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Figlio fiscalmente a carico del genitore: ${studentInfo.ParentName || BLANK_SPACE}
					${studentInfo.ParentSurname || ''}`,
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Codice Fiscale di chi firma: ${studentInfo.ParentTaxCode || BLANK_SPACE}`,
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'Firma del genitore ______________________________',
        alignment: 'left',
        lineHeight: 1.5,
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
    ],
  };

  return docDefinition;
};

export default RegistrationFormTemplate;
