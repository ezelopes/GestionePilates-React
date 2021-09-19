import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';

import Divider from './Divider';

import toastConfig from '../helpers/toast.config';
import formatDate from '../helpers/formatDateForInputDate';

import { receiptType, paymentMethod, defaultAmounts } from '../commondata/commondata'

import 'react-toastify/dist/ReactToastify.css';

const CreateUpdateReceiptForm = ({ TaxCode, StudentID, receiptInfo = null, callback, isForCreating = false, handleModal = () => {} }) => {
  const today = formatDate(new Date(), true);

  const [newReceiptType, setNewReceiptType] = useState(receiptInfo?.ReceiptType || receiptType[0].type);
  
  const defaultValues = {
    TaxCode,
    StudentID,
    ReceiptID: receiptInfo?.ReceiptID,
    AmountPaid: receiptInfo?.AmountPaid || defaultAmounts[0].value,
  }
  
  if (newReceiptType === receiptType[1].type) {
    defaultValues['CourseStartDate'] = today
    defaultValues['CourseEndDate'] = today
  }

  const { register, watch, handleSubmit, reset, control, formState: { errors } } = useForm({ defaultValues })

  const onSubmit = async (data) => {
    const response = await callback(data)

    if (response.status === 200) {
      if (!isForCreating) handleModal(false)

      reset()
      return toast.success(response.message, toastConfig)
    }

    return toast.error(response.message, toastConfig)
  }
  
  watch((data) => { setNewReceiptType(data.ReceiptType) })

  return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="create-receipt-form">
            <div className="flex-element">
              <Form.Label> Numero Ricevuta </Form.Label>
              <Form.Control 
                type="text"
                placeholder="Inserisci Numero Ricevuta..."
                defaultValue={receiptInfo?.ReceiptNumber}
                {...register('ReceiptNumber', { required: 'Numero Ricevuta non puo essere vuoto!' })} />
              <div style={{ display: 'none' }}> 
                <ErrorMessage
                    errors={errors}
                    name='ReceiptNumber'
                    render={({ message }) => {
                      if (errors?.ReceiptNumber?.type === "required") return toast.error(message, toastConfig)
                    }}
                />
              </div>
            </div>

            <div className="flex-element">
              <Form.Label> Tipo Ricevuta </Form.Label>
              <Form.Control as="select" defaultValue={receiptInfo?.ReceiptType} {...register('ReceiptType')}>
                {receiptType.map(currentType =>  <option key={`select_${currentType.type}`} value={currentType.type}> {currentType.type} </option>)}
              </Form.Control>
            </div>

            <div className="flex-element">
              <Form.Label> Tipo Pagamento </Form.Label>
              <Form.Control as="select" defaultValue={receiptInfo?.PaymentMethod} {...register('PaymentMethod')}>
                {paymentMethod.map(currentType =>  <option key={`select_${currentType.type}`} value={currentType.type}> {currentType.type} </option>)}
              </Form.Control>
            </div>
            
            <div className="flex-element">
              <Form.Label> Importo </Form.Label>
              <Controller
                name="AmountPaid"
                control={control}
                defaultValue={{
                  value: receiptInfo?.AmountPaid || defaultAmounts[0].value,
                  label: receiptInfo?.AmountPaid || defaultAmounts[0].label,
                }}
                render={({ field }) => {
                  return (<CreatableSelect
                    {...field}
                    options={defaultAmounts}
                    value={{ value: field.value, label: field.value }}
                    defaultValue={field.value}
                    onChange={(e) => { field.onChange(e.value) }}
                  />)
                }}
              />
            </div>

            <div className="flex-element">
              <Form.Label> Data Ricevuta </Form.Label>  <br />
              <input type="date" defaultValue={receiptInfo?.ReceiptDate || today} {...register('ReceiptDate')} />
            </div>

            {
              newReceiptType === receiptType[0].type && (
                <>
                  <div className="flex-element">
                    <Form.Label> Data Inizio Corso </Form.Label>  <br />
                    <input type="date" defaultValue={receiptInfo?.CourseStartDate || today} {...register('CourseStartDate')} />
                  </div>

                  <div className="flex-element">
                    <Form.Label> Data Scadenza Corso </Form.Label> <br />
                    <input type="date" defaultValue={receiptInfo?.CourseEndDate || today} {...register('CourseEndDate')} />
                  </div>
                </>
              )
            }

            {isForCreating && (
              <div className="flex-element">
                <Form.Check label="Usa Data Ricevuta come Data Iscrizione" type='checkbox' {...register('RegistrationDate')} />
                
                { newReceiptType === receiptType[0].type && (<Form.Check label="Contiene Quota Associativa" type='checkbox' style={{ marginTop: '1em' }} />) }
              </div>
            )}
          </div>

          <Divider double />
          
          <Button type='submit' variant='success'>
            <span role='img' aria-label='create'>🆕</span> {isForCreating ? 'CREA RICEVUTA' : 'AGGIORNA RICEVUTA' }
          </Button>
        </form>
        
      </>
  );
};

export default CreateUpdateReceiptForm;
