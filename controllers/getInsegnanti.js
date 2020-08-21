const { Router } = require('express');
const database = require('../database/database');

const getInsegnantiRouter = new Router();

getInsegnantiRouter.get('/', getInsegnanti);

async function getInsegnanti(req, res, next) {
  try {
    const insegnanti = await database.getInsegnanti();
    console.log(insegnanti);
    res.status(200).send(insegnanti);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = getInsegnanti;
