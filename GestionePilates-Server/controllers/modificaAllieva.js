const { Router } = require('express');
const database = require('../helpers/database');

const modificaAllievaRouter = new Router();

modificaAllievaRouter.get('/', modificaAllieva);

async function modificaAllieva(req, res, next) {
  try {
    const {
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
    } = req.body;

    const response = await database.modificaAllieva(
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
    );
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = modificaAllieva;
