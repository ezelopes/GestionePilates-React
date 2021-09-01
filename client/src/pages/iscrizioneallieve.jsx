import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { createStudent } from '../helpers/api-calls';

import FormAllieva from '../components/form_allieva';

import formatDate from '../helpers/format-date-for-input-date';
import reverseDate from '../helpers/reverse-date-for-input-date';
import commondata from '../commondata/commondata'


const IscrizioneAllieve = () => {
  const today = formatDate(new Date(), true);

  const { eta, discipline, corsi, scuole } = commondata;

  const allievaInfoDefault = { 
    Maggiorenne: eta[0].eta,
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
    DataGreenPass: reverseDate(today),
    CodiceFiscaleGenitore: '',
    NomeGenitore: '',
    CognomeGenitore: ''
  }

  const [newMaggiorenne, setNewMaggiorenne] = useState(eta[0].eta);
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
  const [newDataGreenPass, setNewDataGreenPass] = useState(today);
  const [newCodiceFiscaleGenitore, setNewCodiceFiscaleGenitore] = useState('');
  const [newNomeGenitore, setNewNomeGenitore] = useState('');
  const [newCognomeGenitore, setNewCognomeGenitore] = useState('');

  const resetForm = () => {
    setNewMaggiorenne(eta[0].eta);
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
    setNewCodiceFiscaleGenitore('');
    setNewNomeGenitore('');
    setNewCognomeGenitore('');

    // Reset UI Values
  }

  return (
    <div style={{ marginTop: '2em', paddingBottom: '2em' }}>
      <div className="formWrapper" style={{ width: '60vw', marginLeft: '20vw' }}>
        <div className="create-student-teacher-form">
          <FormAllieva 
            allievaInfo={ allievaInfoDefault }
            newMaggiorenne={newMaggiorenne}
            setNewMaggiorenne={setNewMaggiorenne}
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
            setNewDataGreenPass={setNewDataGreenPass}
            setNewCodiceFiscaleGenitore={setNewCodiceFiscaleGenitore}
            setNewNomeGenitore={setNewNomeGenitore}
            setNewCognomeGenitore={setNewCognomeGenitore}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em', gap: '2em'}}>
          <Button variant="success" id="buttonCreaAllieva" onClick={() => {
            const newAllieva = { Maggiorenne: newMaggiorenne, CodiceFiscale: newCodiceFiscale, Nome: newNome, Cognome: newCognome, Citta: newCitta, Indirizzo: newIndirizzo, Cellulare: newCellulare, Email: newEmail, LuogoNascita: newLuogoNascita, Disciplina: newDisciplina, Corso: newCorso, Scuola: newScuola, DataIscrizione: newDataIscrizione, DataCertificato: newDataCertificato, DataNascita: newDataNascita, DataGreenPass: newDataGreenPass, CodiceFiscaleGenitore: newCodiceFiscaleGenitore, NomeGenitore: newNomeGenitore, CognomeGenitore: newCognomeGenitore };
            createStudent(newAllieva);
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

export default IscrizioneAllieve;
