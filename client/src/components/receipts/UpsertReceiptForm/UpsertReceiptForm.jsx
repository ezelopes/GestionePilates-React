import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';

import { useStudent } from '../../student/StudentContext';

import ControlledFormDateField from '../../form/ControlledFormDateField';
import ControlledFormTextField from '../../form/ControlledFormTextField/ControlledFormTextField';
import ControlledFormSelectField from '../../form/ControlledFormSelectField/ControlledFormSelectField';

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
import ControlledFormCreatableSelectField from '../../form/ControlledFormCreatableSelectField';

const RECEIPT_TYPE_FIELDS = receiptTypes.map(({ type }) => ({ value: type, label: type }));

// TODO: Export this function into a helper file
const hasMembershipFeeForSelectedSolarYear = (year, receipts) => {
  const existingMembershipFeeYears = receipts
    .filter(({ ReceiptType, IncludeMembershipFee }) => isMembershipFee(ReceiptType) || IncludeMembershipFee)
    .map(({ ReceiptDate }) => new Date(ReceiptDate).getFullYear());

  return existingMembershipFeeYears.includes(year);
};

const UpsertReceiptForm = ({ receiptInfo = null, mutate, isForCreating = false }) => {
  const today = formatDate(new Date(), true);

  const { studentInfo, studentReceipts } = useStudent();

  const defaultValues = {
    TaxCode: studentInfo.TaxCode,
    StudentID: studentInfo.StudentID,
    ReceiptNumber: receiptInfo?.ReceiptNumber || '',
    ReceiptType: receiptInfo?.ReceiptType || RECEIPT_TYPE_FIELDS[0].value,
    PaymentMethod: receiptInfo?.PaymentMethod || paymentMethods[0].value,
    ReceiptID: receiptInfo?.ReceiptID,
    AmountPaid: receiptInfo?.AmountPaid || defaultAmounts[0].value,
    IncludeMembershipFee: receiptInfo?.IncludeMembershipFee || false,
    ReceiptDate: receiptInfo?.ReceiptDate || today,
    CourseStartDate: receiptInfo?.CourseStartDate || today,
    CourseEndDate: receiptInfo?.CourseEndDate || today,
  };

  const form = useForm({ defaultValues });

  const { register, watch, handleSubmit, reset, formState } = form;

  const onSubmit = async (receiptData) => {
    const response = await mutate(receiptData);

    if (response.status === 200) {
      // TODO: Refetch receipts?
      return reset();
    }

    return toast.error(response?.message, toastConfig);
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
          <ControlledFormTextField
            name="ReceiptNumber"
            label={<Translation value="receiptForm.receiptNumber" />}
            placeholder={getTranslation('placeholder.receiptNumber')}
            rules={{ required: getTranslation('receiptForm.receiptNumberError') }}
            errors={formState.errors}
          />

          <ControlledFormSelectField
            name="ReceiptType"
            label={<Translation value="receiptForm.receiptType" />}
            options={RECEIPT_TYPE_FIELDS}
          />

          <ControlledFormSelectField
            name="PaymentMethod"
            label={<Translation value="receiptForm.paymentMethod" />}
            options={paymentMethods}
          />

          <ControlledFormCreatableSelectField
            name="AmountPaid"
            label={<Translation value="receiptForm.amountPaid" />}
            options={defaultAmounts}
          />

          <ControlledFormDateField name="ReceiptDate" label={<Translation value="receiptForm.receiptDate" />} />

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
          <Translation value={isForCreating ? 'buttons.receipt.createReceipt' : 'buttons.receipt.updateReceipt'} />
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
