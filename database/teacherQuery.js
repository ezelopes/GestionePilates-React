const { knex } = require('./connection');
const { getFormattedDate } = require('./helpers/index');

const TEACHER_TABLE = 'insegnante';

const mappingTeachers = (rows) =>
  rows.map((row) => ({
    TeacherID: row.InsegnanteID,
    TaxCode: row.CodiceFiscale,
    Name: row.Nome,
    Surname: row.Cognome,
    City: row.Citta,
    Address: row.Indirizzo,
    MobilePhone: row.Cellulare,
    Email: row.Email,
    RegistrationDate: getFormattedDate(row.DataIscrizione),
    CertificateExpirationDate: getFormattedDate(row.DataCertificato),
    DOB: getFormattedDate(row.DataNascita),
    GreenPassExpirationDate: getFormattedDate(row.DataGreenPass),
    BirthPlace: row.LuogoNascita,
    Discipline: row.Disciplina,
    Course: row.Corso,
    School: row.Scuola,
  }));

const getTeachers = async () => {
  const teachers = await knex(TEACHER_TABLE).select();

  return mappingTeachers(teachers);
};

const getTeacher = async (TaxCode) => {
  const teacher = await knex(TEACHER_TABLE).select().where({ CodiceFiscale: TaxCode });

  return mappingTeachers(teacher)[0];
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

    return { TeacherID: newTeacherID[0], message: 'Insegnante Inserita Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: 'Errore nel creare Insegnante!' };
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

    return { message: 'Insegnante Aggiornata Correttamente!' };
  } catch (error) {
    console.log(error);
    return { message: `Errore nell'aggiornare Insegnante!` };
  }
};

const deleteTeacher = async (TeacherID) => {
  try {
    await knex(TEACHER_TABLE).where({ InsegnanteID: TeacherID }).del();

    return { message: 'Insegnante Eliminata Correttamente!' };
  } catch (error) {
    console.log(error);
    return `Errore nell'eliminare Insegnante!`;
  }
};

module.exports = {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
