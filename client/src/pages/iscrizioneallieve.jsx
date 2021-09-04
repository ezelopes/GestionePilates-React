import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { createStudent } from '../helpers/api-calls';

import StudentForm from '../components/form_allieva';

import formatDate from '../helpers/format-date-for-input-date';
import reverseDate from '../helpers/reverse-date-for-input-date';
import commondata from '../commondata/commondata'


const StudentSubscription = () => {
  const today = formatDate(new Date(), true);

  const { ages, disciplines, courses, schools } = commondata;

  const studentInfoDefault = { 
    Maggiorenne: ages[0].age,
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
    CodiceFiscaleGenitore: '',
    NomeGenitore: '',
    CognomeGenitore: ''
  }

  const [newMaggiorenne, setNewMaggiorenne] = useState(ages[0].age);
  const [newCodiceFiscale, setNewCodiceFiscale] = useState('');
  const [newNome, setNewNome] = useState('');
  const [newCognome, setNewCognome] = useState('');
  const [newCitta, setNewCitta] = useState('');
  const [newIndirizzo, setNewIndirizzo] = useState('');
  const [newCellulare, setNewCellulare] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLuogoNascita, setNewLuogoNascita] = useState('');
  const [newDisciplina, setNewDisciplina] = useState(disciplines[0].discipline);
  const [newCorso, setNewCorso] = useState(courses[0].course);
  const [newScuola, setNewScuola] = useState(schools[0].school);
  const [newDataIscrizione, setNewDataIscrizione] = useState(today);
  const [newDataCertificato, setNewDataCertificato] = useState(today);
  const [newDataNascita, setNewDataNascita] = useState(today);
  const [newDataGreenPass, setNewDataGreenPass] = useState(today);
  const [newCodiceFiscaleGenitore, setNewCodiceFiscaleGenitore] = useState('');
  const [newNomeGenitore, setNewNomeGenitore] = useState('');
  const [newCognomeGenitore, setNewCognomeGenitore] = useState('');

  const resetForm = () => {
    setNewMaggiorenne(ages[0].age);
    setNewCodiceFiscale('');
    setNewNome('');
    setNewCognome('');
    setNewCitta('');
    setNewIndirizzo('');
    setNewCellulare('');
    setNewEmail('');
    setNewLuogoNascita('');
    setNewDisciplina(disciplines[0].discipline);
    setNewCorso(courses[0].course);
    setNewScuola(schools[0].school);
    setNewDataIscrizione(today);
    setNewDataCertificato(today);
    setNewDataNascita(today);
    setNewCodiceFiscaleGenitore('');
    setNewNomeGenitore('');
    setNewCognomeGenitore('');

    // Reset UI Values
  }

  return (
    <div style={{ marginTop: '2em', paddingBottom: '2em' }}>
      <div className="form-wrapper" style={{ width: '60vw', marginLeft: '20vw' }}>
        <div className="create-student-teacher-form">
          <StudentForm 
            studentInfo={ studentInfoDefault }
            newIsAdult={newMaggiorenne}
            setNewIsAdult={setNewMaggiorenne}
            setNewTaxCode={setNewCodiceFiscale}
            setNewName={setNewNome}
            setNewSurname={setNewCognome}
            setNewCity={setNewCitta}
            setNewAddress={setNewIndirizzo}
            setNewMobilePhone={setNewCellulare}
            setNewEmail={setNewEmail}
            setNewBirthPlace={setNewLuogoNascita}
            setNewDiscipline={setNewDisciplina}
            setNewCourse={setNewCorso}
            setNewSchool={setNewScuola}
            setNewRegistrationDate={setNewDataIscrizione}
            setNewCertificateExpirationDate={setNewDataCertificato}
            setNewDOB={setNewDataNascita}
            setNewGreenPassExpirationDate={setNewDataGreenPass}
            setNewParentTaxCode={setNewCodiceFiscaleGenitore}
            setNewParentName={setNewNomeGenitore}
            setNewParentSurname={setNewCognomeGenitore}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em', gap: '2em'}}>
          <Button variant="success" onClick={() => {
            const newStudent = { Maggiorenne: newMaggiorenne, CodiceFiscale: newCodiceFiscale, Nome: newNome, Cognome: newCognome, Citta: newCitta, Indirizzo: newIndirizzo, Cellulare: newCellulare, Email: newEmail, LuogoNascita: newLuogoNascita, Disciplina: newDisciplina, Corso: newCorso, Scuola: newScuola, DataIscrizione: newDataIscrizione, DataCertificato: newDataCertificato, DataNascita: newDataNascita, DataGreenPass: newDataGreenPass, CodiceFiscaleGenitore: newCodiceFiscaleGenitore, NomeGenitore: newNomeGenitore, CognomeGenitore: newCognomeGenitore };
            createStudent(newStudent);
            // resetForm();
          }}>
            Crea Allieva
          </Button>
          <Button variant="secondary" id="buttonResetForm" onClick={resetForm}>
            Reset Form
          </Button>
        </div>

      </div>
    </div>
  );
}

export default StudentSubscription;
