const { Router } = require('express');
const database = require('../helpers/database');

const eliminaRicevuteRouter = new Router();

eliminaRicevuteRouter.get('/', eliminaRicevute);

async function eliminaRicevute(req, res, next) {
  try {
    const RicevuteId = req.body.RicevuteId;
    const response = await database.eliminaRicevute(RicevuteId);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = eliminaRicevute;
