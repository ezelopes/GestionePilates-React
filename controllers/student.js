const { Router } = require('express');
const {
  getStudents,
  getStudent,
  getStudentWithReceipts,
  createStudent,
  updateStudent,
  updateRegistrationDate,
  deleteStudent,
} = require('../database/studentQuery');

const studentRouter = new Router();

const getStudentsEndpoint = async (_, res) => {
  try {
    const students = await getStudents();

    res.status(200).send(students);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getStudentEndpoint = async (req, res) => {
  try {
    const { TaxCode } = req.params;
    const student = await getStudent(TaxCode);

    res.status(200).send(student);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getStudentWithReceiptsEndpoint = async (req, res) => {
  try {
    const { TaxCode } = req.params;
    const { student, receipts } = await getStudentWithReceipts(TaxCode);

    res.status(200).send({ student, receipts });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createStudentEndpoint = async (req, res) => {
  try {
    const { StudentID, message } = await createStudent(req.body);

    if (!StudentID) {
      return res.status(400).send({ message });
    }

    return res.status(200).send({ StudentID, message });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const updateStudentEndpoint = async (req, res) => {
  try {
    const { message } = await updateStudent(req.body);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const updateRegistrationDateEndpoint = async (req, res) => {
  try {
    const { StudentID, RegistrationDate } = req.body;

    const { message } = await updateRegistrationDate(StudentID, RegistrationDate);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const deleteStudentEndpoint = async (req, res) => {
  try {
    const { StudentID } = req.body;
    const { message } = await deleteStudent(StudentID);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

studentRouter.get('/getStudents', getStudentsEndpoint);
studentRouter.get('/getStudent/:TaxCode', getStudentEndpoint);
studentRouter.get('/getStudentWithReceipts/:TaxCode', getStudentWithReceiptsEndpoint);
studentRouter.put('/createStudent', createStudentEndpoint);
studentRouter.post('/updateStudent', updateStudentEndpoint);
studentRouter.post('/updateRegistrationDate', updateRegistrationDateEndpoint);
studentRouter.delete('/deleteStudent', deleteStudentEndpoint);

module.exports = studentRouter;
