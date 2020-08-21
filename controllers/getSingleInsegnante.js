const { Router } = require('express');
const database = require('../database/database');

const getSingleInsegnanteRouter = new Router();

getSingleInsegnanteRouter.get('/', getSingleInsegnante);

async function getSingleInsegnante(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const insegnante = await database.getSingleInsegnante(CodiceFiscale);
    res.status(200).send(insegnante);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = getSingleInsegnante;
