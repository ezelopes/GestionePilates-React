import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'react-bootstrap';

import Translation from '../../common/Translation';
import { gridOptionsFilteredReceipts as gridOptions } from '../../../commondata/grid.config';
import { printReceiptsDetails } from '../../../helpers/printPDF';

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

const FilteredReceiptsModal = ({ receipts, amount, showModal, toggleShowModal, paymentMethod, fromDate, toDate }) => (
  <>
    <Modal show={showModal} onHide={toggleShowModal} centered dialogClassName="modal-90vw">
      <Modal.Header closeButton>
        <Modal.Title>
          <Translation
            value="receiptFilterForm.title"
            replace={{
              fromDate,
              toDate,
              paymentMethod,
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Translation
          value="receiptFilterForm.totalAmount"
          replace={{
            totalAmount: amount,
          }}
        />
        <div className="ag-theme-alpine ag-grid-custom">
          <AgGridReact reactNext gridOptions={gridOptions} columnDefs={columnDefs} rowData={receipts} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => printReceiptsDetails(receipts, amount, paymentMethod, fromDate, toDate)}>
          <span role="img" aria-label="print-selected">
            🖨️ <Translation value="buttons.print" />
          </span>
        </Button>
        <Button variant="secondary" onClick={toggleShowModal}>
          <Translation value="buttons.close" />
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

FilteredReceiptsModal.propTypes = {
  receipts: PropTypes.array.isRequired,
  amount: PropTypes.number.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
  paymentMethod: PropTypes.string,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
};

FilteredReceiptsModal.defaultProps = {
  paymentMethod: '',
};

export default FilteredReceiptsModal;
