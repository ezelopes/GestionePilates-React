const { Router } = require('express');
const { getTeachers, getSingleTeacher, createTeacher, updateTeacher, deleteTeacher} = require('../database/insegnante');

const teacherRouter = new Router();

const getTeachersEndpoint = async (req, res) => {
  try {
    const teachers = await getTeachers();
    res.status(200).send(teachers);
  } catch (e) {
    console.log(e);
  }
}

const getSingleTeacherEndpoint = async (req, res) => {
  try {
    const TaxCode = req.params.TaxCode;
    const teacher = await getSingleTeacher(TaxCode);
    res.status(200).send(teacher);
  } catch (e) {
    console.log(e);
  }
}

const createTeacherEndpoint = async (req, res) => {
  try {
    const response = await createTeacher(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const updateTeacherEndpoint = async (req, res) => {
  try {
    const response = await updateTeacher(req.body);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
  }
}

const deleteTeacherEndpoint = async (req, res) => {
  try {
    const TeacherID = req.body.TeacherID;
    const response = await deleteTeacher(TeacherID);
    const responseObject = { message: response };
    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
  }
}

teacherRouter.get('/getTeachers', getTeachersEndpoint);
teacherRouter.get('/getSingleTeacher/:TaxCode', getSingleTeacherEndpoint);
teacherRouter.put('/createTeacher', createTeacherEndpoint);
teacherRouter.post('/updateTeacher', updateTeacherEndpoint);
teacherRouter.delete('/deleteTeacher', deleteTeacherEndpoint);

module.exports = teacherRouter;
