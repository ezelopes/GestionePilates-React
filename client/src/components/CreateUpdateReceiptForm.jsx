import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';

import Divider from './Divider';

import { useStudent } from './StudentContext';

import toastConfig from '../helpers/toast.config';
import formatDate from '../helpers/formatDateForInputDate';

import { receiptType, paymentMethod, defaultAmounts } from '../commondata/commondata';

import 'react-toastify/dist/ReactToastify.css';

const CreateUpdateReceiptForm = ({ receiptInfo = null, callback, isForCreating = false, handleModal = () => {} }) => {
  const today = formatDate(new Date(), true);

  const { studentInfo, studentReceipts, setStudentReceipts } = useStudent();

  const [newReceiptType, setNewReceiptType] = useState(receiptInfo?.ReceiptType || receiptType[0].type);

  const defaultValues = {
    TaxCode: studentInfo.TaxCode,
    StudentID: studentInfo.StudentID,
    ReceiptID: receiptInfo?.ReceiptID,
    AmountPaid: receiptInfo?.AmountPaid || defaultAmounts[0].value,
  };

  if (newReceiptType === receiptType[1].type) {
    defaultValues.CourseStartDate = null;
    defaultValues.CourseEndDate = null;
  }

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const receiptTypeField = register('ReceiptType');

  const onSubmit = async (receiptData) => {
    const response = await callback(receiptData);

    if (response.status === 200) {
      if (!isForCreating) {
        const updatedStudentReceipts = [...studentReceipts];

        const receiptIndex = updatedStudentReceipts.findIndex(
          (receipt) => receipt.ReceiptID === defaultValues.ReceiptID
        );
        updatedStudentReceipts[receiptIndex] = response.receipt;

        setStudentReceipts(updatedStudentReceipts);

        handleModal(false);
      } else {
        setStudentReceipts([...studentReceipts, response.receipt]);
      }

      reset();
      return toast.success(response.message, toastConfig);
    }

    return toast.error(response.message, toastConfig);
  };

  const onReceiptTypeChange = (value) => {
    if (value === receiptType[1].type) {
      setValue('CourseStartDate', null);
      setValue('CourseEndDate', null);
    } else {
      setValue('CourseStartDate', receiptInfo?.CourseStartDate || today);
      setValue('CourseEndDate', receiptInfo?.CourseEndDate || today);
    }
  };

  watch((data) => {
    setNewReceiptType(data.ReceiptType);
  });

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
              {...register('ReceiptNumber', { required: 'Numero Ricevuta non puo essere vuoto!' })}
            />
            <div style={{ display: 'none' }}>
              <ErrorMessage
                errors={errors}
                name="ReceiptNumber"
                render={({ message }) => {
                  if (errors?.ReceiptNumber?.type === 'required') {
                    return toast.error(message, toastConfig);
                  }
                  return null;
                }}
              />
            </div>
          </div>

          <div className="flex-element">
            <Form.Label> Tipo Ricevuta </Form.Label>
            <Form.Control
              as="select"
              defaultValue={receiptInfo?.ReceiptType}
              {...receiptTypeField}
              onChange={(e) => {
                receiptTypeField.onChange(e);
                onReceiptTypeChange(e.target.value);
              }}
            >
              {receiptType.map((currentType) => (
                <option key={`select_${currentType.type}`} value={currentType.type}>
                  {' '}
                  {currentType.type}{' '}
                </option>
              ))}
            </Form.Control>
          </div>

          <div className="flex-element">
            <Form.Label> Tipo Pagamento </Form.Label>
            <Form.Control as="select" defaultValue={receiptInfo?.PaymentMethod} {...register('PaymentMethod')}>
              {paymentMethod.map((currentType) => (
                <option key={`select_${currentType.type}`} value={currentType.type}>
                  {' '}
                  {currentType.type}{' '}
                </option>
              ))}
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
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  options={defaultAmounts}
                  value={{ value: field.value, label: field.value }}
                  defaultValue={field.value}
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                />
              )}
            />
          </div>

          <div className="flex-element">
            <Form.Label> Data Ricevuta </Form.Label> <br />
            <input type="date" defaultValue={receiptInfo?.ReceiptDate || today} {...register('ReceiptDate')} />
          </div>

          {newReceiptType === receiptType[0].type && (
            <>
              <div className="flex-element">
                <Form.Label> Data Inizio Corso </Form.Label> <br />
                <input
                  type="date"
                  defaultValue={receiptInfo?.CourseStartDate || today}
                  {...register('CourseStartDate')}
                />
              </div>

              <div className="flex-element">
                <Form.Label> Data Scadenza Corso </Form.Label> <br />
                <input type="date" defaultValue={receiptInfo?.CourseEndDate || today} {...register('CourseEndDate')} />
              </div>
            </>
          )}

          {isForCreating && (
            <div className="flex-element">
              <Form.Check
                label="Usa Data Ricevuta come Data Iscrizione"
                type="checkbox"
                {...register('RegistrationDate')}
              />

              {newReceiptType === receiptType[0].type && (
                <Form.Check label="Contiene Quota Associativa" type="checkbox" style={{ marginTop: '1em' }} />
              )}
            </div>
          )}
        </div>

        <Divider double />

        <Button type="submit" variant="success">
          <span role="img" aria-label="create">
            🆕
          </span>{' '}
          {isForCreating ? 'CREA RICEVUTA' : 'AGGIORNA RICEVUTA'}
        </Button>
      </form>
    </>
  );
};

CreateUpdateReceiptForm.propTypes = {
  receiptInfo: PropTypes.shape({
    ReceiptID: PropTypes.number,
    StudentID: PropTypes.number,
    TaxCode: PropTypes.string,
    AmountPaid: PropTypes.string,
    ReceiptType: PropTypes.string,
    ReceiptNumber: PropTypes.string,
    PaymentMethod: PropTypes.string,
    ReceiptDate: PropTypes.string,
    CourseStartDate: PropTypes.string,
    CourseEndDate: PropTypes.string,
  }),
  callback: PropTypes.func.isRequired,
  isForCreating: PropTypes.bool,
  setUserInfo: PropTypes.func,
  handleModal: PropTypes.func,
};

CreateUpdateReceiptForm.defaultProps = {
  receiptInfo: {},
  isForCreating: false,
  setUserInfo: () => {},
  handleModal: () => {},
};

export default CreateUpdateReceiptForm;
