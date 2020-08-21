const { Router } = require('express');
const database = require('../database/database');

const modificaInsegnanteRouter = new Router();

modificaInsegnanteRouter.get('/', modificaInsegnante);

async function modificaInsegnante(req, res, next) {
  try {
    const response = await database.modificaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = modificaInsegnante;
