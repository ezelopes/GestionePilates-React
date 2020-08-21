const { Router } = require('express');
const database = require('../database/database');

const allievaRouter = new Router();

async function creaAllieva(req, res, next) {
  try {
    const response = await database.creaAllieva(req.body);
    const responseObject = { AllievaID: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

async function modificaAllieva(req, res, next) {
  try {
    const response = await database.modificaAllieva(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    next(e);
  }
}

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

async function getAllieve(req, res, next) {
  try {
    const allieve = await database.getAllieve();
    console.log(allieve);
    console.log('yoooo')
    res.status(200).send(allieve);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function getSingleAllieva(req, res, next) {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const allieva = await database.getSingleAllieva(CodiceFiscale);
    res.status(200).send(allieva);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

allievaRouter.get('/getAllieve', getAllieve);
allievaRouter.get('/getSingleAllieva/:CodiceFiscale', getSingleAllieva);
allievaRouter.put('/creaAllieva', creaAllieva);
allievaRouter.post('/modificaAllieva', modificaAllieva);
allievaRouter.delete('/eliminaAllieva', eliminaAllieva);

module.exports = allievaRouter;
