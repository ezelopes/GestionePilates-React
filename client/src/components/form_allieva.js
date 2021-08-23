import React from 'react';
import { Form } from 'react-bootstrap'

import reverseDate from '../helpers/reverse-date-for-input-date';
import commondata from '../commondata/commondata'

const FormAllieva = ({ 
  allievaInfo, 
  setNewMaggiorenne,
  setNewCodiceFiscale,
  setNewNome,
  setNewCognome,
  setNewCitta,
  setNewIndirizzo,
  setNewCellulare,
  setNewEmail,
  setNewLuogoNascita,
  setNewDisciplina,
  setNewCorso,
  setNewScuola,
  setNewDataIscrizione,
  setNewDataCertificato,
  setNewDataNascita,
  setNewDataGreenPass,
  setNewCodiceFiscaleGenitore,
  setNewNomeGenitore,
  setNewCognomeGenitore
}) => {

  return (
    <>
      <Form.Label> Età </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewMaggiorenne(target.value)} defaultValue={allievaInfo.Maggiorenne}>
        {commondata.eta.map(currentEta =>  <option key={`select_${currentEta.id}`} value={currentEta.eta}> {currentEta.eta} </option>)}
      </Form.Control>

      <Form.Label> Codice Fiscale </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Codice Fiscale..." onChange={({ target }) => setNewCodiceFiscale(target.value)} defaultValue={allievaInfo.CodiceFiscale} />

      <Form.Label> Nome Allieva </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Nome Allieva..." onChange={({ target }) => setNewNome(target.value)} defaultValue={allievaInfo.Nome} />

      <Form.Label> Cognome Allieva </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cognome Allieva..." onChange={({ target }) => setNewCognome(target.value)} defaultValue={allievaInfo.Cognome} />

      <Form.Label> Citta </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Citta..." onChange={({ target }) => setNewCitta(target.value)} defaultValue={allievaInfo.Citta} />

      <Form.Label> Indirizzo </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Indirizzo..." onChange={({ target }) => setNewIndirizzo(target.value)} defaultValue={allievaInfo.Indirizzo} />

      <Form.Label> Cellulare </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cellulare..." onChange={({ target }) => setNewCellulare(target.value)} defaultValue={allievaInfo.Cellulare} />

      <Form.Label> Email </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Email..." onChange={({ target }) => setNewEmail(target.value)} defaultValue={allievaInfo.Email} />

      <Form.Label> Luogo Nascita </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Luogo Nascita..." onChange={({ target }) => setNewLuogoNascita(target.value)} defaultValue={allievaInfo.LuogoNascita} />

      <Form.Label> Disciplina </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewDisciplina(target.value)} defaultValue={allievaInfo.Disciplina}>
        {commondata.discipline.map(disciplina =>  <option key={`select_${disciplina.id}`} value={disciplina.disciplina}> {disciplina.disciplina} </option>)}
      </Form.Control>

      <Form.Label> Corso </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewCorso(target.value)} defaultValue={allievaInfo.Corso}>
        {commondata.corsi.map(corso =>  <option key={`select_${corso.id}`} value={corso.corso}> {corso.corso} </option>)}
      </Form.Control>

      <Form.Label> Scuola </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewScuola(target.value)} defaultValue={allievaInfo.Scuola}>
        {commondata.scuole.map(scuola =>  <option key={`select_${scuola.id}`} value={scuola.scuola}> {scuola.scuola} </option>)}
      </Form.Control>

      <Form.Label> Data Iscrizione </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataIscrizione(target.value)} defaultValue={ reverseDate(allievaInfo.DataIscrizione) } />

      <Form.Label> Data Certificato </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataCertificato(target.value)} defaultValue={ reverseDate(allievaInfo.DataCertificato) } />

      <Form.Label> Data Nascita </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataNascita(target.value)} defaultValue={ reverseDate(allievaInfo.DataNascita) } />
      
      <Form.Label> Data Scadenza Green Pass </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataGreenPass(target.value)} defaultValue={ reverseDate(allievaInfo.DataGreenPass) } />

      <Form.Label> Codice Fiscale Genitore </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Codice Fiscale Genitore..." onChange={({ target }) => setNewCodiceFiscaleGenitore(target.value)} defaultValue={allievaInfo.CodiceFiscaleGenitore} />

      <Form.Label> Nome Genitore </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Nome Genitore..." onChange={({ target }) => setNewNomeGenitore(target.value)} defaultValue={allievaInfo.NomeGenitore} />

      <Form.Label> Cognome Genitore </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cognome Genitore..." onChange={({ target }) => setNewCognomeGenitore(target.value)} defaultValue={allievaInfo.CognomeGenitore} />
    </>
  );
}

export default FormAllieva;