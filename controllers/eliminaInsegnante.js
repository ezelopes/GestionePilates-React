const { Router } = require('express');
const database = require('../database/database');

const eliminaInsegnanteRouter = new Router();

eliminaInsegnanteRouter.get('/', eliminaInsegnante);

async function eliminaInsegnante(req, res, next) {
  try {
    const CodiceFiscale = req.body.CodiceFiscale;
    const response = await database.eliminaInsegnante(CodiceFiscale);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = eliminaInsegnante;
