const mysql = require('mysql2/promise');
const moment = require('moment');

const pool = mysql.createPool({
  "host": process.env.DB_HOST || "localhost",
  "user": process.env.DB_USER || "root",
  "password": process.env.DB_PASSWORD || "",
  "database": process.env.DB_NAME || "gestionepilates"
});

function mappingRicevuta(rows) {
  const ricevute = rows.map(row => {
    return {
      RicevutaID: row.RicevutaID,
      TipoRicevuta: row.TipoRicevuta,
      DataRicevuta: moment(row.DataRicevuta).format('DD-MM-YYYY'),
      DataInizioCorso: moment(row.DataInizioCorso).format('DD-MM-YYYY'),
      DataScadenzaCorso: moment(row.DataScadenzaCorso).format('DD-MM-YYYY'),
      NumeroRicevuta: row.NumeroRicevuta,
      SommaEuro: row.SommaEuro,
      FK_CodiceFiscale: row.FK_CodiceFiscale,
      TipoPagamento: row.TipoPagamento,
      Archiviata: row.Archiviata
    };
  });
  return ricevute;
}

function mappingAllRicevute(rows) {
  const ricevute = rows.map(row => {
    return {
      Nome: row.Nome,
      Cognome: row.Cognome,
      DataInizioCorso: moment(row.DataInizioCorso).format('DD-MM-YYYY'),
      DataScadenzaCorso: moment(row.DataScadenzaCorso).format('DD-MM-YYYY'),
      NumeroRicevuta: row.NumeroRicevuta,
      SommaEuro: row.SommaEuro
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
      DataIscrizione: moment(row.DataIscrizione).format('DD-MM-YYYY'),
      DataCertificato: moment(row.DataCertificato).format('DD-MM-YYYY'),
      DataNascita: moment(row.DataNascita).format('DD-MM-YYYY'),
      LuogoNascita: row.LuogoNascita,
      Disciplina: row.Disciplina,
      Corso: row.Corso,
      Scuola: row.Scuola,
      NomeGenitore: row.NomeGenitore,
      CognomeGenitore: row.CognomeGenitore,
      CodiceFiscaleGenitore: row.CodiceFiscaleGenitore
    };
  });
  return allieve;
}

function mappingInsegnanti(rows) {
  const insegnanti = rows.map(row => {
    return {
      CodiceFiscale: row.CodiceFiscale,
      Nome: row.Nome,
      Cognome: row.Cognome,
      Citta: row.Citta,
      Indirizzo: row.Indirizzo,
      Cellulare: row.Cellulare,
      Email: row.Email,
      DataIscrizione: moment(row.DataIscrizione).format('DD-MM-YYYY'),
      DataCertificato: moment(row.DataCertificato).format('DD-MM-YYYY'),
      DataNascita: moment(row.DataNascita).format('DD-MM-YYYY'),
      LuogoNascita: row.LuogoNascita,
      Disciplina: row.Disciplina,
      Corso: row.Corso,
      Scuola: row.Scuola,
    };
  });
  return insegnanti;
}

async function contaRicevuteAllieva(CodiceFiscaleAllieva) {
  const [rows, fields] = await pool.execute('SELECT RicevutaID FROM Ricevuta WHERE FK_CodiceFiscale = ? LIMIT 1', [CodiceFiscaleAllieva]);
  return rows.length;
}

async function getRicevuteOfAllieva(CodiceFiscaleAllieva) {
  const [rows, fields] = await pool.execute('SELECT * FROM Ricevuta WHERE FK_CodiceFiscale = ?', [CodiceFiscaleAllieva]);
  const ricevute = mappingRicevuta(rows);

  return ricevute;
}

async function getAllRicevute() {
  const [rows, fields] = await pool.execute(
    'SELECT Nome, Cognome, DataInizioCorso, DataScadenzaCorso, NumeroRicevuta, SommaEuro \
    FROM ricevuta \
    INNER JOIN allieva \
    ON ricevuta.FK_CodiceFiscale = allieva.CodiceFiscale;'
  );
  const ricevute = mappingAllRicevute(rows);

  return ricevute;
}

async function getAllieve() {
  const [rows, fields] = await pool.execute('SELECT * FROM allieva');
  const allieve = mappingAllieve(rows);

  console.log(allieve);
  return allieve;
}

async function getInsegnanti() {
  const [rows, fields] = await pool.execute('SELECT * FROM insegnante');
  const insegnante = mappingInsegnanti(rows);

  console.log(insegnante);
  return insegnante;
}

async function getSingleAllieva(CodiceFiscale) {
  const [rows, fields] = await pool.execute('SELECT * FROM allieva WHERE CodiceFiscale= ?;', [CodiceFiscale]);
  const allieva = mappingAllieve(rows);

  return allieva;
}

