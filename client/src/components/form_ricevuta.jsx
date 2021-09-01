import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
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
let defaultAmounts = [
  { value: '90', label: '90' },
  { value: '120', label: '120' },
  { value: '150', label: '150' }
];

const FormCreaRicevuta = ({ CodiceFiscale, AllievaID }) => {
  const today = formatDate(new Date(), true);

  const [newNumeroRicevuta, setNewNumeroRicevuta] = useState('');
  const [newTipoRicevuta, setNewTipoRicevuta] = useState(tipoRicevuta[0].tipo);
  const [newTipoPagamento, setNewTipoPagamento] = useState(tipoPagamento[0].tipo);
  const [newSommaEuro, setNewSommaEuro] = useState(defaultAmounts[0].value);
  const [newDataRicevuta, setNewDataRicevuta] = useState(today);
  const [newDataInizioCorso, setNewDataInizioCorso] = useState(today);
  const [newDataScadenzaCorso, setNewDataScadenzaCorso] = useState(today);
  const [updateDataIscrizione, setUpdateDataIscrizione] = useState(false);

  return (
    <div style={{ marginTop: '2em' }}>
      <div className="formWrapper" style={{ width: '80vw', marginLeft: '0vw' }}>
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
            <CreatableSelect
              defaultValue={defaultAmounts[0]}
              onChange={(target) => {
                setNewSommaEuro(target.value)
                console.log(target.value)
              }}
              options={defaultAmounts}
            />
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
    </div>
  );
};

export default FormCreaRicevuta;
