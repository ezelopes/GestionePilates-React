import React from 'react';

import { Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';

import Translation from '../../common/Translation';
import { isDateBetweenTwoDates, formatDate } from '../../../helpers/dates';
import { printMembershipFeeSummaryTemplate } from '../../../helpers/printPDF';
import ControlledFormDateField from '../../form/ControlledFormDateField';

const FilterSubscriptionFeesForm = ({ allMembershipFees, currentReceipts, setCurrentReceipts }) => {
  const today = formatDate(new Date(), true);

  const form = useForm({ defaultValues: { fromDate: today, toDate: today } });

  const { handleSubmit, reset } = form;

  const filterReceipts = (formData) => {
    const receiptsWithDateFilter = allMembershipFees.filter(({ ReceiptDate }) =>
      isDateBetweenTwoDates(formData?.fromDate, formData?.toDate, ReceiptDate)
    );

    return setCurrentReceipts(receiptsWithDateFilter);
  };

  const clearFilters = () => {
    reset();

    setCurrentReceipts(allMembershipFees);
  };

  const handlePrint = (formData) => {
    printMembershipFeeSummaryTemplate(currentReceipts, formData?.fromDate, formData?.toDate);
  };

  return (
    <FormProvider {...form}>
      <form id="subscription-fees-form" onSubmit={handleSubmit(filterReceipts)}>
        <div className="py-0 px-3">
          <Row style={{ gap: '10px' }}>
            <ControlledFormDateField name="fromDate" label={<Translation value="common.from" />} />

            <ControlledFormDateField name="toDate" label={<Translation value="common.to" />} />
          </Row>
          <Row className="buttons-container">
            <Button variant="success" onClick={handleSubmit(handlePrint)}>
              <span role="img" aria-label="summary">
                🖨️ <Translation value="buttons.receipt.printMembershipFeeSummary" />
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
          </Row>
        </div>
      </form>
    </FormProvider>
  );
};

FilterSubscriptionFeesForm.propTypes = {
  /**
   * List of membership fees.
   */
  allMembershipFees: PropTypes.array.isRequired,
  /**
   * List of filtered membership fees.
   */
  currentReceipts: PropTypes.array.isRequired,
  /**
   * Callback to set the current membership fees.
   */
  setCurrentReceipts: PropTypes.func.isRequired,
};

export default FilterSubscriptionFeesForm;
