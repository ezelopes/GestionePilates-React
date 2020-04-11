const { Router } = require('express');
const database = require('../helpers/database');

const getAllRicevuteRouter = new Router();

getAllRicevuteRouter.get('/', getAllRicevute);

async function getAllRicevute(req, res, next) {
  try {
    const ricevute = await database.getAllRicevute();
    console.log(ricevute);
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = getAllRicevute;
