const { Router } = require('express');
const database = require('../database/database');

const getRicevuteOfAllievaRouter = new Router();

getRicevuteOfAllievaRouter.get('/', getRicevuteOfAllieva);

async function getRicevuteOfAllieva(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const ricevute = await database.getRicevuteOfAllieva(CodiceFiscale);
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = getRicevuteOfAllieva;
