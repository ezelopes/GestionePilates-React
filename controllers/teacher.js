const { Router } = require('express');
const {
  getTeachers,
  getSingleTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../database/teacherQuery');

const teacherRouter = new Router();

const getTeachersEndpoint = async (req, res) => {
  try {
    const teachers = await getTeachers();

    res.status(200).send(teachers);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const getSingleTeacherEndpoint = async (req, res) => {
  try {
    const TaxCode = req.params.TaxCode;
    const teacher = await getSingleTeacher(TaxCode);

    res.status(200).send(teacher);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const createTeacherEndpoint = async (req, res) => {
  try {
    const { message } = await createTeacher(req.body);

    res.status(200).send({ message });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const updateTeacherEndpoint = async (req, res) => {
  try {
    const { message } = await updateTeacher(req.body);

    res.status(200).send({ message });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

const deleteTeacherEndpoint = async (req, res) => {
  try {
    const TeacherID = req.body.TeacherID;
    const response = await deleteTeacher(TeacherID);
    const responseObject = { message: response };

    res.status(200).send(responseObject);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

teacherRouter.get('/getTeachers', getTeachersEndpoint);
teacherRouter.get('/getSingleTeacher/:TaxCode', getSingleTeacherEndpoint);
teacherRouter.put('/createTeacher', createTeacherEndpoint);
teacherRouter.post('/updateTeacher', updateTeacherEndpoint);
teacherRouter.delete('/deleteTeacher', deleteTeacherEndpoint);

module.exports = teacherRouter;
