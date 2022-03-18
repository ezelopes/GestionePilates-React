import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';

import Translation from '../common/Translation/Translation';
import { getTranslation } from '../common/Translation/helpers';
import Divider from '../common/Divider';

import { useStudent } from '../Student/StudentContext';

import toastConfig from '../../helpers/toast.config';
import formatDate from '../../helpers/formatDateForInputDate';

import { receiptType, paymentMethod, defaultAmounts } from '../../commondata';

const checkMembershipFeePerSolarYear = (selectedReceiptDateYear, receipts) => {
  const existingMembershipFeeYearsArray = receipts.reduce((accumulator, { ReceiptDate, ReceiptType, IncludeMembershipFee }) => {
    if (ReceiptType === receiptType[0].type && !IncludeMembershipFee) {
      return accumulator;
    }

    const currentMembershipYear = new Date(ReceiptDate).getFullYear();
    accumulator.push(currentMembershipYear);

    return accumulator;
  }, []);

  const existingMembershipFeeYears = [...new Set(existingMembershipFeeYearsArray)];

  return existingMembershipFeeYears.includes(selectedReceiptDateYear);
};

const CreateUpdateReceiptForm = ({ receiptInfo = null, callback, isForCreating = false, handleModal = () => {} }) => {
  const today = formatDate(new Date(), true);

  const { studentInfo, studentReceipts, setStudentReceipts } = useStudent();

  const [newReceiptType, setNewReceiptType] = useState(receiptInfo?.ReceiptType || receiptType[0].type);
  const [disableIncludeMembershipFee, setDisableIncludeMembershipFee] = useState(false);

  const defaultValues = {
    TaxCode: studentInfo.TaxCode,
    StudentID: studentInfo.StudentID,
    ReceiptID: receiptInfo?.ReceiptID,
    AmountPaid: receiptInfo?.AmountPaid || defaultAmounts[0].value,
    IncludeMembershipFee: receiptInfo?.IncludeMembershipFee || false,
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

        const receiptIndex = updatedStudentReceipts.findIndex((receipt) => receipt.ReceiptID === defaultValues.ReceiptID);
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

  useEffect(() => {
    const membershipFeeExitsInSelectedYear = checkMembershipFeePerSolarYear(
      new Date(receiptInfo?.ReceiptDate || today).getFullYear(),
      studentReceipts
    );

    setDisableIncludeMembershipFee(membershipFeeExitsInSelectedYear);
  }, [receiptInfo, studentReceipts, today]);

  watch((data) => {
    setNewReceiptType(data.ReceiptType);

    const membershipFeeExitsInSelectedYear = checkMembershipFeePerSolarYear(
      new Date(data.ReceiptDate).getFullYear(),
      studentReceipts
    );

    setDisableIncludeMembershipFee(membershipFeeExitsInSelectedYear);
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="create-receipt-form">
          <div className="flex-element">
            <Form.Label>
              <Translation value="receiptForm.receiptNumber" />
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={getTranslation('placeholder.receiptNumber')}
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
            <Form.Label>
              <Translation value="receiptForm.receiptType" />
            </Form.Label>
            <Form.Control
              as="select"
              defaultValue={receiptInfo?.ReceiptType}
              {...receiptTypeField}
              onChange={(e) => {
                receiptTypeField.onChange(e);
                onReceiptTypeChange(e.target.value);
              }}
            >
              <option key={`select_${receiptType[0].type}`} value={receiptType[0].type}>
                {receiptType[0].type}
              </option>
              <option
                key={`select_${receiptType[1].type}`}
                value={receiptType[1].type}
                disabled={newReceiptType === receiptType[0].type && disableIncludeMembershipFee}
              >
                {receiptType[1].type}
              </option>
            </Form.Control>
          </div>

          <div className="flex-element">
            <Form.Label>
              <Translation value="receiptForm.paymentType" />
            </Form.Label>
            <Form.Control as="select" defaultValue={receiptInfo?.PaymentMethod} {...register('PaymentMethod')}>
              {paymentMethod.map((currentType) => (
                <option key={`select_${currentType.type}`} value={currentType.type}>
                  {currentType.type}
                </option>
              ))}
            </Form.Control>
          </div>

          <div className="flex-element">
            <Form.Label>
              <Translation value="receiptForm.amountPaid" />
            </Form.Label>
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
            <Form.Label>
              <Translation value="receiptForm.receiptDate" />
            </Form.Label>
            <br />
            <input type="date" defaultValue={receiptInfo?.ReceiptDate || today} {...register('ReceiptDate')} />
          </div>

          {newReceiptType === receiptType[0].type && (
            <>
              <div className="flex-element">
                <Form.Label>
                  <Translation value="receiptForm.courseStartDate" />
                </Form.Label>
                <br />
                <input type="date" defaultValue={receiptInfo?.CourseStartDate || today} {...register('CourseStartDate')} />
              </div>

              <div className="flex-element">
                <Form.Label>
                  <Translation value="receiptForm.courseEndDate" />
                </Form.Label>
                <br />
                <input type="date" defaultValue={receiptInfo?.CourseEndDate || today} {...register('CourseEndDate')} />
              </div>
            </>
          )}

          <div className="flex-element" style={{ alignSelf: 'flex-end' }}>
            {isForCreating && (
              <Form.Check
                label={<Translation value="receiptForm.isRegistrationDate" />}
                type="checkbox"
                {...register('RegistrationDate')}
              />
            )}

            {newReceiptType === receiptType[0].type && (
              <Form.Check
                label={<Translation value="receiptForm.includeMembershipFee" />}
                type="checkbox"
                style={{ marginTop: '1em' }}
                {...register('IncludeMembershipFee')}
                defaultChecked={receiptInfo?.IncludeMembershipFee || false}
                disabled={!receiptInfo?.IncludeMembershipFee && disableIncludeMembershipFee}
              />
            )}
          </div>
        </div>

        <Divider double />

        <Button type="submit" variant="success">
          <span role="img" aria-label="create">
            🆕&nbsp;
            {isForCreating ? (
              <Translation value="buttons.receipt.createReceipt" />
            ) : (
              <Translation value="buttons.receipt.updateReceipt" />
            )}
          </span>
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
    IncludeMembershipFee: PropTypes.bool,
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