async function getSingleInsegnante(CodiceFiscale) {
  const [rows, fields] = await pool.execute('SELECT * FROM insegnante WHERE CodiceFiscale= ?;', [CodiceFiscale]);
  const allieva = mappingInsegnanti(rows);

  return allieva;
}

async function creaRicevuta({
  NumeroRicevuta,
  TipoPagamento,
  TipoRicevuta,
  DataRicevuta,
  DataInizioCorso,
  DataScadenzaCorso,
  SommaEuro,
  CodiceFiscale
}) {
  try {
    // console.log({ NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, DataInizioCorso, DataScadenzaCorso, SommaEuro, CodiceFiscale });
    const DataRicevutaFormatted = moment(DataRicevuta).format('YYYY-MM-DD HH:mm:ss');

    if (TipoRicevuta == 'Quota Associativa') {
      await pool.execute(
      'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, SommaEuro, FK_CodiceFiscale, Archiviata) \
      VALUES (?, ?, ?, ?, ?, ?, ?);',
      [NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevutaFormatted, SommaEuro, CodiceFiscale, false]
      );
      return 'Ricevuta Inserita Correttamente!';
    }

    let DataInizioCorsoFormatted = moment(DataInizioCorso).format('YYYY-MM-DD HH:mm:ss');
    let DataScadenzaCorsoFormatted = moment(DataScadenzaCorso).format('YYYY-MM-DD HH:mm:ss');

    await pool.execute(
      'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, DataInizioCorso, DataScadenzaCorso, SommaEuro, FK_CodiceFiscale, Archiviata) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevutaFormatted, DataInizioCorsoFormatted, DataScadenzaCorsoFormatted, SommaEuro, CodiceFiscale, false]
      );
    return 'Ricevuta Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare la Ricevuta!';
  }
}

async function creaAllieva({
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
  Corso,
  Scuola,
  CodiceFiscaleGenitore,
  NomeGenitore,
  CognomeGenitore
}) {
  try {
    const DataIscrizioneFormatted = moment(DataIscrizione).format('YYYY-MM-DD HH:mm:ss');
    const DataCertificatoFormatted = moment(DataCertificato).format('YYYY-MM-DD HH:mm:ss');
    const DataNascitaFormatted = moment(DataNascita).format('YYYY-MM-DD HH:mm:ss');
    const [rows, fields] = await pool.execute(
      'INSERT INTO Allieva VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, NomeGenitore, CognomeGenitore, CodiceFiscaleGenitore, Corso, Scuola]
    );
    return 'Allieva Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare Allieva!';
  }
}

async function creaInsegnante({
  CodiceFiscale,
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
  Corso,
  Scuola,
}) {
  try {
    const DataIscrizioneFormatted = moment(DataIscrizione).format('YYYY-MM-DD HH:mm:ss');
    const DataCertificatoFormatted = moment(DataCertificato).format('YYYY-MM-DD HH:mm:ss');
    const DataNascitaFormatted = moment(DataNascita).format('YYYY-MM-DD HH:mm:ss');
    const [rows, fields] = await pool.execute(
      'INSERT INTO Insegnante VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [CodiceFiscale, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, Corso, Scuola]
    );
    return 'Insegnante Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare Insegnante!';
  }
}

async function modificaAllieva({
  Selected_CodiceFiscale,
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
  Corso,
  Scuola,
  CodiceFiscaleGenitore,
  NomeGenitore,
  CognomeGenitore
}) {
  try {
    const DataIscrizioneFormatted = moment(DataIscrizione).format('YYYY-MM-DD HH:mm:ss');
    const DataCertificatoFormatted = moment(DataCertificato).format('YYYY-MM-DD HH:mm:ss');
    const DataNascitaFormatted = moment(DataNascita).format('YYYY-MM-DD HH:mm:ss');
    
    const numeroRicevute = await contaRicevuteAllieva(Selected_CodiceFiscale);

    if (numeroRicevute > 0) {
      await pool.execute(
        `UPDATE Allieva, Ricevuta SET Allieva.CodiceFiscale=?, Allieva.Maggiorenne=?, Allieva.Nome=?, Allieva.Cognome=?, Allieva.Citta=?, Allieva.Indirizzo=?, Allieva.Cellulare=?, Allieva.Email=?, Allieva.DataIscrizione=?, Allieva.DataCertificato=?, Allieva.DataNascita=?, Allieva.LuogoNascita=?, Allieva.Disciplina=?, Allieva.CodiceFiscaleGenitore=?, Allieva.NomeGenitore=?, Allieva.CognomeGenitore=?, Allieva.Corso=?, Allieva.Scuola=?, Ricevuta.FK_CodiceFiscale=? WHERE Allieva.CodiceFiscale=? AND Ricevuta.FK_CodiceFiscale=?;`,
        [CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, CodiceFiscaleGenitore, NomeGenitore, CognomeGenitore, Corso, Scuola, CodiceFiscale, Selected_CodiceFiscale, Selected_CodiceFiscale]
      );
    } else {
      await pool.execute(
        `UPDATE Allieva SET Allieva.CodiceFiscale=?, Allieva.Maggiorenne=?, Allieva.Nome=?, Allieva.Cognome=?, Allieva.Citta=?, Allieva.Indirizzo=?, Allieva.Cellulare=?, Allieva.Email=?, Allieva.DataIscrizione=?, Allieva.DataCertificato=?, Allieva.DataNascita=?, Allieva.LuogoNascita=?, Allieva.Disciplina=?, Allieva.CodiceFiscaleGenitore=?, Allieva.NomeGenitore=?, Allieva.CognomeGenitore=?, Allieva.Corso=?, Allieva.Scuola=? WHERE Allieva.CodiceFiscale=?;`,
        [CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, CodiceFiscaleGenitore, NomeGenitore, CognomeGenitore, Corso, Scuola, Selected_CodiceFiscale]
        );
    }

    return 'Allieva Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Allieva!`;
  }
}

