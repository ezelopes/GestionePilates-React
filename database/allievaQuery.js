const pool = require('./pool');
const moment = require('moment');

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

async function contaRicevuteAllieva(AllievaID) {
  const [rows, fields] = await pool.execute('SELECT RicevutaID FROM Ricevuta WHERE FK_AllievaID = ? LIMIT 1', [AllievaID]);
  return rows.length;
}

async function getAllieve() {
  const [rows, fields] = await pool.execute('SELECT * FROM allieva');
  const allieve = mappingAllieve(rows);
  
  console.log(allieve);
  return allieve;
}

async function getSingleAllieva(CodiceFiscale) {
  const [rows, fields] = await pool.execute('SELECT * FROM allieva WHERE CodiceFiscale= ?;', [CodiceFiscale]);
  const allieva = mappingAllieve(rows);
  
  return allieva;
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

module.exports = {
  getAllieve,
  getSingleAllieva,  
  creaAllieva,  
  modificaAllieva,  
  eliminaAllieva
};