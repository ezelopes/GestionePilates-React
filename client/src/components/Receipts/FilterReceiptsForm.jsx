import { Button, Form } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import FilteredReceiptsModal from './FilteredReceiptsModal';
import formatDate from '../../helpers/formatDateForInputDate';
import orderReceiptsBasedOnReceiptNumber from '../../helpers/orderReceiptsBasedOnReceiptNumber';
import { printMembershipFeeSummaryTemplate } from '../../helpers/printPDF';
import toastConfig from '../../helpers/toast.config';

const paymentMethods = [null, 'Contanti', 'Assegno', 'Bonifico'];
const filterFields = [
  { field: 'receipt_date', description: 'Data Ricevuta' },
  { field: 'course_date', description: 'Data Inizio - Scadenza Corso' },
];

// TODO: FIX FILTER FUNCTIONS !!!! (AND ESLINT PLS)

const validateDateBetweenTwoDates = (fromDateValidation, toDateValidation, givenDate) =>
  new Date(givenDate) <= new Date(toDateValidation) && new Date(givenDate) >= new Date(fromDateValidation);

const validateCourseDatesBetweenTwoDates = (fromDateValidation, toDateValidation, CourseStartDate, CourseEndDate) =>
  new Date(CourseStartDate) >= new Date(fromDateValidation) && new Date(CourseEndDate) <= new Date(toDateValidation);

const printMembershipFeeSummaryByMonth = (allReceipts, fromDate, toDate) => {
  const receipts = allReceipts.filter(({ ReceiptDate }) => validateDateBetweenTwoDates(fromDate, toDate, ReceiptDate));

  return printMembershipFeeSummaryTemplate(receipts, formatDate(new Date(fromDate)), formatDate(new Date(toDate)));
};

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
        ? validateDateBetweenTwoDates(fromDate, toDate, ReceiptDate)
        : validateCourseDatesBetweenTwoDates(fromDate, toDate, CourseStartDate, CourseEndDate)
    );

    if (!filteredPaymentMethod) {
      return setCurrentReceipts(receiptsWithDateFilter);
    }

    const receiptsWithPaymentAndDateFilters = receiptsWithDateFilter.filter(({ PaymentMethod }) =>
      PaymentMethod.includes(filteredPaymentMethod)
    );

    return setCurrentReceipts(receiptsWithPaymentAndDateFilters);
  };

  const calculateAmountBetweenDatesAndByPaymentMethod = () => {
    if (filterByField !== 'receipt_date') {
      return toast.error(`Calcolo dell'importo non si puo' effetturare con il filtro impostato!`, toastConfig);
    }

    if (!filteredPaymentMethod) {
      return toast.error('Seleziona Tipo di Pagamento!', toastConfig);
    }

    const receipts = allReceipts.filter(
      ({ ReceiptDate, PaymentMethod }) =>
        validateDateBetweenTwoDates(fromDate, toDate, ReceiptDate) && PaymentMethod.includes(filteredPaymentMethod)
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
            <Form.Label> Filtra per: </Form.Label>
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
            <Form.Label> Seleziona Tipo Pagamento: </Form.Label>
            <Form.Control
              ref={selectPaymentMethodRef}
              as="select"
              onChange={({ target }) => setFilteredPaymentMethod(target.value)}
            >
              {paymentMethods.map((method) => (
                <option key={`select_${method}`} value={method}>
                  {method}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label> Da: </Form.Label> <br />
          <input ref={fromDateRef} type="date" defaultValue={today} onChange={({ target }) => setFromDate(target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label> A: </Form.Label> <br />
          <input ref={toDateRef} type="date" defaultValue={today} onChange={({ target }) => setToDate(target.value)} />
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
              🧾 Calcola Importo Totale
            </span>
          </Button>
        ) : (
          <Button variant="success" onClick={() => printMembershipFeeSummaryByMonth(allReceipts, fromDate, toDate)}>
            <span role="img" aria-label="summary">
              🖨️ Stampa Riepilogo Quote Associative
            </span>
          </Button>
        )}

        <Button variant="primary" onClick={filterReceipts}>
          <span role="img" aria-label="filter">
            🔎 Filtra
          </span>
        </Button>

        <Button variant="danger" onClick={clearFilters}>
          <span role="img" aria-label="remove-filters">
            🗑️ Rimuovi Filtri
          </span>
        </Button>
      </div>

      <FilteredReceiptsModal
        showFilteredAmountModal={showFilteredAmountModal}
        setShowFilteredAmountModal={setShowFilteredAmountModal}
        filteredAmountPaid={totalAmountPaid}
        filteredReceipts={receiptsForAmountSummary}
        fromDate={fromDate}
        toDate={toDate}
        filteredPaymentMethod={filteredPaymentMethod}
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
