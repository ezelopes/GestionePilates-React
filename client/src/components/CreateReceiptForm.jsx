import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import formatDate from '../helpers/formatDateForInputDate';

import { createReceipt, updateReceipt } from '../helpers/apiCalls';
import Divider from './Divider';

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

const CreateReceiptForm = ({ TaxCode, StudentID, receiptInfo = null, isForCreating = false, isForUpdating = false }) => {
  const today = formatDate(new Date(), true);

  const [newReceiptNumber, setNewReceiptNumber] = useState(receiptInfo?.ReceiptNumber || '');
  const [newReceiptType, setNewReceiptType] = useState(receiptInfo?.ReceiptType || receiptType[0].tipo);
  const [newPaymentMethod, setNewPaymentMethod] = useState(receiptInfo?.PaymentMethod || paymentMethod[0].tipo);
  const [newAmountPaid, setNewAmountPaid] = useState(receiptInfo?.AmountPaid || defaultAmounts[0].value);
  const [newReceiptDate, setNewReceiptDate] = useState(receiptInfo?.ReceiptDate || today);
  const [newCourseStartDate, setNewCourseStartDate] = useState(receiptInfo?.CourseStartDate || today);
  const [newCourseEndDate, setNewCourseEndDate] = useState(receiptInfo?.CourseEndDate || today);
  const [updateRegistrationDate, setUpdateRegistrationDate] = useState(false);

  return (
      <>
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
              onChange={(target) => setNewAmountPaid(target.value) }
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
            <Form.Label> Data Scadenza Corso </Form.Label> <br />
            <input type="date" onChange={({ target }) => setNewCourseEndDate(target.value)} defaultValue={newCourseEndDate} />
          </div>

          {isForCreating && (
            <div className="flex-element">
              <Form.Check label="Usa Data Ricevuta come Data Iscrizione" type='checkbox' onChange={ ({ target }) =>  setUpdateRegistrationDate(target.checked) } />
            </div>
          )}
        </div>
        
        <Divider double />
        
        <Button variant='success' onClick={async () => {
          const newReceipt = {
            ReceiptID: receiptInfo?.ReceiptID || null,
            ReceiptNumber: newReceiptNumber || null,
            ReceiptDate: newReceiptDate || null,
            CourseStartDate: newCourseStartDate || null,
            CourseEndDate: newCourseEndDate || null,
            AmountPaid: newAmountPaid || null,
            PaymentMethod: newPaymentMethod || null,
            ReceiptType: newReceiptType || null,
            TaxCode: TaxCode || null,
            StudentID: StudentID || null,
            RegistrationDate: updateRegistrationDate || false
          }

          if (isForCreating) {
            return createReceipt(newReceipt)
          }

          if (isForUpdating) {
            return updateReceipt(newReceipt)
          }
        }}>
          <span role='img' aria-label='create'>🆕</span> {isForCreating ? 'CREA RICEVUTA' : 'AGGIORNA RICEVUTA' }
        </Button>
      </>
  );
};

export default CreateReceiptForm;
