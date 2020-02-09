const { Router } = require('express');
const database = require('../helpers/database');

const remindersRouter = new Router();

remindersRouter.get('/', getAllieve);

async function getAllieve(req, res, next) {
  try {
    const allieve = await database.getAllieve();
    console.log(allieve);
    res.status(200).send(allieve);
  } catch (e) {
    console.log('my bad');
    next(e);
  }
}

module.exports = getAllieve;
