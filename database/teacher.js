const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/dates');
const { mappingTeachers } = require('./helpers/mapDatabaseEntries');
const { teacherResponseMessages } = require('./helpers/responses');

const TEACHER_TABLE = 'teacher';

// Get teacher by taxcode -> With courses (maybe it just needs a flag?)
// Get teacher by id -> With courses (maybe it just needs a flag?)
// Create teacher -> With courses
// Update teacher basic info
// Update teacher courses -> helper functions: 1. assignCourseToTeacher 2. removeTeacherFromCourse
// Delete teacher

const teacherToDatabase = (teacher) => ({
  id: teacher.id,
  tax_code: teacher.taxCode,
  name: teacher.name,
  surname: teacher.surname,
  city: teacher.city,
  address: teacher.address,
  phone: teacher.phone,
  email: teacher.email,
  place_of_birth: teacher.placeOfBirth,
  subscription_date: getFormattedDate(teacher.subscriptionDate),
  certificate_expiry_date: getFormattedDate(teacher.certificateExpiryDate),
  dob: getFormattedDate(teacher.DOB),
});

const getTeachers = async () => {
  try {
    const teachers = await knex(TEACHER_TABLE).select();

    return mappingTeachers(teachers);
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.getMultiple };
  }
};

/**
 *
 * @param {string} taxCode
 * @param {boolean} withCourses
 * @returns
 */
const getTeacher = async (taxCode, withCourses) => {
  try {
    const teacher = await knex(TEACHER_TABLE).select().where({ tax_code: taxCode });

    return mappingTeachers(teacher)[0];
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.getSingle };
  }
};

const createTeacher = async (teacherInfo, courseIds) => {
  try {
    const newTeacherID = await knex(TEACHER_TABLE).insert(teacherToDatabase(teacherInfo));

    // Insert optional courses

    return { TeacherID: newTeacherID[0], message: teacherResponseMessages.ok.create };
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.create };
  }
};

// TODO: id should be separate from the object
const updateTeacher = async (teacherInfo, courseIds) => {
  try {
    await knex(TEACHER_TABLE).where({ id: teacherInfo.id }).update(teacherToDatabase(teacherInfo));

    // Update optional courses

    return { message: teacherResponseMessages.ok.update };
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.update };
  }
};

const deleteTeacher = async (id) => {
  try {
    await knex(TEACHER_TABLE).where({ id }).del();

    // TODO: Delete teacher_course table?

    return { message: teacherResponseMessages.ok.delete };
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.delete };
  }
};

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
