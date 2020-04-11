const { Router } = require('express');
const database = require('../helpers/database');

const modificaInsegnanteRouter = new Router();

modificaInsegnanteRouter.get('/', modificaInsegnante);

async function modificaInsegnante(req, res, next) {
  try {
    const {
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
    } = req.body;

    const response = await database.modificaInsegnante(
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
    );
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = modificaInsegnante;
