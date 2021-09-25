const { Router } = require('express');
const {
  getStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  updateRegistrationDate,
  deleteStudent,
} = require('../database/studentQuery');

const studentRouter = new Router();

const getStudentsEndpoint = async (req, res) => {
  try {
    const students = await getStudents();

    res.status(200).send(students);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const getSingleStudentEndpoint = async (req, res) => {
  try {
    const TaxCode = req.params.TaxCode;
    const student = await getSingleStudent(TaxCode);

    res.status(200).send(student);
  } catch (e) {
    console.log(e);
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
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const updateStudentEndpoint = async (req, res) => {
  try {
    const { message } = await updateStudent(req.body);

    res.status(200).send({ message });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const updateRegistrationDateEndpoint = async (req, res) => {
  try {
    const StudentID = req.body.StudentID;
    const RegistrationDate = req.body.RegistrationDate;

    const response = await updateRegistrationDate(StudentID, RegistrationDate);

    res.status(200).send({ message: response });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const deleteStudentEndpoint = async (req, res) => {
  try {
    const StudentID = req.body.StudentID;
    const response = await deleteStudent(StudentID);

    res.status(200).send({ message: response });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

studentRouter.get('/getStudents', getStudentsEndpoint);
studentRouter.get('/getSingleStudent/:TaxCode', getSingleStudentEndpoint);
studentRouter.put('/createStudent', createStudentEndpoint);
studentRouter.post('/updateStudent', updateStudentEndpoint);
studentRouter.post('/updateRegistrationDate', updateRegistrationDateEndpoint);
studentRouter.delete('/deleteStudent', deleteStudentEndpoint);

module.exports = studentRouter;
