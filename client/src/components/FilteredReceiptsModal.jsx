import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'react-bootstrap'

import formatDate from '../helpers/formatDateForInputDate';

const AmountPaidSummaryTemplate = require('../pdfTemplates/AmountPaidSummaryTemplate');

const columnDefs = [
    { headerName: 'N° Ricevuta', field: 'ReceiptNumber' },
    { headerName: 'Data Ricevuta', field: 'ReceiptDate', cellRenderer: (params) => params.value ? new Date(params.value).toLocaleDateString() : '' },
    { headerName: 'Somma Euro', field: 'AmountPaid' }
]

const gridOptions = {
    masterDetail: true,
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: { fontSize: '1.5em' },
      flex: 10
    },
    rowSelection: 'single'
};

const BLANK_DATE = '______-______-________';

const FilteredReceiptsModal = ({ 
    filteredReceipts,
    filteredAmountPaid,
    showFilteredAmountModal,
    setShowFilteredAmountModal,
    filteredPaymentMethod,
    fromDate,
    toDate
}) => {
    
    const printDetails = async () => {
        const documentDefinition = await AmountPaidSummaryTemplate.default(
            filteredReceipts,
            filteredAmountPaid,
            filteredPaymentMethod,
            formatDate(new Date(fromDate)),
            formatDate(new Date(toDate))
        );
        pdfMake.createPdf(documentDefinition).open();
    }
    
    return (
        <>
            <Modal show={showFilteredAmountModal} onHide={ () => setShowFilteredAmountModal(false) } centered dialogClassName="modal-90vw">
                <Modal.Header closeButton>
                    <Modal.Title> 
                        Ricevute dal {formatDate(new Date(fromDate)) || BLANK_DATE } 
                        {' '} al {formatDate(new Date(toDate)) || BLANK_DATE} 
                        {' '} (tramite {filteredPaymentMethod})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="filtered-receipt-modal">
                    <div>
                        Importo Totale tra le date selezionte: <b> {filteredAmountPaid}€ </b>
                    </div>
                    <div className="ag-theme-balham filtered-receipt-grid">
                        <AgGridReact
                            reactNext={true}
                            scrollbarWidth
                            rowHeight="45"
                            gridOptions={gridOptions}
                            columnDefs={columnDefs}
                            rowData={filteredReceipts}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={printDetails}>
                    STAMPA
                    </Button>
                    <Button variant="secondary" onClick={() => { setShowFilteredAmountModal(false) } }>
                    CHIUDI
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FilteredReceiptsModal;