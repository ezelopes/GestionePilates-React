const { Router } = require('express');
const database = require('../database/database');

const ricevutaRouter = new Router();

ricevutaRouter.get('/', creaRicevuta);

async function getRicevuteOfAllieva(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const ricevute = await database.getRicevuteOfAllieva(CodiceFiscale);
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function getAllRicevute(req, res, next) {
  try {
    const ricevute = await database.getAllRicevute();
    console.log(ricevute);
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function creaRicevuta(req, res, next) {
  try {
    const response = await database.creaRicevuta(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function modificaRicevuta(req, res, next) {
  try {
    const response = await database.modificaRicevuta(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function eliminaRicevuta(req, res, next) {
  try {
    const RicevuteId = req.body.RicevuteId;
    const response = await database.eliminaRicevuta(RicevuteId);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

ricevutaRouter.get('/getRicevuteOfAllieva/:CodiceFiscale', getRicevuteOfAllieva);
ricevutaRouter.get('/getAllRicevute', getAllRicevute);
ricevutaRouter.put('/creaRicevuta', creaRicevuta);
ricevutaRouter.post('/modificaRicevuta', modificaRicevuta);
ricevutaRouter.delete('/eliminaRicevuta', eliminaRicevuta);

module.exports = ricevutaRouter;
