import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'react-bootstrap';

import Translation from '../common/Translation/Translation';
import formatDate from '../../helpers/formatDateForInputDate';
import { printReceiptsDetails } from '../../helpers/printPDF';
import { gridOptionsFilteredReceipts } from '../../helpers/grid.config';
import { BLANK_DATE } from '../../commondata';

// TODO: Export printReceiptsDetails as a callback and define it one level above

const columnDefs = [
  { headerName: 'N° Ricevuta', field: 'ReceiptNumber' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
];

const FilteredReceiptsModal = ({
  filteredReceipts,
  filteredAmountPaid,
  showFilteredAmountModal,
  setShowFilteredAmountModal,
  filteredPaymentMethod,
  fromDate,
  toDate,
}) => (
  <>
    <Modal show={showFilteredAmountModal} onHide={() => setShowFilteredAmountModal(false)} centered dialogClassName="modal-90vw">
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation
            value="receiptFilterForm.title"
            replace={{
              fromDate: formatDate(new Date(fromDate)) || BLANK_DATE,
              toDate: formatDate(new Date(toDate)) || BLANK_DATE,
              paymentMethod: filteredPaymentMethod,
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="filtered-receipt-modal">
        <Translation
          value="receiptFilterForm.totalAmount"
          replace={{
            totalAmount: filteredAmountPaid,
          }}
        />
        <div className="ag-theme-balham filtered-receipt-grid">
          <AgGridReact
            reactNext
            scrollbarWidth
            rowHeight="45"
            gridOptions={gridOptionsFilteredReceipts}
            columnDefs={columnDefs}
            rowData={filteredReceipts}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() =>
            printReceiptsDetails(
              filteredReceipts,
              filteredAmountPaid,
              filteredPaymentMethod,
              formatDate(new Date(fromDate)),
              formatDate(new Date(toDate))
            )
          }
        >
          <span role="img" aria-label="print-selected">
            🖨️ <Translation value="buttons.print" />
          </span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShowFilteredAmountModal(false);
          }}
        >
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

FilteredReceiptsModal.propTypes = {
  filteredReceipts: PropTypes.array.isRequired,
  filteredAmountPaid: PropTypes.number.isRequired,
  showFilteredAmountModal: PropTypes.bool.isRequired,
  setShowFilteredAmountModal: PropTypes.func.isRequired,
  filteredPaymentMethod: PropTypes.string,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
};

FilteredReceiptsModal.defaultProps = {
  filteredPaymentMethod: '',
};

export default FilteredReceiptsModal;
