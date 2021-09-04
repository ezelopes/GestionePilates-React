import React from 'react';
import { Form } from 'react-bootstrap'

import reverseDate from '../helpers/reverseDateForInputDate';
import commondata from '../commondata/commondata'
import Divider from './Divider';

const TeacherForm = ({ 
  teacherInfo,
  setNewTaxCode,
  setNewName,
  setNewSurname,
  setNewCity,
  setNewAddress,
  setNewMobilePhone,
  setNewEmail,
  setNewBirthPlace,
  setNewDiscipline,
  setNewCourse,
  setNewSchool,
  setNewRegistrationDate,
  setNewCertificateExpirationDate,
  setNewDOB,
  setNewGreenPassExpirationDate,
}) => {

  return (
    <>
      <Form.Label> Codice Fiscale </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Codice Fiscale..." onChange={({ target }) => setNewTaxCode(target.value)} defaultValue={teacherInfo.TaxCode} />

      <Form.Label> Nome Insegnante </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Nome..." onChange={({ target }) => setNewName(target.value)} defaultValue={teacherInfo.Name} />

      <Form.Label> Cognome Insegnante </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cognome..." onChange={({ target }) => setNewSurname(target.value)} defaultValue={teacherInfo.Surname} />

      <Divider half={true} />
      <Divider />

      <Form.Label> Citta </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Citta..." onChange={({ target }) => setNewCity(target.value)} defaultValue={teacherInfo.City} />

      <Form.Label> Indirizzo </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Indirizzo..." onChange={({ target }) => setNewAddress(target.value)} defaultValue={teacherInfo.Address} />

      <Form.Label> Cellulare </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cellulare..." onChange={({ target }) => setNewMobilePhone(target.value)} defaultValue={teacherInfo.MobilePhone} />

      <Form.Label> Email </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Email..." onChange={({ target }) => setNewEmail(target.value)} defaultValue={teacherInfo.Email} />

      <Form.Label> Luogo Nascita </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Luogo Nascita..." onChange={({ target }) => setNewBirthPlace(target.value)} defaultValue={teacherInfo.BirthPlace} />

      <Form.Label> Data Nascita </Form.Label>
      <input type="date" onChange={({ target }) => setNewDOB(target.value)} defaultValue={ reverseDate(teacherInfo.DOB) } />

      <Divider />

      <Form.Label> Disciplina </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewDiscipline(target.value)} defaultValue={teacherInfo.Discipline}>
        {commondata.disciplines.map(discipline =>  <option key={`select_${discipline.id}`} value={discipline.discipline}> {discipline.discipline} </option>)}
      </Form.Control>

      <Form.Label> Corso </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewCourse(target.value)} defaultValue={teacherInfo.Course}>
        {commondata.courses.map(course =>  <option key={`select_${course.id}`} value={course.course}> {course.course} </option>)}
      </Form.Control>

      <Form.Label> Scuola </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewSchool(target.value)} defaultValue={teacherInfo.School}>
        {commondata.schools.map(school =>  <option key={`select_${school.id}`} value={school.school}> {school.school} </option>)}
      </Form.Control>

      <Form.Label> Data Iscrizione </Form.Label>
      <input type="date" onChange={({ target }) => setNewRegistrationDate(target.value)} defaultValue={ reverseDate(teacherInfo.RegistrationDate) } />

      <Divider />

      <Form.Label> Data Certificato </Form.Label>
      <input type="date" onChange={({ target }) => setNewCertificateExpirationDate(target.value)} defaultValue={ reverseDate(teacherInfo.CertificateExpirationDate) } />
      
      <Form.Label> Data Scadenza Green Pass </Form.Label>
      <input type="date" onChange={({ target }) => setNewGreenPassExpirationDate(target.value)} defaultValue={ reverseDate(teacherInfo.GreenPassExpirationDate) } />

    </>
  );
}

export default TeacherForm;