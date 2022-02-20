import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'react-bootstrap';

import formatDate from '../../helpers/formatDateForInputDate';
import { printReceiptsDetails } from '../../helpers/printPDF';

const columnDefs = [
  { headerName: 'N° Ricevuta', field: 'ReceiptNumber' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
];

const gridOptions = {
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    cellStyle: { fontSize: '1.5em' },
    flex: 10,
  },
  rowSelection: 'single',
};

const BLANK_DATE = '______-______-________';

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
          Ricevute dal {formatDate(new Date(fromDate)) || BLANK_DATE} al {formatDate(new Date(toDate)) || BLANK_DATE} (tramite
          {` ${filteredPaymentMethod}`})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="filtered-receipt-modal">
        <div>
          Importo Totale tra le date selezionte: <b> {filteredAmountPaid}€ </b>
        </div>
        <div className="ag-theme-balham filtered-receipt-grid">
          <AgGridReact
            reactNext
            scrollbarWidth
            rowHeight="45"
            gridOptions={gridOptions}
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
            🖨️ Stampa
          </span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShowFilteredAmountModal(false);
          }}
        >
          Chiudi
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
