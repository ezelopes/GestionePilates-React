const { Router } = require('express');
const { getRicevuteOfAllieva, getAllRicevute, creaRicevuta, modificaRicevuta, eliminaRicevuta } = require('../database/ricevutaQuery');

const ricevutaRouter = new Router();

async function getRicevuteOfAllievaEndpoint(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const ricevute = await getRicevuteOfAllieva(CodiceFiscale);
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function getAllRicevuteEndpoint(req, res, next) {
  try {
    const ricevute = await getAllRicevute();
    console.log(ricevute);
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function creaRicevutaEndpoint(req, res, next) {
  try {
    const response = await creaRicevuta(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function modificaRicevutaEndpoint(req, res, next) {
  try {
    const response = await modificaRicevuta(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function eliminaRicevutaEndpoint(req, res, next) {
  try {
    const RicevuteId = req.body.RicevuteId;
    const response = await eliminaRicevuta(RicevuteId);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

ricevutaRouter.get('/getRicevuteOfAllieva/:CodiceFiscale', getRicevuteOfAllievaEndpoint);
ricevutaRouter.get('/getAllRicevute', getAllRicevuteEndpoint);
ricevutaRouter.put('/creaRicevuta', creaRicevutaEndpoint);
ricevutaRouter.post('/modificaRicevuta', modificaRicevutaEndpoint);
ricevutaRouter.delete('/eliminaRicevuta', eliminaRicevutaEndpoint);

module.exports = ricevutaRouter;