async function modificaInsegnante({
  CodiceFiscale,
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
  Corso,
  Scuola,
}) {
  try {
    const DataIscrizioneFormatted = moment(DataIscrizione).format('YYYY-MM-DD HH:mm:ss');
    const DataCertificatoFormatted = moment(DataCertificato).format('YYYY-MM-DD HH:mm:ss');
    const DataNascitaFormatted = moment(DataNascita).format('YYYY-MM-DD HH:mm:ss');
    const [rows, fields] = await pool.execute(
      `UPDATE insegnante SET Nome=?, Cognome=?, Citta=?, Indirizzo=?, Cellulare=?, Email=?, DataIscrizione=?, DataCertificato=?, DataNascita=?, LuogoNascita=?, Disciplina=?, Corso=?, Scuola=? WHERE CodiceFiscale=?;`,
      [Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, Corso, Scuola, CodiceFiscale]
    );
    return 'Insegnante Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Insegnante!`;
  }
}

async function eliminaAllieva(CodiceFiscale) {
  try {
    await pool.execute('DELETE FROM ricevuta WHERE FK_CodiceFiscale=?;', [CodiceFiscale]);
    await pool.execute('DELETE FROM allieva WHERE CodiceFiscale=?;', [CodiceFiscale]);
    return 'Allieva Eliminata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Allieva!`;
  }
}

async function eliminaInsegnante(CodiceFiscale) {
  try {
    await pool.execute('DELETE FROM insegnante WHERE CodiceFiscale=?;', [CodiceFiscale]);
    return 'Insegnante Eliminata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Insegnante!`;
  }
}

async function eliminaRicevute(RicevuteId) {
  try {
    const deletePromises = [];
    RicevuteId.map(RicevutaID => {
      deletePromises.push(pool.execute('DELETE FROM Ricevuta WHERE RicevutaID=?;', [RicevutaID]));
    });
    await Promise.all(deletePromises);

    return 'Ricevute Eliminate Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Ricevute!`;
  }
}

async function modificaRicevuta({
  RicevutaID,
  NumeroRicevuta,
  TipoPagamento,
  TipoRicevuta,
  DataRicevuta,
  DataInizioCorso,
  DataScadenzaCorso,
  SommaEuro,
}) {
  try {
    const DataRicevutaFormatted = moment(DataRicevuta).format('YYYY-MM-DD HH:mm:ss');

    if (TipoRicevuta == 'Quota Associativa') {
      await pool.execute(
        'UPDATE ricevuta SET NumeroRicevuta=?, TipoPagamento=?, TipoRicevuta=?, DataRicevuta=?, SommaEuro=? WHERE RicevutaID=?;', 
        [NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevutaFormatted, SommaEuro, RicevutaID]
      );
      return 'Ricevuta Aggiornata Correttamente!';
    }

    const DataInizioCorsoFormatted = moment(DataInizioCorso).format('YYYY-MM-DD HH:mm:ss');
    const DataScadenzaCorsoFormatted = moment(DataScadenzaCorso).format('YYYY-MM-DD HH:mm:ss');
    
    await pool.execute(
      `UPDATE ricevuta SET NumeroRicevuta=?, TipoPagamento=?, TipoRicevuta=?, DataRicevuta=?, DataInizioCorso=?, DataScadenzaCorso=?, SommaEuro=? WHERE RicevutaID=?;`,
      [NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevutaFormatted, DataInizioCorsoFormatted, DataScadenzaCorsoFormatted, SommaEuro, RicevutaID]
    );
    return 'Ricevuta Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Ricevuta!`;
  }
} 

module.exports = {
  getAllieve,
  getInsegnanti,
  getSingleAllieva,
  getSingleInsegnante,
  getRicevuteOfAllieva,
  getAllRicevute,
  creaRicevuta,
  creaAllieva,
  creaInsegnante,
  modificaAllieva,
  modificaInsegnante,
  modificaRicevuta,
  eliminaAllieva,
  eliminaInsegnante,
  eliminaRicevute
};
