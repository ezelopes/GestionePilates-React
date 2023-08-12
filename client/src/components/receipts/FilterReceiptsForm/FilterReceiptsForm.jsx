import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormProvider, useForm } from 'react-hook-form';
import Translation from '../../common/Translation';
import FilteredReceiptsModal from '../FilteredReceiptsModal';
import { validateCourseBetweenTwoDates, isDateBetweenTwoDates, formatDate } from '../../../helpers/dates';
import { getPaymentMethodLabelFromValue, isSubscriptionFee, paymentMethods } from '../../../commondata';
import isTemporaryReceipt from '../../../helpers/isTemporaryReceipt';
import ControlledFormDateField from '../../form/ControlledFormDateField';
import ControlledFormSelectField from '../../form/ControlledFormSelectField/ControlledFormSelectField';
import { useToggle } from '../../common/useToggle';

const FILTER_BY_FIELDS = [
  { value: 'receipt_date', label: 'Data Ricevuta' },
  { value: 'course_date', label: 'Data Inizio - Scadenza Corso' },
];

const PAYMENT_METHODS_FIELDS = [{ value: 'all', label: '' }, ...paymentMethods];

const FilterReceiptsForm = ({ allReceipts, setCurrentReceipts }) => {
  const today = formatDate(new Date(), true);

  const [receiptsForAmountSummary, setReceiptsForAmountSummary] = useState([]);

  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  const [showModal, toggleShowModal] = useToggle();

  const form = useForm({
    defaultValues: {
      filterBy: FILTER_BY_FIELDS[0].value,
      paymentMethod: PAYMENT_METHODS_FIELDS[0].value,
      fromDate: today,
      toDate: today,
    },
  });

  const { watch, handleSubmit, reset } = form;

  const watchedFields = watch();

  const filterReceipts = ({ filterBy, fromDate, toDate, paymentMethod }) => {
    // First filter by date.
    const receiptsWithDateFilter = allReceipts.filter(({ ReceiptDate, CourseStartDate, CourseEndDate }) =>
      filterBy === 'receipt_date'
        ? isDateBetweenTwoDates(fromDate, toDate, ReceiptDate)
        : validateCourseBetweenTwoDates(fromDate, toDate, CourseStartDate, CourseEndDate)
    );

    if (paymentMethod === 'all') {
      return receiptsWithDateFilter;
    }

    // Filter by payment method too.
    return receiptsWithDateFilter.filter(({ PaymentMethod }) => PaymentMethod === getPaymentMethodLabelFromValue(paymentMethod));
  };

  const handleFilter = (formData) => {
    const filteredReceiptList = filterReceipts(formData);

    setCurrentReceipts(filteredReceiptList);
  };

  const filterReceiptsForPaymentSummary = ({ fromDate, toDate, paymentMethod }) =>
    allReceipts.filter(({ ReceiptNumber, ReceiptDate, PaymentMethod, ReceiptType }) => {
      const isValid =
        isDateBetweenTwoDates(fromDate, toDate, ReceiptDate) &&
        // Only consider subscription receipts.
        isSubscriptionFee(ReceiptType) &&
        !isTemporaryReceipt(ReceiptNumber);

      return paymentMethod === 'all' ? isValid : isValid && PaymentMethod === getPaymentMethodLabelFromValue(paymentMethod);
    });

  const calculateAmountBetweenDatesAndByPaymentMethod = (formData) => {
    if (formData.filterBy !== 'receipt_date') {
      return;
    }

    const receipts = filterReceiptsForPaymentSummary(formData);
    const total = receipts.reduce((accumulator, { AmountPaid }) => accumulator + parseFloat(AmountPaid), 0);

    setReceiptsForAmountSummary(receipts);
    setTotalAmountPaid(total);

    toggleShowModal();
  };

  const clearFilters = () => {
    reset();

    setCurrentReceipts(allReceipts);
    setReceiptsForAmountSummary([]);
  };

  return (
    <>
      <FormProvider {...form}>
        <form id="receipts-form" onSubmit={handleSubmit(handleFilter)}>
          <div className="filter-form">
            <ControlledFormSelectField
              name="filterBy"
              label={<Translation value="receiptFilterForm.filterBy" />}
              options={FILTER_BY_FIELDS}
            />

            <ControlledFormSelectField
              name="paymentMethod"
              label={<Translation value="receiptFilterForm.selectPaymentMethod" />}
              options={PAYMENT_METHODS_FIELDS}
            />

            <ControlledFormDateField name="fromDate" label={<Translation value="common.from" />} />

            <ControlledFormDateField name="toDate" label={<Translation value="common.to" />} />
          </div>
          <div className="buttons-container">
            <Button
              variant="success"
              onClick={handleSubmit(calculateAmountBetweenDatesAndByPaymentMethod)}
              disabled={watchedFields.filterBy !== 'receipt_date'}
            >
              <span role="img" aria-label="summary">
                🧾 <Translation value="buttons.receipt.calculateTotalAmount" />
              </span>
            </Button>

            <Button type="submit" variant="primary">
              <span role="img" aria-label="filter">
                🔎 <Translation value="buttons.filter" />
              </span>
            </Button>

            <Button variant="danger" onClick={clearFilters}>
              <span role="img" aria-label="remove-filters">
                🗑️ <Translation value="buttons.removeFilters" />
              </span>
            </Button>
          </div>

          <FilteredReceiptsModal
            showModal={showModal}
            toggleShowModal={toggleShowModal}
            amount={totalAmountPaid}
            receipts={receiptsForAmountSummary}
            fromDate={formatDate(new Date(watchedFields.fromDate))}
            toDate={formatDate(new Date(watchedFields.toDate))}
            paymentMethod={getPaymentMethodLabelFromValue(watchedFields.paymentMethod)}
          />
        </form>
      </FormProvider>
    </>
  );
};

FilterReceiptsForm.propTypes = {
  allReceipts: PropTypes.array.isRequired,
  setCurrentReceipts: PropTypes.func.isRequired,
};

export default FilterReceiptsForm;
