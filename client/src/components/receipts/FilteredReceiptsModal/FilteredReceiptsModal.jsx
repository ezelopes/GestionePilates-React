import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'react-bootstrap';

import Translation from '../../common/Translation';
import { gridOptionsFilteredReceipts } from '../../../commondata/grid.config';

const columnDefs = [
  { headerName: 'N° Ricevuta', field: 'ReceiptNumber' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
  {
    headerName: 'Include Quota Associativa',
    field: 'IncludeMembershipFee',
    cellRenderer: (params) => (params.value ? '✅' : ''),
    cellClass: 'ag-grid-cell-centered',
  },
];

const FilteredReceiptsModal = ({
  filteredReceipts,
  filteredAmountPaid,
  showFilteredAmountModal,
  setShowFilteredAmountModal,
  filteredPaymentMethod,
  fromDate,
  toDate,
  printReceipts,
}) => (
  <>
    <Modal show={showFilteredAmountModal} onHide={() => setShowFilteredAmountModal(false)} centered dialogClassName="modal-90vw">
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation
            value="receiptFilterForm.title"
            replace={{
              fromDate,
              toDate,
              paymentMethod: filteredPaymentMethod,
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Translation
          value="receiptFilterForm.totalAmount"
          replace={{
            totalAmount: filteredAmountPaid,
          }}
        />
        <div className="ag-theme-alpine ag-grid-custom">
          <AgGridReact reactNext gridOptions={gridOptionsFilteredReceipts} columnDefs={columnDefs} rowData={filteredReceipts} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={printReceipts}>
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
  printReceipts: PropTypes.func,
};

FilteredReceiptsModal.defaultProps = {
  filteredPaymentMethod: '',
  printReceipts: () => {},
};

export default FilteredReceiptsModal;
