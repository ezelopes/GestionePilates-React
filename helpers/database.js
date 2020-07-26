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
  const [rows, fields] = await pool.execute(
    `SELECT RicevutaID FROM Ricevuta WHERE FK_CodiceFiscale='${CodiceFiscaleAllieva}' LIMIT 1`
  );
  return rows.length;
}

async function getRicevuteOfAllieva(CodiceFiscaleAllieva) {
  const [rows, fields] = await pool.execute(
    `SELECT * FROM ricevuta WHERE FK_CodiceFiscale='${CodiceFiscaleAllieva}';`
  );
  const ricevute = mappingRicevuta(rows);

  return ricevute;
}

async function getAllRicevute() {
  const [rows, fields] = await pool.execute(
    `SELECT Nome, Cognome, DataInizioCorso, DataScadenzaCorso, NumeroRicevuta, SommaEuro
    FROM ricevuta
    INNER JOIN allieva
    ON ricevuta.FK_CodiceFiscale = allieva.CodiceFiscale;`
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
  const [rows, fields] = await pool.execute(`SELECT * FROM allieva WHERE CodiceFiscale='${CodiceFiscale}';`);
  const allieva = mappingAllieve(rows);

  return allieva;
}

async function getSingleInsegnante(CodiceFiscale) {
  const [rows, fields] = await pool.execute(`SELECT * FROM insegnante WHERE CodiceFiscale='${CodiceFiscale}';`);
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
      await pool.execute(`INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, SommaEuro, FK_CodiceFiscale, Archiviata) VALUES ('${NumeroRicevuta}','${TipoPagamento}','${TipoRicevuta}','${DataRicevutaFormatted}','${SommaEuro}','${CodiceFiscale}',${false});`);
      return 'Ricevuta Inserita Correttamente!';
    }

    let DataInizioCorsoFormatted = moment(DataInizioCorso).format('YYYY-MM-DD HH:mm:ss');
    let DataScadenzaCorsoFormatted = moment(DataScadenzaCorso).format('YYYY-MM-DD HH:mm:ss');

    await pool.execute(`INSERT INTO Ricevuta (NumeroRicevuta, TipoPagamento, TipoRicevuta, DataRicevuta, DataInizioCorso, DataScadenzaCorso, SommaEuro, FK_CodiceFiscale, Archiviata) VALUES ('${NumeroRicevuta}','${TipoPagamento}','${TipoRicevuta}','${DataRicevutaFormatted}','${DataInizioCorsoFormatted}','${DataScadenzaCorsoFormatted}','${SommaEuro}','${CodiceFiscale}',${false});`);
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
      `INSERT INTO Allieva VALUES ('${CodiceFiscale}','${Maggiorenne}','${Nome}','${Cognome}','${Citta}','${Indirizzo}','${Cellulare}','${Email}','${DataIscrizioneFormatted}','${DataCertificatoFormatted}','${DataNascitaFormatted}','${LuogoNascita}','${Disciplina}','${NomeGenitore}','${CognomeGenitore}','${CodiceFiscaleGenitore}','${Corso}','${Scuola}');`
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
      `INSERT INTO insegnante VALUES ('${CodiceFiscale}','${Nome}','${Cognome}','${Citta}','${Indirizzo}','${Cellulare}','${Email}','${DataIscrizioneFormatted}','${DataCertificatoFormatted}','${DataNascitaFormatted}','${LuogoNascita}','${Disciplina}','${Corso}','${Scuola}');`
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
    console.log(numeroRicevute);
    if (numeroRicevute > 0) {
      await pool.execute(
        `UPDATE Allieva, Ricevuta SET Allieva.CodiceFiscale='${CodiceFiscale}', Allieva.Maggiorenne='${Maggiorenne}', Allieva.Nome='${Nome}', Allieva.Cognome='${Cognome}', Allieva.Citta='${Citta}', Allieva.Indirizzo='${Indirizzo}', Allieva.Cellulare='${Cellulare}', Allieva.Email='${Email}', Allieva.DataIscrizione='${DataIscrizioneFormatted}', Allieva.DataCertificato='${DataCertificatoFormatted}', Allieva.DataNascita='${DataNascitaFormatted}', Allieva.LuogoNascita='${LuogoNascita}', Allieva.Disciplina='${Disciplina}', Allieva.CodiceFiscaleGenitore='${CodiceFiscaleGenitore}', Allieva.NomeGenitore='${NomeGenitore}', Allieva.CognomeGenitore='${CognomeGenitore}', Allieva.Corso='${Corso}', Allieva.Scuola='${Scuola}', Ricevuta.FK_CodiceFiscale='${CodiceFiscale}' WHERE Allieva.CodiceFiscale='${Selected_CodiceFiscale}' AND Ricevuta.FK_CodiceFiscale='${Selected_CodiceFiscale}';`
      );
    } else {
      await pool.execute(
        `UPDATE Allieva SET Allieva.CodiceFiscale='${CodiceFiscale}', Allieva.Maggiorenne='${Maggiorenne}', Allieva.Nome='${Nome}', Allieva.Cognome='${Cognome}', Allieva.Citta='${Citta}', Allieva.Indirizzo='${Indirizzo}', Allieva.Cellulare='${Cellulare}', Allieva.Email='${Email}', Allieva.DataIscrizione='${DataIscrizioneFormatted}', Allieva.DataCertificato='${DataCertificatoFormatted}', Allieva.DataNascita='${DataNascitaFormatted}', Allieva.LuogoNascita='${LuogoNascita}', Allieva.Disciplina='${Disciplina}', Allieva.CodiceFiscaleGenitore='${CodiceFiscaleGenitore}', Allieva.NomeGenitore='${NomeGenitore}', Allieva.CognomeGenitore='${CognomeGenitore}', Allieva.Corso='${Corso}', Allieva.Scuola='${Scuola}' WHERE Allieva.CodiceFiscale='${Selected_CodiceFiscale}';`
      );
    }
    // else

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
      `UPDATE insegnante SET Nome='${Nome}', Cognome='${Cognome}', Citta='${Citta}', Indirizzo='${Indirizzo}', Cellulare='${Cellulare}', Email='${Email}', DataIscrizione='${DataIscrizioneFormatted}', DataCertificato='${DataCertificatoFormatted}', DataNascita='${DataNascitaFormatted}', LuogoNascita='${LuogoNascita}', Disciplina='${Disciplina}', Corso='${Corso}', Scuola='${Scuola}' WHERE CodiceFiscale='${CodiceFiscale}';`
    );
    return 'Insegnante Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Insegnante!`;
  }
}

