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
      FK_AllievaID: row.FK_AllievaID,
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
      AllievaID: row.AllievaID,
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

async function contaRicevuteAllieva(AllievaID) {
  const [rows, fields] = await pool.execute('SELECT RicevutaID FROM Ricevuta WHERE FK_AllievaID = ? LIMIT 1', [AllievaID]);
  return rows.length;
}

async function getRicevuteOfAllieva(CodiceFiscale) {
  const [rows, fields] = await pool.execute('SELECT * FROM Ricevuta WHERE FK_CodiceFiscale = ?', [CodiceFiscale]);
  const ricevute = mappingRicevuta(rows);

  return ricevute;
}

async function getAllRicevute() {
  const [rows, fields] = await pool.execute(
    'SELECT Nome, Cognome, DataInizioCorso, DataScadenzaCorso, NumeroRicevuta, SommaEuro \
    FROM ricevuta \
    INNER JOIN allieva \
    ON ricevuta.FK_AllievaID = allieva.AllievaID;'
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
  CodiceFiscale,
  AllievaID
}) {
  try {
    const DataRicevutaFormatted = moment(DataRicevuta).format('YYYY-MM-DD HH:mm:ss');
    console.log({
      NumeroRicevuta,
      TipoPagamento,
      TipoRicevuta,
      DataRicevutaFormatted,
      DataInizioCorso,
      DataScadenzaCorso,
      SommaEuro,
      CodiceFiscale,
      AllievaID
    });
    if (TipoRicevuta == 'Quota Associativa') {
      await pool.execute(
      'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, SommaEuro, FK_CodiceFiscale, FK_AllievaID, Archiviata) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
      [NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevutaFormatted, SommaEuro, CodiceFiscale, AllievaID, false]
      );
      return 'Ricevuta Inserita Correttamente!';
    }

    let DataInizioCorsoFormatted = moment(DataInizioCorso).format('YYYY-MM-DD HH:mm:ss');
    let DataScadenzaCorsoFormatted = moment(DataScadenzaCorso).format('YYYY-MM-DD HH:mm:ss');

    await pool.execute(
      'INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, DataInizioCorso, DataScadenzaCorso, SommaEuro, FK_CodiceFiscale, FK_AllievaID, Archiviata) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevutaFormatted, DataInizioCorsoFormatted, DataScadenzaCorsoFormatted, SommaEuro, CodiceFiscale, AllievaID, false]
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
      'INSERT INTO Allieva (CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizione, DataCertificato, DataNascita, LuogoNascita, Disciplina, Corso, Scuola, CodiceFiscaleGenitore, NomeGenitore, CognomeGenitore) \
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, Corso, Scuola, CodiceFiscaleGenitore, NomeGenitore, CognomeGenitore]
    );

    const [rowsSelect, fieldsSelect] = await pool.execute('SELECT AllievaID FROM Allieva WHERE CodiceFiscale = ?', [CodiceFiscale])
    const AllievaID = rowsSelect[0].AllievaID;

    return AllievaID;
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
      'INSERT INTO Insegnante (CodiceFiscale, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizione, DataCertificato, DataNascita, LuogoNascita, Disciplina, Corso, Scuola) \
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [CodiceFiscale, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, Corso, Scuola]
    );
    return 'Insegnante Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare Insegnante!';
  }
}

async function modificaAllieva({
  AllievaID,
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
    
    const numeroRicevute = await contaRicevuteAllieva(AllievaID);

    if (numeroRicevute > 0) {
      await pool.execute(
        `UPDATE Allieva, Ricevuta SET Allieva.CodiceFiscale=?, Allieva.Maggiorenne=?, Allieva.Nome=?, Allieva.Cognome=?, Allieva.Citta=?, Allieva.Indirizzo=?, Allieva.Cellulare=?, Allieva.Email=?, Allieva.DataIscrizione=?, Allieva.DataCertificato=?, Allieva.DataNascita=?, Allieva.LuogoNascita=?, Allieva.Disciplina=?, Allieva.CodiceFiscaleGenitore=?, Allieva.NomeGenitore=?, Allieva.CognomeGenitore=?, Allieva.Corso=?, Allieva.Scuola=?, Ricevuta.FK_CodiceFiscale=? WHERE Allieva.AllievaID=? AND Ricevuta.FK_AllievaID=?;`,
        [CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, CodiceFiscaleGenitore, NomeGenitore, CognomeGenitore, Corso, Scuola, CodiceFiscale, AllievaID, AllievaID]
      );
    } else {
      await pool.execute(
        `UPDATE Allieva SET Allieva.CodiceFiscale=?, Allieva.Maggiorenne=?, Allieva.Nome=?, Allieva.Cognome=?, Allieva.Citta=?, Allieva.Indirizzo=?, Allieva.Cellulare=?, Allieva.Email=?, Allieva.DataIscrizione=?, Allieva.DataCertificato=?, Allieva.DataNascita=?, Allieva.LuogoNascita=?, Allieva.Disciplina=?, Allieva.CodiceFiscaleGenitore=?, Allieva.NomeGenitore=?, Allieva.CognomeGenitore=?, Allieva.Corso=?, Allieva.Scuola=? WHERE Allieva.AllievaID=?;`,
        [CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, CodiceFiscaleGenitore, NomeGenitore, CognomeGenitore, Corso, Scuola, AllievaID]
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

async function eliminaAllieva(AllievaID) {
  try {
    await pool.execute('DELETE FROM ricevuta WHERE FK_AllievaID=?;', [AllievaID]);
    await pool.execute('DELETE FROM allieva WHERE AllievaID=?;', [AllievaID]);
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

async function eliminaRicevuta(RicevutaID) {
  try {
    await pool.execute('DELETE FROM Ricevuta WHERE RicevutaID=?;', [RicevutaID])

    return 'Ricevuta Eliminata Correttamente!';
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
  getAllieve, //
  getInsegnanti,
  getSingleAllieva, //
  getSingleInsegnante,
  getRicevuteOfAllieva,
  getAllRicevute,
  creaRicevuta,
  creaAllieva, //
  creaInsegnante,
  modificaAllieva, //
  modificaInsegnante,
  modificaRicevuta,
  eliminaAllieva,
  eliminaInsegnante,
  eliminaRicevuta
};
