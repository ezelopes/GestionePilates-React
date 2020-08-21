const { Router } = require('express');
const database = require('../database/database');

const eliminaAllievaRouter = new Router();

eliminaAllievaRouter.get('/', eliminaAllieva);

async function eliminaAllieva(req, res, next) {
  try {
    const AllievaID = req.body.AllievaID;
    const response = await database.eliminaAllieva(AllievaID);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = eliminaAllieva;
