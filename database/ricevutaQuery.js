const pool = require('./pool');
const moment = require('moment');

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

async function creaRicevuta({
  NumeroRicevuta,
  TipoPagamento,
  TipoRicevuta,
  DataRicevuta,
  DataInizioCorso,
  DataScadenzaCorso,
  SommaEuro,
  CodiceFiscale,
  AllievaID,
  DataIscrizione
}) {
  try {
    const DataRicevutaFormatted = moment(DataRicevuta).format('YYYY-MM-DD HH:mm:ss');
    if (TipoRicevuta.toUpperCase() == 'QUOTA ASSOCIATIVA') {
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

    if (DataIscrizione === true) {
      await pool.execute(
        `UPDATE Allieva SET DataIscrizione=? WHERE AllievaID=?;`,
        [DataInizioCorsoFormatted, AllievaID]
      );
    }

    return 'Ricevuta Inserita Correttamente!';
  } catch (error) {
    console.log(error);
    return 'Errore nel creare la Ricevuta!';
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
  
    if (TipoRicevuta.toUpperCase() == 'QUOTA ASSOCIATIVA') {
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
  getRicevuteOfAllieva,
  getAllRicevute,
  creaRicevuta,
  modificaRicevuta,
  eliminaRicevuta
};
