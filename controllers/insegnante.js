const { Router } = require('express');
const { getInsegnanti, getSingleInsegnante, creaInsegnante, modificaInsegnante, eliminaInsegnante} = require('../database/insegnante');

const insegnanteRouter = new Router();

async function getInsegnantiEndpoint(req, res, next) {
  try {
    const insegnanti = await getInsegnanti();
    res.status(200).send(insegnanti);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function getSingleInsegnanteEndpoint(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const insegnante = await getSingleInsegnante(CodiceFiscale);
    res.status(200).send(insegnante);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function creaInsegnanteEndpoint(req, res, next) {
  try {
    const response = await creaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function modificaInsegnanteEndpoint(req, res, next) {
  try {
    const response = await modificaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function eliminaInsegnanteEndpoint(req, res, next) {
  try {
    const CodiceFiscale = req.body.CodiceFiscale;
    const response = await eliminaInsegnante(CodiceFiscale);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

insegnanteRouter.get('/getInsegnanti', getInsegnantiEndpoint);
insegnanteRouter.get('/getSingleInsegnante/:CodiceFiscale', getSingleInsegnanteEndpoint);
insegnanteRouter.put('/creaInsegnante', creaInsegnanteEndpoint);
insegnanteRouter.post('/modificaInsegnante', modificaInsegnanteEndpoint);
insegnanteRouter.delete('/eliminaInsegnante', eliminaInsegnanteEndpoint);

module.exports = insegnanteRouter;
