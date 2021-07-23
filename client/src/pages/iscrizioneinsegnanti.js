import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import formatDate from '../helpers/format-date-for-input-date';
import commondata from '../commondata/commondata'
import reverseDate from '../helpers/reverse-date-for-input-date';

import FormInsegnante from '../components/form_insegnante';

import { createTeacher } from '../helpers/api-calls';

moment.locale('es');

const IscrizioneInsegnanti = () => {
  const today = formatDate(new Date(), true);

  const { discipline, corsi, scuole } = commondata;

  const insegnanteInfoDefault = { 
    CodiceFiscale: '',
    Nome: '',
    Cognome: '',
    Citta: '',
    Indirizzo: '',
    Cellulare: '',
    Email: '',
    LuogoNascita: '',
    Disciplina: discipline[0].disciplina,
    Corso: corsi[0].corso,
    Scuola: scuole[0].scuola,
    DataIscrizione: reverseDate(today),
    DataCertificato: reverseDate(today),
    DataNascita: reverseDate(today),
  }

  const [newCodiceFiscale, setNewCodiceFiscale] = useState('');
  const [newNome, setNewNome] = useState('');
  const [newCognome, setNewCognome] = useState('');
  const [newCitta, setNewCitta] = useState('');
  const [newIndirizzo, setNewIndirizzo] = useState('');
  const [newCellulare, setNewCellulare] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLuogoNascita, setNewLuogoNascita] = useState('');
  const [newDisciplina, setNewDisciplina] = useState(discipline[0].disciplina);
  const [newCorso, setNewCorso] = useState(corsi[0].corso);
  const [newScuola, setNewScuola] = useState(scuole[0].scuola);
  const [newDataIscrizione, setNewDataIscrizione] = useState(today);
  const [newDataCertificato, setNewDataCertificato] = useState(today);
  const [newDataNascita, setNewDataNascita] = useState(today);

  const resetForm = () => {
    setNewCodiceFiscale('');
    setNewNome('');
    setNewCognome('');
    setNewCitta('');
    setNewIndirizzo('');
    setNewCellulare('');
    setNewEmail('');
    setNewLuogoNascita('');
    setNewDisciplina(discipline[0].disciplina);
    setNewCorso(corsi[0].corso);
    setNewScuola(scuole[0].scuola);
    setNewDataIscrizione(today);
    setNewDataCertificato(today);
    setNewDataNascita(today);

    // Reset UI Values
  }

  return (
    <>
      <div style={{ marginTop: '2em', paddingBottom: '2em' }}>
        <div className="create-student-form">
          <FormInsegnante
            insegnanteInfo={ insegnanteInfoDefault }
            setNewCodiceFiscale={setNewCodiceFiscale}
            setNewNome={setNewNome}
            setNewCognome={setNewCognome}
            setNewCitta={setNewCitta}
            setNewIndirizzo={setNewIndirizzo}
            setNewCellulare={setNewCellulare}
            setNewEmail={setNewEmail}
            setNewLuogoNascita={setNewLuogoNascita}
            setNewDisciplina={setNewDisciplina}
            setNewCorso={setNewCorso}
            setNewScuola={setNewScuola}
            setNewDataIscrizione={setNewDataIscrizione}
            setNewDataCertificato={setNewDataCertificato}
            setNewDataNascita={setNewDataNascita}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em', gap: '2em'}}>
          <Button variant="success" id="buttonCreaInsegnante" onClick={() => {
              const newTeacher = { CodiceFiscale: newCodiceFiscale, Nome: newNome, Cognome: newCognome, Citta: newCitta, Indirizzo: newIndirizzo, Cellulare: newCellulare, Email: newEmail, LuogoNascita: newLuogoNascita, Disciplina: newDisciplina, Corso: newCorso, Scuola: newScuola, DataIscrizione: newDataIscrizione, DataCertificato: newDataCertificato, DataNascita: newDataNascita };
              createTeacher(newTeacher);
              resetForm();
          }}>
            Crea Insegnante
          </Button>
          <Button variant="secondary" id="buttonResetForm" onClick={resetForm}>
            Reset Form
          </Button>  
        </div>
      </div>
    </>
  );
}

export default IscrizioneInsegnanti;
