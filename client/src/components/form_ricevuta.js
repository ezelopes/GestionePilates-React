import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import formatDate from '../helpers/format-date-for-input-date';

import { createReceipt } from '../helpers/api-calls';

let tipoRicevuta = [
  { id: 0, tipo: 'Quota' },
  { id: 1, tipo: 'Quota Associativa' },
];
let tipoPagamento = [
  { id: 0, tipo: 'Contanti' },
  { id: 1, tipo: 'Assegno' },
  { id: 2, tipo: 'Bonifico Bancario' }
];
let sommaEuro = [
  { id: 0, somma: '90' },
  { id: 1, somma: '120' },
  { id: 2, somma: '150' }
];

const FormCreaRicevuta = ({ CodiceFiscale, AllievaID }) => {
  const today = formatDate(new Date(), true);

  const [newNumeroRicevuta, setNewNumeroRicevuta] = useState('');
  const [newTipoRicevuta, setNewTipoRicevuta] = useState(tipoRicevuta[0].tipo);
  const [newTipoPagamento, setNewTipoPagamento] = useState(tipoPagamento[0].tipo);
  const [newSommaEuro, setNewSommaEuro] = useState(sommaEuro[0].somma);
  const [newDataRicevuta, setNewDataRicevuta] = useState(today);
  const [newDataInizioCorso, setNewDataInizioCorso] = useState(today);
  const [newDataScadenzaCorso, setNewDataScadenzaCorso] = useState(today);
  const [updateDataIscrizione, setUpdateDataIscrizione] = useState(false);

  const creaRicevuta = async () => {
    if (!newNumeroRicevuta || newNumeroRicevuta === '') return alert('Aggiungi Numero Ricevuta!');

    const infoRicevuta = {
      NumeroRicevuta: newNumeroRicevuta,
      DataRicevuta: newDataRicevuta,
      DataInizioCorso: newDataInizioCorso,
      DataScadenzaCorso: newDataScadenzaCorso,
      SommaEuro: newSommaEuro,
      TipoPagamento: newTipoPagamento,
      TipoRicevuta: newTipoRicevuta,
      CodiceFiscale: CodiceFiscale,
      AllievaID: AllievaID,
      DataIscrizione: updateDataIscrizione,
    }

    if (newTipoRicevuta === 'Quota Associativa') {
      delete infoRicevuta.DataInizioCorso;
      delete infoRicevuta.DataScadenzaCorso;
    }

    const response = await fetch('/api/ricevuta/creaRicevuta', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoRicevuta)
    });
    const responseParsed = await response.json();
    alert(responseParsed.message);
    window.location.reload();
  };

  return (
    <div style={{ marginTop: '2em', border: '1px solid', borderRadius: '8px', padding: '1em' }}>
      <div className="create-receipt-form">
        <div className="flex-element">
          <Form.Label> Numero Ricevuta </Form.Label>
          <Form.Control type="text" placeholder="Inserisci Numero Ricevuta..." onChange={({ target }) => setNewNumeroRicevuta(target.value)} defaultValue={newNumeroRicevuta} />
        </div>

        <div className="flex-element">
          <Form.Label> Tipo Ricevuta </Form.Label>
          <Form.Control as="select" onChange={({ target }) => setNewTipoRicevuta(target.value)} defaultValue={newTipoRicevuta}>
            {tipoRicevuta.map(currentTipo =>  <option key={`select_${currentTipo.tipo}`} value={currentTipo.tipo}> {currentTipo.tipo} </option>)}
          </Form.Control>
        </div>

        <div className="flex-element">
          <Form.Label> Tipo Pagamento </Form.Label>
          <Form.Control as="select" onChange={({ target }) => setNewTipoPagamento(target.value)} defaultValue={newTipoPagamento}>
            {tipoPagamento.map(currentTipo =>  <option key={`select_${currentTipo.tipo}`} value={currentTipo.tipo}> {currentTipo.tipo} </option>)}
          </Form.Control>
        </div>
        
        <div className="flex-element">
          <Form.Label> Somma Euro </Form.Label>
          <Form.Control as="select" onChange={({ target }) => setNewSommaEuro(target.value)} defaultValue={newSommaEuro}>
            {sommaEuro.map(currentSomma =>  <option key={`select_${currentSomma.somma}`} value={currentSomma.somma}> {currentSomma.somma} </option>)}
          </Form.Control>
        </div>

        <div className="flex-element">
          <Form.Label> Data Ricevuta </Form.Label>
          <input type="date" onChange={({ target }) => setNewDataRicevuta(target.value)} defaultValue={newDataRicevuta} />
        </div>

        <div className="flex-element">
          <Form.Label> Data Inizio Corso </Form.Label>
          <input type="date" onChange={({ target }) => setNewDataInizioCorso(target.value)} defaultValue={newDataInizioCorso} />
        </div>

        <div className="flex-element">
          <Form.Label> Data Scadenza Corso </Form.Label>
          <input type="date" onChange={({ target }) => setNewDataScadenzaCorso(target.value)} defaultValue={newDataScadenzaCorso} />
        </div>

        <div className="flex-element">
          <Form.Check label="Usa Data Ricevuta come Data Iscrizione" type='checkbox' onChange={ ({ target }) =>  setUpdateDataIscrizione(target.checked) } />
        </div>
      </div>
      <Button variant='success' style={{ marginTop: '2em' }} onClick={() => {
        // creaRicevuta
        const newReceipt = { NumeroRicevuta: newNumeroRicevuta, DataRicevuta: newDataRicevuta, DataInizioCorso: newDataInizioCorso, DataScadenzaCorso: newDataScadenzaCorso, SommaEuro: newSommaEuro, TipoPagamento: newTipoPagamento, TipoRicevuta: newTipoRicevuta, CodiceFiscale: CodiceFiscale, AllievaID: AllievaID, DataIscrizione: updateDataIscrizione }
        createReceipt(newReceipt)
      }}>
        <span role='img' aria-label='create'>🆕</span> CREA RICEVUTA
      </Button>
    </div>
  );
};

export default FormCreaRicevuta;
