import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';

import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';

import { useStudent } from '../../student/StudentContext';

import toastConfig from '../../../commondata/toast.config';
import { formatDate } from '../../../helpers/dates';

import {
  receiptTypes,
  paymentMethods,
  defaultAmounts,
  isMembershipFee,
  isSubscriptionFee,
  isDanceRecitalFee,
} from '../../../commondata';

import './upsert-receipt-form.css';
import ControlledFormDateField from '../../form/ControlledFormDateField';

// TODO: Export this function into a helper file
const hasMembershipFeeForSelectedSolarYear = (year, receipts) => {
  const existingMembershipFeeYears = receipts
    .filter(({ ReceiptType, IncludeMembershipFee }) => isMembershipFee(ReceiptType) || IncludeMembershipFee)
    .map(({ ReceiptDate }) => new Date(ReceiptDate).getFullYear());

  return existingMembershipFeeYears.includes(year);
};

// TODO: Controlled components here.
const UpsertReceiptForm = ({ receiptInfo = null, mutate, isForCreating = false }) => {
  const today = formatDate(new Date(), true);

  const { studentInfo, studentReceipts } = useStudent();

  const defaultValues = {
    TaxCode: studentInfo.TaxCode,
    StudentID: studentInfo.StudentID,
    ReceiptType: receiptInfo?.ReceiptType || receiptTypes[0].type,
    ReceiptID: receiptInfo?.ReceiptID,
    AmountPaid: receiptInfo?.AmountPaid || defaultAmounts[0].value,
    IncludeMembershipFee: receiptInfo?.IncludeMembershipFee || false,
    ReceiptDate: receiptInfo?.ReceiptDate || today,
    // TODO: Maybe I should always send this date and the back end decides whether to ignore it or not based on receipt type!
    // || isSubscriptionFee(receiptInfo?.ReceiptType || receiptTypes[0].type) ? today : null,
    CourseStartDate: receiptInfo?.CourseStartDate,
    // || isSubscriptionFee(receiptInfo?.ReceiptType || receiptTypes[0].type) ? today : null,
    CourseEndDate: receiptInfo?.CourseEndDate,
  };

  const form = useForm({ defaultValues });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = form;

  const receiptTypeField = register('ReceiptType');

  const onSubmit = async (receiptData) => {
    const response = await mutate(receiptData);

    if (response.status === 200) {
      reset();
    }

    return toast.error(response?.message, toastConfig);
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

  const watchedReceiptType = watch('ReceiptType');

  const watchedReceiptDate = watch('ReceiptDate');

  const hasMembershipFeeForCurrentYear = useMemo(
    () => hasMembershipFeeForSelectedSolarYear(new Date(watchedReceiptDate || today).getFullYear(), studentReceipts),
    [watchedReceiptDate, studentReceipts, today]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={isSubscriptionFee(watchedReceiptType) ? 'upsert-receipt-form' : 'upsert-membership-fee-form'}>
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
              {paymentMethods.map(({ value, label }) => (
                <option key={`select_${value}`} value={value}>
                  {label}
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

          {isSubscriptionFee(watchedReceiptType) && (
            <>
              <ControlledFormDateField name="CourseStartDate" label={<Translation value="receiptForm.courseStartDate" />} />
              <ControlledFormDateField name="CourseEndDate" label={<Translation value="receiptForm.courseEndDate" />} />
            </>
          )}
        </div>
        <div className="checkbox-container">
          {isForCreating && !isDanceRecitalFee(watchedReceiptType) && (
            <Form.Check
              label={<Translation value="receiptForm.isRegistrationDate" />}
              type="checkbox"
              {...register('RegistrationDate')}
            />
          )}

          {isSubscriptionFee(watchedReceiptType) && (
            <Form.Check
              label={<Translation value="receiptForm.includeMembershipFee" />}
              type="checkbox"
              {...register('IncludeMembershipFee')}
              defaultChecked={receiptInfo?.IncludeMembershipFee || false}
              disabled={!receiptInfo?.IncludeMembershipFee && hasMembershipFeeForCurrentYear}
            />
          )}
        </div>

        <Button type="submit" variant="success">
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
    </FormProvider>
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
  mutate: PropTypes.func.isRequired,
  isForCreating: PropTypes.bool,
  setUserInfo: PropTypes.func,
};

UpsertReceiptForm.defaultProps = {
  receiptInfo: {},
  isForCreating: false,
  setUserInfo: () => {},
};

export default UpsertReceiptForm;
