import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import formatDate from '../helpers/format-date-for-input-date';
import commondata from '../commondata/commondata'
import reverseDate from '../helpers/reverse-date-for-input-date';

import TeacherForm from '../components/form_insegnante';

import { createTeacher } from '../helpers/api-calls';

moment.locale('es');

const TeacherSubscription = () => {
  const today = formatDate(new Date(), true);

  const { disciplines, courses, schools } = commondata;

  const teacherInfoDefault = { 
    CodiceFiscale: '',
    Nome: '',
    Cognome: '',
    Citta: '',
    Indirizzo: '',
    Cellulare: '',
    Email: '',
    LuogoNascita: '',
    Disciplina: disciplines[0].discipline,
    Corso: courses[0].course,
    Scuola: schools[0].school,
    DataIscrizione: reverseDate(today),
    DataCertificato: reverseDate(today),
    DataNascita: reverseDate(today),
    DataGreenPass: reverseDate(today),
  }

  const [newTaxCode, setNewTaxCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newMobilePhone, setNewMobilePhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthPlace, setNewBirthPlace] = useState('');
  const [newDiscipline, setNewDiscipline] = useState(disciplines[0].discipline);
  const [newCourse, setNewCourse] = useState(courses[0].course);
  const [newSchool, setNewSchool] = useState(schools[0].school);
  const [newRegistrationDate, setNewRegistrationDate] = useState(today);
  const [newCertificateExpirationDate, setNewCertificateExpirationDate] = useState(today);
  const [newDOB, setNewDOB] = useState(today);
  const [newGreenPassExpirationDate, setNewGreenPassExpirationDate] = useState(today);

  const resetForm = () => {
    setNewTaxCode('');
    setNewName('');
    setNewSurname('');
    setNewCity('');
    setNewAddress('');
    setNewMobilePhone('');
    setNewEmail('');
    setNewBirthPlace('');
    setNewDiscipline(disciplines[0].discipline);
    setNewCourse(courses[0].course);
    setNewSchool(schools[0].school);
    setNewRegistrationDate(today);
    setNewCertificateExpirationDate(today);
    setNewDOB(today);
    setNewGreenPassExpirationDate(today);

    // Reset UI Values
  }

  return (
    <>
      <div style={{ marginTop: '2em', paddingBottom: '2em' }}>
        <div className="form-wrapper" style={{ width: '60vw', marginLeft: '20vw' }}>
          <div className="create-student-teacher-form">
            <TeacherForm
              teacherInfo={teacherInfoDefault}
              setNewTaxCode={setNewTaxCode}
              setNewName={setNewName}
              setNewSurname={setNewSurname}
              setNewCity={setNewCity}
              setNewAddress={setNewAddress}
              setNewMobilePhone={setNewMobilePhone}
              setNewEmail={setNewEmail}
              setNewBirthPlace={setNewBirthPlace}
              setNewDiscipline={setNewDiscipline}
              setNewCourse={setNewCourse}
              setNewSchool={setNewSchool}
              setNewRegistrationDate={setNewRegistrationDate}
              setNewCertificateExpirationDate={setNewCertificateExpirationDate}
              setNewDOB={setNewDOB}
              setNewGreenPassExpirationDate={setNewGreenPassExpirationDate}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em', gap: '2em'}}>
            <Button variant="success" onClick={async () => {
                const newTeacher = { CodiceFiscale: newTaxCode, Nome: newName, Cognome: newSurname, Citta: newCity, Indirizzo: newAddress, Cellulare: newMobilePhone, Email: newEmail, LuogoNascita: newBirthPlace, Disciplina: newDiscipline, Corso: newCourse, Scuola: newSchool, DataIscrizione: newRegistrationDate, DataCertificato: newCertificateExpirationDate, DataNascita: newDOB, DataGreenPass: newGreenPassExpirationDate };
                await createTeacher(newTeacher);
                window.location.reload()
            }}>
              Crea Insegnante
            </Button>
            <Button variant="secondary" id="buttonResetForm" onClick={() => window.location.reload()}>
              Reset Form
            </Button>  
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherSubscription;
