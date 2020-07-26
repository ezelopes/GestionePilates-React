const { Router } = require('express');
const database = require('../helpers/database');

const modificaRicevutaRouter = new Router();

modificaRicevutaRouter.get('/', modificaRicevuta);

async function modificaRicevuta(req, res, next) {
  try {
    const response = await database.modificaRicevuta(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = modificaRicevuta;
