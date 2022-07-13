import { Button, Form } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';
import FilteredReceiptsModal from '../FilteredReceiptsModal';
import { validateCourseBetweenTwoDates, isDateBetweenTwoDates, formatDate } from '../../../helpers/dates';
import orderReceiptsBasedOnReceiptNumber from '../../../helpers/orderReceiptsBasedOnReceiptNumber';
import { printReceiptsDetails, printMembershipFeeSummaryTemplate } from '../../../helpers/printPDF';
import toastConfig from '../../../commondata/toast.config';
import { BLANK_DATE, isSubscriptionFee, paymentMethods } from '../../../commondata';
import isTemporaryReceipt from '../../../helpers/isTemporaryReceipt';

const filterFields = [
  { field: 'receipt_date', description: 'Data Ricevuta' },
  { field: 'course_date', description: 'Data Inizio - Scadenza Corso' },
];

const FilterReceiptsForm = ({
  allReceipts,
  setCurrentReceipts,
  receiptsForAmountSummary,
  setReceiptsForAmountSummary,
  gridOptions,
  isMembershipFee,
}) => {
  const today = formatDate(new Date(), true);

  const [filterByField, setFilterByField] = useState(filterFields[0].field);
  const [filteredPaymentMethod, setFilteredPaymentMethod] = useState(null);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  const [showFilteredAmountModal, setShowFilteredAmountModal] = useState(false);

  const selectPaymentMethodRef = useRef();
  const selectFilterFieldRef = useRef();
  const fromDateRef = useRef();
  const toDateRef = useRef();

  const filterReceipts = () => {
    const receiptsWithDateFilter = allReceipts.filter(({ ReceiptDate, CourseStartDate, CourseEndDate }) =>
      filterByField === 'receipt_date'
        ? isDateBetweenTwoDates(fromDate, toDate, ReceiptDate)
        : validateCourseBetweenTwoDates(fromDate, toDate, CourseStartDate, CourseEndDate)
    );

    if (!filteredPaymentMethod) {
      return setCurrentReceipts(receiptsWithDateFilter);
    }

    const receiptsWithPaymentAndDateFilters = receiptsWithDateFilter.filter(({ PaymentMethod }) =>
      PaymentMethod.includes(filteredPaymentMethod)
    );

    return setCurrentReceipts(receiptsWithPaymentAndDateFilters);
  };

  // Only consider subscription receipts.
  const calculateAmountBetweenDatesAndByPaymentMethod = () => {
    if (filterByField !== 'receipt_date') {
      return toast.error(getTranslation('toast.error.noEligibleFilter'), toastConfig);
    }

    if (!filteredPaymentMethod) {
      return toast.error(getTranslation('toast.error.noPaymentMethodSelected'), toastConfig);
    }

    const receipts = allReceipts.filter(
      ({ ReceiptNumber, ReceiptDate, PaymentMethod, ReceiptType }) =>
        isDateBetweenTwoDates(fromDate, toDate, ReceiptDate) &&
        PaymentMethod.includes(filteredPaymentMethod) &&
        isSubscriptionFee(ReceiptType) &&
        !isTemporaryReceipt(ReceiptNumber)
    );

    const filteredAmount = receipts.reduce((accumulator, { AmountPaid }) => accumulator + parseFloat(AmountPaid), 0);

    const copy = [...receipts];
    const orderedReceipts = orderReceiptsBasedOnReceiptNumber(copy);

    setReceiptsForAmountSummary(orderedReceipts);
    setTotalAmountPaid(filteredAmount);

    return setShowFilteredAmountModal(true);
  };

  const clearFilters = () => {
    if (!isMembershipFee) {
      const PaymentMethodFilterComponent = gridOptions.api.getFilterInstance('PaymentMethod');

      PaymentMethodFilterComponent.setModel(null);
      gridOptions.api.onFilterChanged();

      selectPaymentMethodRef.current.value = null;
      selectFilterFieldRef.current.value = filterFields[0].field;

      setFilterByField(filterFields[0].field);
    }

    // Set default values in other components
    fromDateRef.current.value = today;
    toDateRef.current.value = today;

    setCurrentReceipts(allReceipts);
    setReceiptsForAmountSummary([]);
  };

  return (
    <>
      <div className="filter-form">
        {!isMembershipFee && (
          <Form.Group>
            <Form.Label>
              <Translation value="receiptFilterForm.filterBy" />
            </Form.Label>
            <Form.Control ref={selectFilterFieldRef} as="select" onChange={({ target }) => setFilterByField(target.value)}>
              {filterFields.map(({ field, description }) => (
                <option key={`select_${field}`} value={field}>
                  {description}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        {!isMembershipFee && (
          <Form.Group>
            <Form.Label>
              <Translation value="receiptFilterForm.selectPaymentMethod" />
            </Form.Label>
            <Form.Control
              ref={selectPaymentMethodRef}
              as="select"
              onChange={({ target }) => setFilteredPaymentMethod(target.value)}
            >
              <option key={null} value={null}>
                {null}
              </option>
              {paymentMethods.map((currentMethod) => (
                <option key={`select_${currentMethod.type}`} value={currentMethod.type}>
                  {currentMethod.type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>
            <Translation value="common.from" />
          </Form.Label>
          <Form.Control ref={fromDateRef} type="date" defaultValue={today} onChange={({ target }) => setFromDate(target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <Translation value="common.to" />
          </Form.Label>
          <Form.Control ref={toDateRef} type="date" defaultValue={today} onChange={({ target }) => setToDate(target.value)} />
        </Form.Group>
      </div>
      <div className="buttons-container">
        {!isMembershipFee ? (
          <Button
            variant="success"
            onClick={calculateAmountBetweenDatesAndByPaymentMethod}
            disabled={filterByField !== 'receipt_date' || !filteredPaymentMethod}
          >
            <span role="img" aria-label="summary">
              🧾 <Translation value="buttons.receipt.calculateTotalAmount" />
            </span>
          </Button>
        ) : (
          <Button variant="success" onClick={() => printMembershipFeeSummaryTemplate(allReceipts, fromDate, toDate)}>
            <span role="img" aria-label="summary">
              🖨️ <Translation value="buttons.receipt.printMembershipFeeSummary" />
            </span>
          </Button>
        )}

        <Button variant="primary" onClick={filterReceipts}>
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
        fromDate={formatDate(new Date(fromDate)) || BLANK_DATE}
        toDate={formatDate(new Date(toDate)) || BLANK_DATE}
        filteredPaymentMethod={filteredPaymentMethod}
        printReceipts={() =>
          printReceiptsDetails(
            receiptsForAmountSummary,
            totalAmountPaid,
            filteredPaymentMethod,
            formatDate(new Date(fromDate)),
            formatDate(new Date(toDate))
          )
        }
      />
    </>
  );
};

FilterReceiptsForm.propTypes = {
  allReceipts: PropTypes.array.isRequired,
  receiptsForAmountSummary: PropTypes.array,
  setReceiptsForAmountSummary: PropTypes.func,
  setCurrentReceipts: PropTypes.func.isRequired,
  gridOptions: PropTypes.object.isRequired,
  isMembershipFee: PropTypes.bool,
};

FilterReceiptsForm.defaultProps = {
  receiptsForAmountSummary: [],
  setReceiptsForAmountSummary: () => {},
  isMembershipFee: false,
};

export default FilterReceiptsForm;
