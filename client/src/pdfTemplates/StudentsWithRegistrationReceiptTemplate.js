export const StudentsWithRegistrationReceiptTemplate = (studentsWithReceipts, year, labelLogo) => {
  const docTitle = `ALLIEVE ISCRITTE NEL ${year}`;

  const tableBody = [
    [
      { text: 'Codice Fiscale', bold: true },
      { text: 'Nome', bold: true },
      { text: 'Indirizzo', bold: true },
      { text: 'Data e Luogo di Nascita', bold: true },
      { text: 'Data Iscrizione', bold: true },
    ],
  ];
  studentsWithReceipts.forEach((student) =>
    tableBody.push([
      student.TaxCode,
      `${student.Name} ${student.Surname}`,
      `${student.Address} ${student.City}`,
      `${student.DOB} ${student.BirthPlace}`,
      student.ReceiptDate,
    ])
  );

  const content = [
    {
      image: labelLogo,
      alignment: 'right',
      fit: [100, 100],
      margin: [0, 0, 0, 10],
    },
    {
      text: docTitle,
      lineHeight: 1.5,
      fontSize: 16,
      margin: [0, 0, 0, 10],
      bold: true,
    },
    {
      margin: [0, 0, 0, 0],
      layout: {
        defaultBorder: true,
        paddingLeft() {
          return 5;
        },
        paddingRight() {
          return 5;
        },
        paddingTop() {
          return 5;
        },
        paddingBottom() {
          return 5;
        },
      },
      table: {
        headerRows: 1,
        body: tableBody,
      },
    },
  ];

  const docDefinition = {
    info: {
      title: docTitle,
      author: 'Roxana Carro',
      subject: 'Iscrizione allieve per anno',
    },
    pageMargins: [40, 40, 40, 40],
    content,
  };

  return docDefinition;
};
