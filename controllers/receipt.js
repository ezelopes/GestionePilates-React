const { Router } = require('express');
const {
  getStudentReceipts,
  getAllReceipts,
  createReceipt,
  updateReceipt,
  deleteReceipt,
  deleteReceipts,
} = require('../database/receiptQuery');

const receiptRouter = new Router();

const getStudentReceiptsEndpoint = async (req, res) => {
  try {
    const { TaxCode } = req.params;
    const receipts = await getStudentReceipts(TaxCode);
    res.status(200).send(receipts);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getAllReceiptsEndpoint = async (_, res) => {
  try {
    const receipts = await getAllReceipts();
    res.status(200).send(receipts);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createReceiptEndpoint = async (req, res) => {
  try {
    const { ReceiptID, message } = await createReceipt(req.body);

    res.status(200).send({ ReceiptID, message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const updateReceiptEndpoint = async (req, res) => {
  try {
    const { message } = await updateReceipt(req.body);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const deleteReceiptEndpoint = async (req, res) => {
  try {
    console.log(req.body);

    const { ReceiptID } = req.body;
    const { message } = await deleteReceipt(ReceiptID);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const deleteReceiptsEndpoint = async (req, res) => {
  try {
    const { ReceiptIDs } = req.body;
    const { message } = await deleteReceipts(ReceiptIDs);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

receiptRouter.get('/getStudentReceipts/:TaxCode', getStudentReceiptsEndpoint);
receiptRouter.get('/getAllReceipts', getAllReceiptsEndpoint);
receiptRouter.put('/createReceipt', createReceiptEndpoint);
receiptRouter.post('/updateReceipt', updateReceiptEndpoint);
receiptRouter.delete('/deleteReceipt', deleteReceiptEndpoint);
receiptRouter.delete('/deleteReceipts', deleteReceiptsEndpoint);

module.exports = receiptRouter;
