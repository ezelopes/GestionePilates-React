const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/dates');
const { mappingTeachers } = require('./helpers/mapDatabaseEntries');
const { teacherResponseMessages } = require('./helpers/responses');

const TEACHER_TABLE = 'insegnante';

const getTeachers = async () => {
  try {
    const teachers = await knex(TEACHER_TABLE).select();

    return mappingTeachers(teachers);
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.getMultiple };
  }
};

const getTeacher = async (TaxCode) => {
  try {
    const teacher = await knex(TEACHER_TABLE).select().where({ CodiceFiscale: TaxCode });

    return mappingTeachers(teacher)[0];
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.getSingle };
  }
};

const createTeacher = async (teacherInfo) => {
  try {
    const newTeacherID = await knex(TEACHER_TABLE).insert({
      CodiceFiscale: teacherInfo.TaxCode,
      Nome: teacherInfo.Name,
      Cognome: teacherInfo.Surname,
      Citta: teacherInfo.City,
      Indirizzo: teacherInfo.Address,
      Cellulare: teacherInfo.MobilePhone,
      Email: teacherInfo.Email,
      DataIscrizione: getFormattedDate(teacherInfo.RegistrationDate),
      DataCertificato: getFormattedDate(teacherInfo.CertificateExpirationDate),
      DataNascita: getFormattedDate(teacherInfo.DOB),
      DataGreenPass: getFormattedDate(teacherInfo.GreenPassExpirationDate),
      LuogoNascita: teacherInfo.BirthPlace,
      Disciplina: teacherInfo.Discipline,
      Corso: teacherInfo.Course,
      Scuola: teacherInfo.School,
    });

    return { TeacherID: newTeacherID[0], message: teacherResponseMessages.ok.create };
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.create };
  }
};

const updateTeacher = async (teacherInfo) => {
  try {
    await knex(TEACHER_TABLE)
      .where({ InsegnanteID: teacherInfo.TeacherID })
      .update({
        CodiceFiscale: teacherInfo.TaxCode,
        Nome: teacherInfo.Name,
        Cognome: teacherInfo.Surname,
        Citta: teacherInfo.City,
        Indirizzo: teacherInfo.Address,
        Cellulare: teacherInfo.MobilePhone,
        Email: teacherInfo.Email,
        DataIscrizione: getFormattedDate(teacherInfo.RegistrationDate),
        DataCertificato: getFormattedDate(teacherInfo.CertificateExpirationDate),
        DataNascita: getFormattedDate(teacherInfo.DOB),
        DataGreenPass: getFormattedDate(teacherInfo.GreenPassExpirationDate),
        LuogoNascita: teacherInfo.BirthPlace,
        Disciplina: teacherInfo.Discipline,
        Corso: teacherInfo.Course,
        Scuola: teacherInfo.School,
      });

    return { message: teacherResponseMessages.ok.update };
  } catch (error) {
    console.log(error);

    return { message: teacherResponseMessages.error.update };
  }
};

const deleteTeacher = async (TeacherID) => {
  try {
    await knex(TEACHER_TABLE).where({ InsegnanteID: TeacherID }).del();

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
