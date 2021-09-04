import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import formatDate from '../helpers/formatDateForInputDate';

import { createReceipt } from '../helpers/apiCalls';

const receiptType = [
  { id: 0, tipo: 'Quota' },
  { id: 1, tipo: 'Quota Associativa' },
];
const paymentMethod = [
  { id: 0, tipo: 'Contanti' },
  { id: 1, tipo: 'Assegno' },
  { id: 2, tipo: 'Bonifico Bancario' }
];
const defaultAmounts = [
  { value: '90', label: '90' },
  { value: '120', label: '120' },
  { value: '150', label: '150' }
];

const CreateReceiptForm = ({ CodiceFiscale, AllievaID }) => {
  const today = formatDate(new Date(), true);

  const [newReceiptNumber, setNewReceiptNumber] = useState('');
  const [newReceiptType, setNewReceiptType] = useState(receiptType[0].tipo);
  const [newPaymentMethod, setNewPaymentMethod] = useState(paymentMethod[0].tipo);
  const [newTotalAmount, setNewTotalAmount] = useState(defaultAmounts[0].value);
  const [newReceiptDate, setNewReceiptDate] = useState(today);
  const [newCourseStartDate, setNewCourseStartDate] = useState(today);
  const [newCourseEndDate, setNewCourseEndDate] = useState(today);
  const [updateRegistrationDate, setUpdateRegistrationDate] = useState(false);

  return (
    <div style={{ marginTop: '2em' }}>
      <div className="form-wrapper" style={{ width: '80vw', marginLeft: '0vw' }}>
        <div className="create-receipt-form">
          <div className="flex-element">
            <Form.Label> Numero Ricevuta </Form.Label>
            <Form.Control type="text" placeholder="Inserisci Numero Ricevuta..." onChange={({ target }) => setNewReceiptNumber(target.value)} defaultValue={newReceiptNumber} />
          </div>

          <div className="flex-element">
            <Form.Label> Tipo Ricevuta </Form.Label>
            <Form.Control as="select" onChange={({ target }) => setNewReceiptType(target.value)} defaultValue={newReceiptType}>
              {receiptType.map(currentTipo =>  <option key={`select_${currentTipo.tipo}`} value={currentTipo.tipo}> {currentTipo.tipo} </option>)}
            </Form.Control>
          </div>

          <div className="flex-element">
            <Form.Label> Tipo Pagamento </Form.Label>
            <Form.Control as="select" onChange={({ target }) => setNewPaymentMethod(target.value)} defaultValue={newPaymentMethod}>
              {paymentMethod.map(currentTipo =>  <option key={`select_${currentTipo.tipo}`} value={currentTipo.tipo}> {currentTipo.tipo} </option>)}
            </Form.Control>
          </div>
          
          <div className="flex-element">
            <Form.Label> Somma Euro </Form.Label>
            <CreatableSelect
              defaultValue={defaultAmounts[0]}
              onChange={(target) => {
                setNewTotalAmount(target.value)
                console.log(target.value)
              }}
              options={defaultAmounts}
            />
          </div>

          <div className="flex-element">
            <Form.Label> Data Ricevuta </Form.Label>
            <input type="date" onChange={({ target }) => setNewReceiptDate(target.value)} defaultValue={newReceiptDate} />
          </div>

          <div className="flex-element">
            <Form.Label> Data Inizio Corso </Form.Label>
            <input type="date" onChange={({ target }) => setNewCourseStartDate(target.value)} defaultValue={newCourseStartDate} />
          </div>

          <div className="flex-element">
            <Form.Label> Data Scadenza Corso </Form.Label>
            <input type="date" onChange={({ target }) => setNewCourseEndDate(target.value)} defaultValue={newCourseEndDate} />
          </div>

          <div className="flex-element">
            <Form.Check label="Usa Data Ricevuta come Data Iscrizione" type='checkbox' onChange={ ({ target }) =>  setUpdateRegistrationDate(target.checked) } />
          </div>
        </div>

        <Button variant='success' style={{ marginTop: '2em' }} onClick={() => {
          const newReceipt = {
            NumeroRicevuta: newReceiptNumber,
            DataRicevuta: newReceiptDate,
            DataInizioCorso: newCourseStartDate,
            DataScadenzaCorso: newCourseEndDate,
            SommaEuro: newTotalAmount,
            TipoPagamento: newPaymentMethod,
            TipoRicevuta: newReceiptType,
            CodiceFiscale: CodiceFiscale,
            AllievaID: AllievaID,
            DataIscrizione: updateRegistrationDate
          }
          createReceipt(newReceipt)
        }}>
          <span role='img' aria-label='create'>🆕</span> CREA RICEVUTA
        </Button>
      </div>
    </div>
  );
};

export default CreateReceiptForm;