async function eliminaAllieva(CodiceFiscale) {
  try {
    // elimina anche le ricevute?
    await pool.execute(`DELETE FROM ricevuta WHERE FK_CodiceFiscale='${CodiceFiscale}';`);
    await pool.execute(`DELETE FROM allieva WHERE CodiceFiscale='${CodiceFiscale}';`);
    return 'Allieva Eliminata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Allieva!`;
  }
}

async function eliminaInsegnante(CodiceFiscale) {
  try {
    const [rows, fields] = await pool.execute(`DELETE FROM insegnante WHERE CodiceFiscale='${CodiceFiscale}';`);
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
      deletePromises.push(pool.execute(`DELETE FROM Ricevuta WHERE RicevutaID=${RicevutaID};`));
    });
    await Promise.all(deletePromises);
    // const [rows, fields] = await pool.execute(`DELETE FROM allieva WHERE CodiceFiscale='${CodiceFiscale}';`);
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
      await pool.execute(`UPDATE ricevuta SET NumeroRicevuta='${NumeroRicevuta}', TipoPagamento='${TipoPagamento}', TipoRicevuta='${TipoRicevuta}', DataRicevuta='${DataRicevutaFormatted}', SommaEuro='${SommaEuro}' WHERE RicevutaID='${RicevutaID}';`);
      return 'Ricevuta Aggiornata Correttamente!';
    }

    const DataInizioCorsoFormatted = moment(DataInizioCorso).format('YYYY-MM-DD HH:mm:ss');
    const DataScadenzaCorsoFormatted = moment(DataScadenzaCorso).format('YYYY-MM-DD HH:mm:ss');
    
    await pool.execute(`UPDATE ricevuta SET NumeroRicevuta='${NumeroRicevuta}', TipoPagamento='${TipoPagamento}', TipoRicevuta='${TipoRicevuta}', DataRicevuta='${DataRicevutaFormatted}', DataInizioCorso='${DataInizioCorsoFormatted}', DataScadenzaCorso='${DataScadenzaCorsoFormatted}', SommaEuro='${SommaEuro}' WHERE RicevutaID='${RicevutaID}';`);
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

/**
 * INSERT INTO allieva (CodiceFiscale, Maggiorenne, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizione, DataCertificato, DataNascita, LuogoNascita, Disciplina)
 * VALUES ('LPSZQL97LPSZQL97', true, 'Ezequiel', 'Lopes', 'Basingstoke', 'Crown Heights', '07397509041','ezelopes97@gmail.com', '2020-02-01', '2020-12-31', '1997-03-30', 'Buenos Aires','Fitness');
 *
 * INSERT INTO ricevuta (DataInizioCorso, DataScadenzaCorso, NumeroRicevuta, SommaEuro, FK_CodiceFiscale, TipoPagamento, Archiviata)
 * VALUES ('2020-02-11', '2020-06-11', '345', '90', 'LPSZQL97LPSZQL97', 'Contanti', false);
 *
 * REMEMBER ON UPDATE CASCADE IN RICEVUTA TABLE
 */
