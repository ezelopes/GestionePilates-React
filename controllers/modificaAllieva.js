const { Router } = require('express');
const database = require('../helpers/database');

const modificaAllievaRouter = new Router();

modificaAllievaRouter.get('/', modificaAllieva);

async function modificaAllieva(req, res, next) {
  try {
    const response = await database.modificaAllieva(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = modificaAllieva;
