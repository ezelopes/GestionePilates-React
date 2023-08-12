import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FormProvider, useForm } from 'react-hook-form';
import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';
import FilteredReceiptsModal from '../FilteredReceiptsModal';
import { validateCourseBetweenTwoDates, isDateBetweenTwoDates, formatDate } from '../../../helpers/dates';
import orderReceiptsBasedOnReceiptNumber from '../../../helpers/orderReceiptsBasedOnReceiptNumber';
import { printReceiptsDetails } from '../../../helpers/printPDF';
import toastConfig from '../../../commondata/toast.config';
import { BLANK_DATE, isSubscriptionFee, paymentMethods } from '../../../commondata';
import isTemporaryReceipt from '../../../helpers/isTemporaryReceipt';
import ControlledFormDateField from '../../form/ControlledFormDateField';
import ControlledFormSelectField from '../../form/ControlledFormSelectField/ControlledFormSelectField';

const filterFields = [
  { value: 'receipt_date', label: 'Data Ricevuta' },
  { value: 'course_date', label: 'Data Inizio - Scadenza Corso' },
];

const paymentMethodFields = [{ value: 'all', label: '' }, ...paymentMethods];

const FilterReceiptsForm = ({ allReceipts, setCurrentReceipts, receiptsForAmountSummary, setReceiptsForAmountSummary }) => {
  const today = formatDate(new Date(), true);

  const form = useForm({
    defaultValues: {
      filterBy: filterFields[0].value,
      paymentMethod: paymentMethodFields[0].value,
      fromDate: today,
      toDate: today,
    },
  });

  const { watch, handleSubmit, reset } = form;

  const watchedFields = watch();

  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  // TODO: Create `useToggle` here.
  const [showFilteredAmountModal, setShowFilteredAmountModal] = useState(false);

  const filterReceipts = (formData) => {
    const receiptsWithDateFilter = allReceipts.filter(({ ReceiptDate, CourseStartDate, CourseEndDate }) =>
      formData.filterBy === 'receipt_date'
        ? isDateBetweenTwoDates(formData.fromDate, formData.toDate, ReceiptDate)
        : validateCourseBetweenTwoDates(formData.fromDate, formData.toDate, CourseStartDate, CourseEndDate)
    );

    if (formData.paymentMethod === 'all') {
      return receiptsWithDateFilter;
    }

    // TODO: formData.paymentMethod is either `cash`, `bank_transfer` or `check`. It needs to match the label here though.
    const receiptsWithPaymentAndDateFilters = receiptsWithDateFilter.filter(({ PaymentMethod }) =>
      PaymentMethod.includes(formData.paymentMethod)
    );

    return receiptsWithPaymentAndDateFilters;
  };

  const handleFilter = (formData) => {
    const filteredReceiptList = filterReceipts(formData);

    setCurrentReceipts(filteredReceiptList);
  };

  // Only consider subscription receipts.
  const calculateAmountBetweenDatesAndByPaymentMethod = (formData) => {
    if (formData.filterBy !== 'receipt_date') {
      return toast.error(getTranslation('toast.error.noEligibleFilter'), toastConfig);
    }

    const receipts = allReceipts.filter(({ ReceiptNumber, ReceiptDate, PaymentMethod, ReceiptType }) => {
      const isValid =
        isDateBetweenTwoDates(formData.fromDate, formData.toDate, ReceiptDate) &&
        isSubscriptionFee(ReceiptType) &&
        !isTemporaryReceipt(ReceiptNumber);

      if (formData.paymentMethod !== 'all') {
        return isValid && PaymentMethod.includes(formData.paymentMethod);
      }

      return isValid;
    });

    const filteredAmount = receipts.reduce((accumulator, { AmountPaid }) => accumulator + parseFloat(AmountPaid), 0);

    const copy = [...receipts];
    const orderedReceipts = orderReceiptsBasedOnReceiptNumber(copy);

    setReceiptsForAmountSummary(orderedReceipts);
    setTotalAmountPaid(filteredAmount);

    return setShowFilteredAmountModal(true);
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
              options={filterFields}
            />

            <ControlledFormSelectField
              name="paymentMethod"
              label={<Translation value="receiptFilterForm.selectPaymentMethod" />}
              options={paymentMethodFields}
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
            showFilteredAmountModal={showFilteredAmountModal}
            setShowFilteredAmountModal={setShowFilteredAmountModal}
            filteredAmountPaid={totalAmountPaid}
            filteredReceipts={receiptsForAmountSummary}
            fromDate={formatDate(new Date(watchedFields.fromDate)) || BLANK_DATE}
            toDate={formatDate(new Date(watchedFields.toDate)) || BLANK_DATE}
            filteredPaymentMethod={watchedFields.paymentMethod}
            printReceipts={() =>
              printReceiptsDetails(
                receiptsForAmountSummary,
                totalAmountPaid,
                watchedFields.paymentMethod,
                formatDate(new Date(watchedFields.fromDate)),
                formatDate(new Date(watchedFields.toDate))
              )
            }
          />
        </form>
      </FormProvider>
    </>
  );
};

FilterReceiptsForm.propTypes = {
  allReceipts: PropTypes.array.isRequired,
  receiptsForAmountSummary: PropTypes.array,
  setReceiptsForAmountSummary: PropTypes.func,
  setCurrentReceipts: PropTypes.func.isRequired,
  isMembershipFee: PropTypes.bool,
};

FilterReceiptsForm.defaultProps = {
  receiptsForAmountSummary: [],
  setReceiptsForAmountSummary: () => {},
  isMembershipFee: false,
};

export default FilterReceiptsForm;
