const { Router } = require('express');
const database = require('../database/database');

const eliminaRicevutaRouter = new Router();

eliminaRicevutaRouter.get('/', eliminaRicevuta);

async function eliminaRicevuta(req, res, next) {
  try {
    const RicevuteId = req.body.RicevuteId;
    const response = await database.eliminaRicevuta(RicevuteId);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = eliminaRicevuta;
