const { Router } = require('express');
const database = require('../helpers/database');

const creaAllievaRouter = new Router();

creaAllievaRouter.get('/', creaAllieva);

async function creaAllieva(req, res, next) {
  try {
    const response = await database.creaAllieva(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

module.exports = creaAllieva;
