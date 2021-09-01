import React from 'react';
import { Form } from 'react-bootstrap'

import reverseDate from '../helpers/reverse-date-for-input-date';
import commondata from '../commondata/commondata'

const FormInsegnante = ({ 
  insegnanteInfo,
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
  setNewDataGreenPass
}) => {

  return (
    <>
      <Form.Label> Codice Fiscale </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Codice Fiscale..." onChange={({ target }) => setNewCodiceFiscale(target.value)} defaultValue={insegnanteInfo.CodiceFiscale} />

      <Form.Label> Nome Insegnante </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Nome Insegnante..." onChange={({ target }) => setNewNome(target.value)} defaultValue={insegnanteInfo.Nome} />

      <Form.Label> Cognome Insegnante </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cognome Insegnante..." onChange={({ target }) => setNewCognome(target.value)} defaultValue={insegnanteInfo.Cognome} />

      <Form.Label> Citta </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Citta..." onChange={({ target }) => setNewCitta(target.value)} defaultValue={insegnanteInfo.Citta} />

      <Form.Label> Indirizzo </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Indirizzo..." onChange={({ target }) => setNewIndirizzo(target.value)} defaultValue={insegnanteInfo.Indirizzo} />

      <Form.Label> Cellulare </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Cellulare..." onChange={({ target }) => setNewCellulare(target.value)} defaultValue={insegnanteInfo.Cellulare} />

      <Form.Label> Email </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Email..." onChange={({ target }) => setNewEmail(target.value)} defaultValue={insegnanteInfo.Email} />

      <Form.Label> Luogo Nascita </Form.Label>
      <Form.Control type="text" placeholder="Inserisci Luogo Nascita..." onChange={({ target }) => setNewLuogoNascita(target.value)} defaultValue={insegnanteInfo.LuogoNascita} />

      <Form.Label> Disciplina </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewDisciplina(target.value)} defaultValue={insegnanteInfo.Disciplina}>
        {commondata.discipline.map(disciplina =>  <option key={`select_${disciplina.id}`} value={disciplina.disciplina}> {disciplina.disciplina} </option>)}
      </Form.Control>

      <Form.Label> Corso </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewCorso(target.value)} defaultValue={insegnanteInfo.Corso}>
        {commondata.corsi.map(corso =>  <option key={`select_${corso.id}`} value={corso.corso}> {corso.corso} </option>)}
      </Form.Control>

      <Form.Label> Scuola </Form.Label>
      <Form.Control as="select" onChange={({ target }) => setNewScuola(target.value)} defaultValue={insegnanteInfo.Scuola}>
        {commondata.scuole.map(scuola =>  <option key={`select_${scuola.id}`} value={scuola.scuola}> {scuola.scuola} </option>)}
      </Form.Control>

      <Form.Label> Data Iscrizione </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataIscrizione(target.value)} defaultValue={ reverseDate(insegnanteInfo.DataIscrizione) } />

      <Form.Label> Data Certificato </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataCertificato(target.value)} defaultValue={ reverseDate(insegnanteInfo.DataCertificato) } />

      <Form.Label> Data Nascita </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataNascita(target.value)} defaultValue={ reverseDate(insegnanteInfo.DataNascita) } />
      
      <Form.Label> Data Scadenza Green Pass </Form.Label>
      <input type="date" onChange={({ target }) => setNewDataGreenPass(target.value)} defaultValue={ reverseDate(insegnanteInfo.DataGreenPass) } />

    </>
  );
}

export default FormInsegnante;