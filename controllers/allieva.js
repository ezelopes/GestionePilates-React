const { Router } = require('express');
const { getAllieve, getSingleAllieva, creaAllieva, modificaAllieva, eliminaAllieva, aggiornaDataIscrizione } = require('../database/allievaQuery');

const allievaRouter = new Router();

const getAllieveEndpoint = async (req, res) => {
  try {
    const allieve = await getAllieve();
    res.status(200).send(allieve);
  } catch (e) {
    console.log(e);
 }
}

const getSingleAllievaEndpoint = async (req, res) => {
  try {
    const CodiceFiscale = req.params.CodiceFiscale;
    const allieva = await getSingleAllieva(CodiceFiscale);
    res.status(200).send(allieva);
  } catch (e) {
    console.log(e);
 }
}

const creaAllievaEndpoint = async (req, res) => {
  try {
    const response = await creaAllieva(req.body);
    const responseObject = { AllievaID: response };
    res.status(200).send(responseObject);
  } catch (e) {
 }
}

const modificaAllievaEndpoint = async (req, res) => {
  try {
    const response = await modificaAllieva(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
 }
}

const eliminaAllievaEndpoint = async (req, res) => {
  try {
    const AllievaID = req.body.AllievaID;
    const response = await eliminaAllieva(AllievaID);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
 }
}

const aggiornaDataIscrizioneEndpoint = async (req, res) => {
  try {
    const AllievaID = req.body.AllievaID;
    const DataIscrizione = req.body.DataIscrizione;

    const response = await aggiornaDataIscrizione(DataIscrizione, AllievaID);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
 }
}

allievaRouter.get('/getAllieve', getAllieveEndpoint);
allievaRouter.get('/getSingleAllieva/:CodiceFiscale', getSingleAllievaEndpoint);
allievaRouter.put('/creaAllieva', creaAllievaEndpoint);
allievaRouter.post('/modificaAllieva', modificaAllievaEndpoint);
allievaRouter.post('/aggiornaDataIscrizione', aggiornaDataIscrizioneEndpoint);
allievaRouter.delete('/eliminaAllieva', eliminaAllievaEndpoint);

module.exports = allievaRouter;
