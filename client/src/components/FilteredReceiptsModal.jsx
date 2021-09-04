import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'react-bootstrap'

const AmountPaidSummaryTemplate = require('../pdfTemplates/AmountPaidSummaryTemplate');

const columnDefs = [
    { headerName: 'N° Ricevuta', field: 'ReceiptNumber' },
    { headerName: 'Data Ricevuta', field: 'ReceiptDate', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
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

const reverseDate = date => {
    // date yyyy-mm-dd to dd-mm-yyyy
    if (!date) { return '1900-01-01';}
  
    const dateSplit = date.split('-');
    const year = dateSplit[0];
    const month = dateSplit[1];
    const day = dateSplit[2];
  
    if (day && month && year) return `${day}-${month}-${year}`;
    else return '1900-01-01';
  };

const FilteredReceiptsModal = ({ 
    filteredReceipts,
    filteredTotalAmount,
    showFilteredAmountModal,
    setShowFilteredAmountModal,
    filteredPaymentMethod,
    fromDate,
    toDate
}) => {
    
    const printDetails = async () => {
        const documentDefinition = await AmountPaidSummaryTemplate.default(
            filteredReceipts,
            filteredTotalAmount,
            filteredPaymentMethod,
            reverseDate(fromDate),
            reverseDate(toDate)
        );
        pdfMake.createPdf(documentDefinition).open();
    }
    
    return (
        <>
            <Modal show={showFilteredAmountModal} onHide={ () => setShowFilteredAmountModal(false) } centered dialogClassName="modal-90vw">
                <Modal.Header closeButton>
                    <Modal.Title> Ricevute dal {reverseDate(fromDate)} al {reverseDate(toDate)} (tramite {filteredPaymentMethod}) </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'maxHeight': 'calc(100vh - 150px)', 'overflowY': 'auto'}}>
                    <div>
                        Importo Totale tra le date selezionte: <b> {filteredTotalAmount}€ </b>
                    </div>
                    <div className="ag-theme-balham" style={{ height: '40em', width: '100%' }}>
                        <AgGridReact
                        reactNext={true}
                        scrollbarWidth
                        rowHeight="45"
                        gridOptions={gridOptions}
                        columnDefs={columnDefs}
                        rowData={filteredReceipts}
                        ></AgGridReact>
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