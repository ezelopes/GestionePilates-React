import React from 'react';
import { Form } from 'react-bootstrap'

import reverseDate from '../helpers/reverseDateForInputDate';
import commondata from '../commondata/commondata'
import Divider from './Divider';

const StudentForm = ({ 
  studentInfo,
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
      <Form.Label> Età </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewIsAdult(target.value)} defaultValue={studentInfo.Maggiorenne}>
        {commondata.ages.map(age =>  <option key={`select_${age.id}`} value={age.age}> {age.age} </option>)}
      </Form.Control>

      <Form.Label> Codice Fiscale </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Codice Fiscale..." onChange={({ target }) => setNewTaxCode(target.value)} defaultValue={studentInfo.CodiceFiscale} />

      <Form.Label> Nome Allieva </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Nome..." onChange={({ target }) => setNewName(target.value)} defaultValue={studentInfo.Nome} />

      <Form.Label> Cognome Allieva </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cognome..." onChange={({ target }) => setNewSurname(target.value)} defaultValue={studentInfo.Cognome} />
      
      <Divider />
      
      <Form.Label> Citta </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Citta..." onChange={({ target }) => setNewCity(target.value)} defaultValue={studentInfo.Citta} />

      <Form.Label> Indirizzo </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Indirizzo..." onChange={({ target }) => setNewAddress(target.value)} defaultValue={studentInfo.Indirizzo} />

      <Form.Label> Cellulare </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cellulare..." onChange={({ target }) => setNewMobilePhone(target.value)} defaultValue={studentInfo.Cellulare} />

      <Form.Label> Email </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Email..." onChange={({ target }) => setNewEmail(target.value)} defaultValue={studentInfo.Email} />

      <Form.Label> Luogo Nascita </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Luogo Nascita..." onChange={({ target }) => setNewBirthPlace(target.value)} defaultValue={studentInfo.LuogoNascita} />

      <Form.Label> Data Nascita </Form.Label>
      <input type="date" onChange={({ target }) => setNewDOB(target.value)} defaultValue={ reverseDate(studentInfo.DataNascita) } />

      <Divider />

      <Form.Label> Disciplina </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewDiscipline(target.value)} defaultValue={studentInfo.Disciplina}>
        {commondata.disciplines.map(discipline =>  <option key={`select_${discipline.id}`} value={discipline.discipline}> {discipline.discipline} </option>)}
      </Form.Control>

      <Form.Label> Corso </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewCourse(target.value)} defaultValue={studentInfo.Corso}>
        {commondata.courses.map(course =>  <option key={`select_${course.id}`} value={course.course}> {course.course} </option>)}
      </Form.Control>

      <Form.Label> Scuola </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewSchool(target.value)} defaultValue={studentInfo.Scuola}>
        {commondata.schools.map(school =>  <option key={`select_${school.id}`} value={school.school}> {school.school} </option>)}
      </Form.Control>

      <Form.Label> Data Iscrizione </Form.Label>
      <input type="date" onChange={({ target }) => setNewRegistrationDate(target.value)} defaultValue={ reverseDate(studentInfo.DataIscrizione) } />

      <Divider />

      <Form.Label> Data Certificato </Form.Label>
      <input type="date" onChange={({ target }) => setNewCertificateExpirationDate(target.value)} defaultValue={ reverseDate(studentInfo.DataCertificato) } />
      
      <Form.Label> Data Scadenza Green Pass </Form.Label>
      <input type="date" onChange={({ target }) => setNewGreenPassExpirationDate(target.value)} defaultValue={ reverseDate(studentInfo.DataGreenPass) } />

      {newIsAdult === 'Minorenne' 
        ? (
            <>
              <Divider />

              <Form.Label> Codice Fiscale Genitore </Form.Label>
              <Form.Control type="text" placeholder="Inserisci Codice Fiscale Genitore..." onChange={({ target }) => setNewParentTaxCode(target.value)} defaultValue={studentInfo.CodiceFiscaleGenitore} />
        
              <Form.Label> Nome Genitore </Form.Label>
              <Form.Control type="text" placeholder="Inserisci Nome Genitore..." onChange={({ target }) => setNewParentName(target.value)} defaultValue={studentInfo.NomeGenitore} />
        
              <Form.Label> Cognome Genitore </Form.Label>
              <Form.Control type="text" placeholder="Inserisci Cognome Genitore..." onChange={({ target }) => setNewParentSurname(target.value)} defaultValue={studentInfo.CognomeGenitore} /> 
            </>
          )
        : <> </>
      }
    </>
  );
}

export default StudentForm;