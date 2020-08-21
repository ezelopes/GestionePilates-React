const { Router } = require('express');
const database = require('../database/database');

const insegnanteRouter = new Router();

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

async function getSingleInsegnante(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const insegnante = await database.getSingleInsegnante(CodiceFiscale);
    res.status(200).send(insegnante);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function creaInsegnante(req, res, next) {
  try {
    const response = await database.creaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function modificaInsegnante(req, res, next) {
  try {
    const response = await database.modificaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function eliminaInsegnante(req, res, next) {
  try {
    const CodiceFiscale = req.body.CodiceFiscale;
    const response = await database.eliminaInsegnante(CodiceFiscale);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

insegnanteRouter.get('/getInsegnanti', getInsegnanti);
insegnanteRouter.get('/getSingleInsegnante/:CodiceFiscale', getSingleInsegnante);
insegnanteRouter.put('/creaInsegnante', creaInsegnante);
insegnanteRouter.post('/modificaInsegnante', modificaInsegnante);
insegnanteRouter.delete('/eliminaInsegnante', eliminaInsegnante);

module.exports = insegnanteRouter;
