const { Router } = require('express');
const database = require('../helpers/database');

const getSingleAllievaRouter = new Router();

getSingleAllievaRouter.get('/', getSingleAllieva);

async function getSingleAllieva(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const allieva = await database.getSingleAllieva(CodiceFiscale);
    res.status(200).send(allieva);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = getSingleAllieva;
