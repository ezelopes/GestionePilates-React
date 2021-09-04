const { Router } = require('express');
const { getStudentReceipts, getAllReceipts, createReceipt, updateReceipt, deleteReceipt } = require('../database/ricevutaQuery');

const receiptRouter = new Router();

const getStudentReceiptsEndpoint = async (req, res) => {
  try {
    const TaxCode = req.params.TaxCode;
    const receipts = await getStudentReceipts(TaxCode);
    res.status(200).send(receipts);
  } catch (e) {
    console.log(e);
  }
}

const getAllReceiptsEndpoint = async (req, res) => {
  try {
    const receipts = await getAllReceipts();
    res.status(200).send(receipts);
  } catch (e) {
    console.log(e);
  }
}

const createReceiptEndpoint = async (req, res) => {
  try {
    const response = await createReceipt(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const updateReceiptEndpoint = async (req, res) => {
  try {
    const response = await updateReceipt(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const deleteReceiptEndpoint = async (req, res) => {
  try {
    const ReceiptID = req.body.ReceiptID;
    const response = await deleteReceipt(ReceiptID);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
  }
}

receiptRouter.get('/getStudentReceipts/:TaxCode', getStudentReceiptsEndpoint);
receiptRouter.get('/getAllReceipts', getAllReceiptsEndpoint);
receiptRouter.put('/createReceipt', createReceiptEndpoint);
receiptRouter.post('/updateReceipt', updateReceiptEndpoint);
receiptRouter.delete('/deleteReceipt', deleteReceiptEndpoint);

module.exports = receiptRouter;
