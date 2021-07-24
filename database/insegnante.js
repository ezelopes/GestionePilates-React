const pool = require('./pool');
const moment = require('moment');

const mappingInsegnanti = (rows) => {
  const insegnanti = rows.map(row => {
    return {
      InsegnanteID: row.InsegnanteID,
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

const getInsegnanti = async () => {
  const [rows, fields] = await pool.execute('SELECT * FROM insegnante');
  const insegnante = mappingInsegnanti(rows);

  return insegnante;
}

const getSingleInsegnante = async (CodiceFiscale) => {
  const [rows, fields] = await pool.execute('SELECT * FROM insegnante WHERE CodiceFiscale= ?;', [CodiceFiscale]);
  const allieva = mappingInsegnanti(rows);

  return allieva;
}

const creaInsegnante = async ({
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
}) => {
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

const modificaInsegnante = async ({
  InsegnanteID,
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
}) => {
  try {
    const DataIscrizioneFormatted = moment(DataIscrizione).format('YYYY-MM-DD');
    const DataCertificatoFormatted = moment(DataCertificato).format('YYYY-MM-DD');
    const DataNascitaFormatted = moment(DataNascita).format('YYYY-MM-DD');

    const [rows, fields] = await pool.execute(
      `UPDATE insegnante SET CodiceFiscale=?, Nome=?, Cognome=?, Citta=?, Indirizzo=?, Cellulare=?, Email=?, DataIscrizione=?, DataCertificato=?, DataNascita=?, LuogoNascita=?, Disciplina=?, Corso=?, Scuola=? WHERE InsegnanteID=?;`,
      [CodiceFiscale, Nome, Cognome, Citta, Indirizzo, Cellulare, Email, DataIscrizioneFormatted, DataCertificatoFormatted, DataNascitaFormatted, LuogoNascita, Disciplina, Corso, Scuola, InsegnanteID]
    );
    return 'Insegnante Aggiornata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornare Insegnante!`;
  }
}

const eliminaInsegnante = async (CodiceFiscale) => {
  try {
    await pool.execute('DELETE FROM insegnante WHERE CodiceFiscale=?;', [CodiceFiscale]);
    return 'Insegnante Eliminata Correttamente!';
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Insegnante!`;
  }
}

module.exports = {
  getInsegnanti,
  getSingleInsegnante,
  creaInsegnante,
  modificaInsegnante,
  eliminaInsegnante
};
