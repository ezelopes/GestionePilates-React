const { Router } = require('express');
const {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeachersWithRegistrationDate,
} = require('../database/teacherQuery');

const teacherRouter = new Router();

const getTeachersEndpoint = async (_, res) => {
  try {
    const teachers = await getTeachers();

    res.status(200).send(teachers);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getTeacherEndpoint = async (req, res) => {
  try {
    const { TaxCode } = req.params;
    const teacher = await getTeacher(TaxCode);

    res.status(200).send(teacher);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getTeachersWithRegistrationDateEndpoint = async (req, res) => {
  try {
    const { Year } = req.params;
    const teachers = await getTeachersWithRegistrationDate(Year);

    res.status(200).send(teachers);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createTeacherEndpoint = async (req, res) => {
  try {
    const { TeacherID, message } = await createTeacher(req.body);

    res.status(200).send({ TeacherID, message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const updateTeacherEndpoint = async (req, res) => {
  try {
    const { message } = await updateTeacher(req.body);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const deleteTeacherEndpoint = async (req, res) => {
  try {
    const { TeacherID } = req.body;
    const { message } = await deleteTeacher(TeacherID);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

teacherRouter.get('/getTeachers', getTeachersEndpoint);
teacherRouter.get('/getTeacher/:TaxCode', getTeacherEndpoint);
teacherRouter.get('/getTeachersWithRegistrationDate/:Year', getTeachersWithRegistrationDateEndpoint);
teacherRouter.put('/createTeacher', createTeacherEndpoint);
teacherRouter.post('/updateTeacher', updateTeacherEndpoint);
teacherRouter.delete('/deleteTeacher', deleteTeacherEndpoint);

module.exports = teacherRouter;
