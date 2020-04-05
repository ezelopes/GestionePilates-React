const { Router } = require('express');
const database = require('../helpers/database');

const creaInsegnanteRouter = new Router();

creaInsegnanteRouter.get('/', creaInsegnante);

async function creaInsegnante(req, res, next) {
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

    const response = await database.creaInsegnante(
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

module.exports = creaInsegnante;
