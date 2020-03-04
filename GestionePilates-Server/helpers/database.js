const mysql = require('mysql2/promise');
const pool = mysql.createPool('mysql://root@localhost/gestionepilates');
const moment = require('moment');

function mappingRicevuta(rows) {
  const ricevute = rows.map(row => {
    return {
      DataInizio: moment(row.DataInizio).format('DD/MM/YYYY'),
      DataScadenza: moment(row.DataScadenza).format('DD/MM/YYYY'),
      NumeroRicevuta: row.NumeroRicevuta,
      SommaEuro: row.SommaEuro,
      FK_CodiceFiscale: row.FK_CodiceFiscale,
      TipoPagamento: row.TipoPagamento,
      Archiviata: row.Archiviata
    };
  });
  return ricevute;
}

function mappingAllieve(rows) {
  const allieve = rows.map(row => {
    return {
      Maggiorenne: row.Maggiorenne,
      CodiceFiscale: row.CodiceFiscale,
      Nome: row.Nome,
      Cognome: row.Cognome,
      Citta: row.Citta,
      Indirizzo: row.Indirizzo,
      Cellulare: row.Cellulare,
      Email: row.Email,
      DataIscrizione: moment(row.DataIscrizione).format('DD/MM/YYYY'),
      DataCertificato: moment(row.DataCertificato).format('DD/MM/YYYY'),
      DataNascita: moment(row.DataNascita).format('DD/MM/YYYY'),
      LuogoNascita: row.LuogoNascita,
      Disciplina: row.Disciplina,
      NomeGenitore: row.NomeGenitore,
      CognomeGenitore: row.CognomeGenitore,
      CodiceFiscaleGenitore: row.CodiceFiscaleGenitore
    };
  });
  return allieve;
}

async function getRicevuteOfAllieva(CodiceFiscaleAllieva) {
  const [rows, fields] = await pool.execute(
    `SELECT * FROM ricevuta WHERE FK_CodiceFiscale='${CodiceFiscaleAllieva}';`
  );
  const ricevute = mappingRicevuta(rows);

  return ricevute;
}

async function getAllieve() {
  const [rows, fields] = await pool.execute('SELECT * FROM allieva');
  const allieve = mappingAllieve(rows);

  console.log(allieve);
  return allieve;
}

async function getSingleAllieva(CodiceFiscale) {
  const [rows, fields] = await pool.execute(`SELECT * FROM allieva WHERE CodiceFiscale='${CodiceFiscale}';`);
  const allieva = mappingAllieve(rows);

  return allieva;
}

async function creaRicevuta(
  NumeroRicevuta,
  DataInizio,
  DataScadenza,
  SommaEuro,
  TipoPagamento,
  CodiceFiscale
) {
  try {
    const DataInizioFormatted = moment(DataInizio).format('YYYY-MM-DD HH:mm:ss');
    const DataScadenzaFormatted = moment(DataScadenza).format('YYYY-MM-DD HH:mm:ss');
    const [rows, fields] = await pool.execute(
      `INSERT INTO Ricevuta (DataInizio, DataScadenza, NumeroRicevuta, SommaEuro, FK_CodiceFiscale, TipoPagamento, Archiviata) VALUES ('${DataInizioFormatted}','${DataScadenzaFormatted}','${NumeroRicevuta}','${SommaEuro}','${CodiceFiscale}','${TipoPagamento}',${false});`
    );
    return 'Ricevuta Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare la Ricevuta!';
  }
  // [DataInizio, DataScadenza, NumeroRicevuta, SommaEuro, CodiceFiscale, TipoPagamento, false]
}

async function creaAllieva(
  CodiceFiscale,
  Maggiorenne,
  Nome,
  Cognome,
  Citta,
  Indirizzo,
  Cellulare,
  Email,
  DataIscrizione,
  DataCertificato,
  DataNascita,
  LuogoNascita,
  Disciplina,
  CodiceFiscaleGenitore,
  NomeGenitore,
  CognomeGenitore
) {
  try {
    const DataIscrizioneFormatted = moment(DataIscrizione).format('YYYY-MM-DD HH:mm:ss');
    const DataCertificatoFormatted = moment(DataCertificato).format('YYYY-MM-DD HH:mm:ss');
    const DataNascitaFormatted = moment(DataNascita).format('YYYY-MM-DD HH:mm:ss');
    const [rows, fields] = await pool.execute(
      `INSERT INTO Allieva VALUES ('${CodiceFiscale}','${Maggiorenne}','${Nome}','${Cognome}','${Citta}','${Indirizzo}','${Cellulare}','${Email}','${DataIscrizioneFormatted}','${DataCertificatoFormatted}','${DataNascitaFormatted}','${LuogoNascita}','${Disciplina}','${CodiceFiscaleGenitore}','${NomeGenitore}','${CognomeGenitore}');`
    );
    return 'Allieva Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare Allieva!';
  }
}

module.exports = {
  getAllieve,
  getSingleAllieva,
  getRicevuteOfAllieva,
  creaRicevuta,
  creaAllieva
};

/**
 * INSERT INTO allieva (CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizione, DataCertificato, DataNascita, LuogoNascita, Disciplina)
 * VALUES ('LPSZQL97LPSZQL97', true, 'Ezequiel', 'Lopes', 'Basingstoke', 'Crown Heights', '07397509041','ezelopes97@gmail.com', '2020-02-01', '2020-12-31', '1997-03-30', 'Buenos Aires','Fitness');
 *
 * INSERT INTO ricevuta (DataInizio, DataScadenza, NumeroRicevuta, SommaEuro, FK_CodiceFiscale, TipoPagamento, Archiviata)
 * VALUES ('2020-02-11', '2020-06-11', '345', '90', 'LPSZQL97LPSZQL97', 'Contanti', false);
 *
 * REMEMBER ON UPDATE CASCADE IN RICEVUTA TABLE
 */
