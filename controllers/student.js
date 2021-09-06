const { Router } = require('express');
const { getStudents, getSingleStudent, createStudent, updateStudent, updateRegistrationDate, deleteStudent } = require('../database/studentQuery');

const studentRouter = new Router();

const getStudentsEndpoint = async (req, res) => {
  try {
    const students = await getStudents();
    res.status(200).send(students);
  } catch (e) {
    console.log(e);
 }
}

const getSingleStudentEndpoint = async (req, res) => {
  try {
    const TaxCode = req.params.TaxCode;
    const student = await getSingleStudent(TaxCode);

    res.status(200).send(student);
  } catch (e) {
    console.log(e);
 }
}

const createStudentEndpoint = async (req, res) => {
  try {
    const StudentID = await createStudent(req.body);

    const responseObject = { StudentID };
    res.status(200).send(responseObject);
  } catch (e) {
 }
}

const updateStudentEndpoint = async (req, res) => {
  try {
    const response = await updateStudent(req.body);

    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
 }
}

const updateRegistrationDateEndpoint = async (req, res) => {
  try {
    const StudentID = req.body.StudentID;
    const RegistrationDate = req.body.RegistrationDate;

    const response = await updateRegistrationDate(StudentID, RegistrationDate);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
 }
}

const deleteStudentEndpoint = async (req, res) => {
  try {
    const StudentID = req.body.StudentID;
    const response = await deleteStudent(StudentID);

    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
 }
}

studentRouter.get('/getStudents', getStudentsEndpoint);
studentRouter.get('/getSingleStudent/:TaxCode', getSingleStudentEndpoint);
studentRouter.put('/createStudent', createStudentEndpoint);
studentRouter.post('/updateStudent', updateStudentEndpoint);
studentRouter.post('/updateRegistrationDate', updateRegistrationDateEndpoint);
studentRouter.delete('/deleteStudent', deleteStudentEndpoint);

module.exports = studentRouter;
