const { Router } = require('express');
const database = require('../helpers/database');

const creaRicevutaRouter = new Router();

creaRicevutaRouter.get('/', creaRicevuta);

async function creaRicevuta(req, res, next) {
  try {
    const { NumeroRicevuta, DataInizio, DataScadenza, SommaEuro, TipoPagamento, CodiceFiscale } = req.body;
    const response = await database.creaRicevuta(
      NumeroRicevuta,
      DataInizio,
      DataScadenza,
      SommaEuro,
      TipoPagamento,
      CodiceFiscale
    );
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = creaRicevuta;
