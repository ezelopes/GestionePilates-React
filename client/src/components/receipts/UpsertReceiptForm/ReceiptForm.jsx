import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import { isFunction } from 'is-what';
import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';

import { useStudent } from '../../student/StudentContext';

import ControlledFormDateField from '../../form/ControlledFormDateField';
import ControlledFormTextField from '../../form/ControlledFormTextField';
import ControlledFormSelectField from '../../form/ControlledFormSelectField';
import ControlledFormCreatableSelectField from '../../form/ControlledFormCreatableSelectField';
import ControlledFormCheckbox from '../../form/ControlledFormCheckbox';

import { receiptTypes, paymentMethods, defaultAmounts, isSubscriptionFee, isDanceRecitalFee } from '../../../commondata';
import hasMembershipFeeForSelectedSolarYear from '../../../helpers/hasMembershipFeeForSelectedSolarYear';
import { formatDate } from '../../../helpers/dates';

import './upsert-receipt-form.css';

const RECEIPT_TYPE_FIELDS = receiptTypes.map(({ type }) => ({ value: type, label: type }));

const ReceiptForm = ({ idPrefix, defaultValues, isEdit = false, children }) => {
  const today = formatDate(new Date(), true);

  const { studentReceipts } = useStudent();

  const { setValue, watch } = useFormContext();

  const watchedReceiptType = watch('ReceiptType') || defaultValues?.ReceiptType || RECEIPT_TYPE_FIELDS[0].value;

  const watchedReceiptDate = watch('ReceiptDate') || defaultValues?.ReceiptDate;

  const watchedIncludeMembershipFee = watch('IncludeMembershipFee') || defaultValues?.IncludeMembershipFee;

  const hasMembershipFeeForCurrentYear = useMemo(
    () => hasMembershipFeeForSelectedSolarYear(new Date(watchedReceiptDate).getFullYear(), studentReceipts),
    [watchedReceiptDate, studentReceipts]
  );

  const onReceiptTypeChange = (type) => {
    setValue('CourseStartDate', isSubscriptionFee(type) ? today : null);

    setValue('CourseEndDate', isSubscriptionFee(type) ? today : null);
  };

  const form = (
    <>
      <div className={isSubscriptionFee(watchedReceiptType) ? 'upsert-receipt-form' : 'upsert-membership-fee-form'}>
        <ControlledFormTextField
          id={`${idPrefix}-receipt-number`}
          name="ReceiptNumber"
          defaultValue={defaultValues?.ReceiptNumber || ''}
          label={<Translation value="receiptForm.receiptNumber" />}
          placeholder={getTranslation('placeholder.receiptNumber')}
          rules={{ required: getTranslation('receiptForm.receiptNumberError') }}
        />

        <ControlledFormSelectField
          id={`${idPrefix}-receipt-type`}
          name="ReceiptType"
          defaultValue={defaultValues?.ReceiptType || RECEIPT_TYPE_FIELDS[0].value}
          label={<Translation value="receiptForm.receiptType" />}
          options={RECEIPT_TYPE_FIELDS}
          onChange={onReceiptTypeChange}
        />

        <ControlledFormSelectField
          id={`${idPrefix}-payment-method`}
          name="PaymentMethod"
          defaultValue={defaultValues?.PaymentMethod || paymentMethods[0].value}
          label={<Translation value="receiptForm.paymentMethod" />}
          options={paymentMethods}
        />

        <ControlledFormCreatableSelectField
          id={`${idPrefix}-amount-paid`}
          name="AmountPaid"
          defaultValue={defaultValues?.AmountPaid || defaultAmounts[0].value}
          label={<Translation value="receiptForm.amountPaid" />}
          options={defaultAmounts}
        />

        <ControlledFormDateField
          id={`${idPrefix}-receipt-date`}
          name="ReceiptDate"
          defaultValue={defaultValues?.ReceiptDate || today}
          label={<Translation value="receiptForm.receiptDate" />}
        />

        {isSubscriptionFee(watchedReceiptType) && (
          <>
            <ControlledFormDateField
              id={`${idPrefix}-course-start-date`}
              name="CourseStartDate"
              defaultValue={defaultValues?.CourseStartDate || today}
              label={<Translation value="receiptForm.courseStartDate" />}
            />
            <ControlledFormDateField
              id={`${idPrefix}-course-end-date`}
              name="CourseEndDate"
              defaultValue={defaultValues?.CourseEndDate || today}
              label={<Translation value="receiptForm.courseEndDate" />}
            />
          </>
        )}
      </div>
      <div className="checkbox-container">
        {!isEdit && !isDanceRecitalFee(watchedReceiptType) && (
          <ControlledFormCheckbox
            id={`${idPrefix}-registration-date`}
            name="RegistrationDate"
            defaultValue={defaultValues?.RegistrationDate || false}
            label={<Translation value="receiptForm.isRegistrationDate" />}
          />
        )}

        {isSubscriptionFee(watchedReceiptType) && (
          <ControlledFormCheckbox
            id={`${idPrefix}-include-membership-fee`}
            name="IncludeMembershipFee"
            label={<Translation value="receiptForm.includeMembershipFee" />}
            defaultValue={defaultValues?.IncludeMembershipFee || false}
            disabled={!watchedIncludeMembershipFee && hasMembershipFeeForCurrentYear}
          />
        )}
      </div>
    </>
  );

  if (isFunction(children)) {
    return children({ form });
  }

  return form;
};

ReceiptForm.propTypes = {
  idPrefix: PropTypes.string,
  defaultValues: PropTypes.object,
  isEdit: PropTypes.bool,
  children: PropTypes.oneOf([PropTypes.node, PropTypes.func]),
};

ReceiptForm.defaultProps = {
  defaultValues: {},
  isEdit: false,
  children: undefined,
};

export default ReceiptForm;
