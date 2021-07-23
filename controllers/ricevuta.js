const { Router } = require('express');
const { getRicevuteOfAllieva, getAllRicevute, creaRicevuta, modificaRicevuta, eliminaRicevuta } = require('../database/ricevutaQuery');

const ricevutaRouter = new Router();

const getRicevuteOfAllievaEndpoint = async (req, res) => {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const ricevute = await getRicevuteOfAllieva(CodiceFiscale);
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
  }
}

const getAllRicevuteEndpoint = async (req, res) => {
  try {
    const ricevute = await getAllRicevute();
    res.status(200).send(ricevute);
  } catch (e) {
    console.log(e);
  }
}

const creaRicevutaEndpoint = async (req, res) => {
  try {
    const response = await creaRicevuta(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const modificaRicevutaEndpoint = async (req, res) => {
  try {
    const response = await modificaRicevuta(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const eliminaRicevutaEndpoint = async (req, res) => {
  try {
    const RicevuteId = req.body.RicevuteId;
    const response = await eliminaRicevuta(RicevuteId);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
  }
}

ricevutaRouter.get('/getRicevuteOfAllieva/:CodiceFiscale', getRicevuteOfAllievaEndpoint);
ricevutaRouter.get('/getAllRicevute', getAllRicevuteEndpoint);
ricevutaRouter.put('/creaRicevuta', creaRicevutaEndpoint);
ricevutaRouter.post('/modificaRicevuta', modificaRicevutaEndpoint);
ricevutaRouter.delete('/eliminaRicevuta', eliminaRicevutaEndpoint);

module.exports = ricevutaRouter;
