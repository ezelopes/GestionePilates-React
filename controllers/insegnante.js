const { Router } = require('express');
const { getInsegnanti, getSingleInsegnante, creaInsegnante, modificaInsegnante, eliminaInsegnante} = require('../database/insegnante');

const insegnanteRouter = new Router();

const getInsegnantiEndpoint = async (req, res) => {
  try {
    const insegnanti = await getInsegnanti();
    res.status(200).send(insegnanti);
  } catch (e) {
    console.log(e);
  }
}

const getSingleInsegnanteEndpoint = async (req, res) => {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const insegnante = await getSingleInsegnante(CodiceFiscale);
    res.status(200).send(insegnante);
  } catch (e) {
    console.log(e);
  }
}

const creaInsegnanteEndpoint = async (req, res) => {
  try {
    const response = await creaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const modificaInsegnanteEndpoint = async (req, res) => {
  try {
    const response = await modificaInsegnante(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const eliminaInsegnanteEndpoint = async (req, res) => {
  try {
    const InsegnanteID = req.body.InsegnanteID;
    const response = await eliminaInsegnante(InsegnanteID);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
  }
}

insegnanteRouter.get('/getInsegnanti', getInsegnantiEndpoint);
insegnanteRouter.get('/getSingleInsegnante/:CodiceFiscale', getSingleInsegnanteEndpoint);
insegnanteRouter.put('/creaInsegnante', creaInsegnanteEndpoint);
insegnanteRouter.post('/modificaInsegnante', modificaInsegnanteEndpoint);
insegnanteRouter.delete('/eliminaInsegnante', eliminaInsegnanteEndpoint);

module.exports = insegnanteRouter;
