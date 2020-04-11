const { Router } = require('express');
const database = require('../helpers/database');

const eliminaAllievaRouter = new Router();

eliminaAllievaRouter.get('/', eliminaAllieva);

async function eliminaAllieva(req, res, next) {
  try {
    const CodiceFiscale = req.body.CodiceFiscale;
    const response = await database.eliminaAllieva(CodiceFiscale);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = eliminaAllieva;
