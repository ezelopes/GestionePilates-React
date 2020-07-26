const { Router } = require('express');
const database = require('../helpers/database');

const creaInsegnanteRouter = new Router();

creaInsegnanteRouter.get('/', creaInsegnante);

async function creaInsegnante(req, res, next) {
  try {
    const response = await database.creaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = creaInsegnante;
