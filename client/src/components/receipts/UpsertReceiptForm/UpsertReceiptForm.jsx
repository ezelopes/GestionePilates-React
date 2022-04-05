import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';

import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';

import { useStudent } from '../../student/StudentContext';

import toastConfig from '../../../commondata/toast.config';
import formatDate from '../../../helpers/formatDateForInputDate';

import {
  receiptTypes,
  paymentMethods,
  defaultAmounts,
  isMembershipFee,
  isSubscriptionFee,
  isDanceRecitalFee,
} from '../../../commondata';

import './upsert-receipt-form.css';

const checkMembershipFeePerSolarYear = (selectedReceiptDateYear, receipts) => {
  const existingMembershipFeeYearsArray = receipts.reduce((accumulator, { ReceiptDate, ReceiptType, IncludeMembershipFee }) => {
    if (!isMembershipFee(ReceiptType) && !IncludeMembershipFee) {
      return accumulator;
    }

    const currentMembershipYear = new Date(ReceiptDate).getFullYear();
    accumulator.push(currentMembershipYear);

    return accumulator;
  }, []);

  const existingMembershipFeeYears = [...new Set(existingMembershipFeeYearsArray)];

  return existingMembershipFeeYears.includes(selectedReceiptDateYear);
};

const UpsertReceiptForm = ({ receiptInfo = null, callback, isForCreating = false, handleModal = () => {} }) => {
  const today = formatDate(new Date(), true);

  const { studentInfo, studentReceipts, setStudentReceipts } = useStudent();

  const [newReceiptType, setNewReceiptType] = useState(receiptInfo?.ReceiptType || receiptTypes[0].type);
  const [disableIncludeMembershipFee, setDisableIncludeMembershipFee] = useState(false);

  const defaultValues = {
    TaxCode: studentInfo.TaxCode,
    StudentID: studentInfo.StudentID,
    ReceiptID: receiptInfo?.ReceiptID,
    AmountPaid: receiptInfo?.AmountPaid || defaultAmounts[0].value,
    IncludeMembershipFee: receiptInfo?.IncludeMembershipFee || false,
  };

  if (!isSubscriptionFee(newReceiptType)) {
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
    if (isSubscriptionFee(value)) {
      setValue('CourseStartDate', receiptInfo?.CourseStartDate || today);
      setValue('CourseEndDate', receiptInfo?.CourseEndDate || today);
    } else {
      setValue('CourseStartDate', null);
      setValue('CourseEndDate', null);
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
        <div className="upsert-receipt-form">
          <div>
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

          <div>
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
              {receiptTypes.map((receiptType) => (
                <option key={`select_${receiptType.type}`} value={receiptType.type}>
                  {receiptType.type}
                </option>
              ))}
            </Form.Control>
          </div>

          <div>
            <Form.Label>
              <Translation value="receiptForm.paymentType" />
            </Form.Label>
            <Form.Control as="select" defaultValue={receiptInfo?.PaymentMethod} {...register('PaymentMethod')}>
              {paymentMethods.map((currentType) => (
                <option key={`select_${currentType.type}`} value={currentType.type}>
                  {currentType.type}
                </option>
              ))}
            </Form.Control>
          </div>

          <div>
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

          <div>
            <Form.Label>
              <Translation value="receiptForm.receiptDate" />
            </Form.Label>
            <Form.Control type="date" defaultValue={receiptInfo?.ReceiptDate || today} {...register('ReceiptDate')} />
          </div>

          {isSubscriptionFee(newReceiptType) && (
            <>
              <div>
                <Form.Label>
                  <Translation value="receiptForm.courseStartDate" />
                </Form.Label>
                <Form.Control type="date" defaultValue={receiptInfo?.CourseStartDate || today} {...register('CourseStartDate')} />
              </div>

              <div>
                <Form.Label>
                  <Translation value="receiptForm.courseEndDate" />
                </Form.Label>
                <Form.Control type="date" defaultValue={receiptInfo?.CourseEndDate || today} {...register('CourseEndDate')} />
              </div>
            </>
          )}

          <div className="checkbox-container">
            {isForCreating && !isDanceRecitalFee(newReceiptType) && (
              <Form.Check
                label={<Translation value="receiptForm.isRegistrationDate" />}
                type="checkbox"
                {...register('RegistrationDate')}
              />
            )}

            {isSubscriptionFee(newReceiptType) && (
              <Form.Check
                label={<Translation value="receiptForm.includeMembershipFee" />}
                type="checkbox"
                {...register('IncludeMembershipFee')}
                defaultChecked={receiptInfo?.IncludeMembershipFee || false}
                disabled={!receiptInfo?.IncludeMembershipFee && disableIncludeMembershipFee}
              />
            )}
          </div>
        </div>

        <Button type="submit" variant="success" style={{ marginTop: '2em' }}>
          {isForCreating ? (
            <span role="img" aria-label="create">
              🆕&nbsp;
              <Translation value="buttons.receipt.createReceipt" />
            </span>
          ) : (
            <Translation value="buttons.receipt.updateReceipt" />
          )}
        </Button>
      </form>
    </>
  );
};

UpsertReceiptForm.propTypes = {
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

UpsertReceiptForm.defaultProps = {
  receiptInfo: {},
  isForCreating: false,
  setUserInfo: () => {},
  handleModal: () => {},
};

export default UpsertReceiptForm;
