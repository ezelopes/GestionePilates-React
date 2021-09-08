import React from 'react';
import { Form } from 'react-bootstrap'

import { ages, disciplines, schools, courses } from '../commondata/commondata'
import Divider from './Divider';

// personInfo should be contained within a custom useState and useContext!

// personType either Student or Teacher

const CreateUpdateUserForm = ({ 
  personInfo,
  personType,
  newIsAdult,
  setNewIsAdult,
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
  setNewParentTaxCode,
  setNewParentName,
  setNewParentSurname
}) => {

  return (
    <>
      {personType === 'Student' && (
        <> 
          <Form.Label> Età </Form.Label>
          <Form.Control as='select' onChange={({ target }) => setNewIsAdult(target.value)} defaultValue={personInfo?.IsAdult}>
            {ages.map(age =>  <option key={`select_${age.id}`} value={age.age}> {age.age} </option>)}
          </Form.Control>
        </>
      )}

      <Form.Label> Codice Fiscale </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Codice Fiscale...' onChange={({ target }) => setNewTaxCode(target.value)} defaultValue={personInfo?.TaxCode} />

      <Form.Label> Nome {personType} </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Nome...' onChange={({ target }) => setNewName(target.value)} defaultValue={personInfo?.Name} />

      <Form.Label> Cognome {personType} </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Cognome...' onChange={({ target }) => setNewSurname(target.value)} defaultValue={personInfo?.Surname} />
      
      {personType === 'Teacher' && <Divider half={true} /> }
      <Divider />
      
      <Form.Label> Citta </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Citta...' onChange={({ target }) => setNewCity(target.value)} defaultValue={personInfo?.City} />

      <Form.Label> Indirizzo </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Indirizzo...' onChange={({ target }) => setNewAddress(target.value)} defaultValue={personInfo?.Address} />

      <Form.Label> Cellulare </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Cellulare...' onChange={({ target }) => setNewMobilePhone(target.value)} defaultValue={personInfo?.MobilePhone} />

      <Form.Label> Email </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Email...' onChange={({ target }) => setNewEmail(target.value)} defaultValue={personInfo?.Email} />

      <Form.Label> Luogo Nascita </Form.Label>
      <Form.Control type='text' placeholder='Inserisci Luogo Nascita...' onChange={({ target }) => setNewBirthPlace(target.value)} defaultValue={personInfo?.BirthPlace} />

      <Form.Label> Data Nascita </Form.Label>
      <input type='date' onChange={({ target }) => setNewDOB(target.value)} defaultValue={ personInfo?.DOB } />

      <Divider />

      <Form.Label> Disciplina </Form.Label>
      <Form.Control as='select' onChange={({ target }) => setNewDiscipline(target.value)} defaultValue={personInfo?.Discipline}>
        {disciplines.map(discipline =>  <option key={`select_${discipline.id}`} value={discipline.discipline}> {discipline.discipline} </option>)}
      </Form.Control>

      <Form.Label> Corso </Form.Label>
      <Form.Control as='select' onChange={({ target }) => setNewCourse(target.value)} defaultValue={personInfo?.Course}>
        {courses.map(course =>  <option key={`select_${course.id}`} value={course.course}> {course.course} </option>)}
      </Form.Control>

      <Form.Label> Scuola </Form.Label>
      <Form.Control as='select' onChange={({ target }) => setNewSchool(target.value)} defaultValue={personInfo?.School}>
        {schools.map(school =>  <option key={`select_${school.id}`} value={school.school}> {school.school} </option>)}
      </Form.Control>

      <Form.Label> Data Iscrizione </Form.Label>
      <input type='date' onChange={({ target }) => setNewRegistrationDate(target.value)} defaultValue={ personInfo?.RegistrationDate } />

      <Divider />

      <Form.Label> Data Scadenza Certificato </Form.Label>
      <input type='date' onChange={({ target }) => setNewCertificateExpirationDate(target.value)} defaultValue={ personInfo?.CertificateExpirationDate } />
      
      <Form.Label> Data Scadenza Green Pass </Form.Label>
      <input type='date' onChange={({ target }) => setNewGreenPassExpirationDate(target.value)} defaultValue={ personInfo?.GreenPassExpirationDate } />

      {personType === 'Student' && newIsAdult === 'Minorenne' && 
          <>
            <Divider />

            <Form.Label> Codice Fiscale Genitore </Form.Label>
            <Form.Control type='text' placeholder='Inserisci Codice Fiscale Genitore...' onChange={({ target }) => setNewParentTaxCode(target.value)} defaultValue={personInfo?.ParentTaxCode} />
      
            <Form.Label> Nome Genitore </Form.Label>
            <Form.Control type='text' placeholder='Inserisci Nome Genitore...' onChange={({ target }) => setNewParentName(target.value)} defaultValue={personInfo?.ParentName} />
      
            <Form.Label> Cognome Genitore </Form.Label>
            <Form.Control type='text' placeholder='Inserisci Cognome Genitore...' onChange={({ target }) => setNewParentSurname(target.value)} defaultValue={personInfo?.ParentSurname} /> 
          </>
      }
    </>
  );
}

export default CreateUpdateUserForm;