const { Router } = require('express');
const database = require('../helpers/database');

const getAllieveRouter = new Router();

getAllieveRouter.get('/', getAllieve);

async function getAllieve(req, res, next) {
  try {
    const allieve = await database.getAllieve();
    console.log(allieve);
    res.status(200).send(allieve);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = getAllieve;
