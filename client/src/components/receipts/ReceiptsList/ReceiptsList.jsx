import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-bootstrap';

import { useReceipt } from '../ReceiptContext';
import FilterReceiptsForm from '../FilterReceiptsForm';
import PrintExpiringReceiptsForm from '../PrintExpiringReceiptsForm';

import Translation from '../../common/Translation';
import { printSelectedReceipts } from '../../../helpers/printPDF';
import { gridOptionsDefaultReceipts } from '../../../commondata/grid.config';
import DeleteReceiptsButton from './DeleteReceiptsButton';

const columnsDefinition = [
  { headerName: 'N° Ricevuta', field: 'ReceiptNumber', checkboxSelection: true, headerCheckboxSelection: true },
  { headerName: 'Nome', field: 'Name' },
  { headerName: 'Cognome', field: 'Surname' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Inizio Corso',
    field: 'CourseStartDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Scadenza Corso',
    field: 'CourseEndDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
  { headerName: 'Tipo Pagamento', field: 'PaymentMethod' },
  {
    headerName: 'Include Quota Associativa',
    field: 'IncludeMembershipFee',
    cellRenderer: (params) => (params.value ? '✅' : ''),
    cellClass: 'ag-grid-cell-centered',
  },
];

const ReceiptsList = () => {
  const { allReceipts, currentReceipts, setCurrentReceipts, refetchReceipts } = useReceipt();

  const [gridOptions] = useState(gridOptionsDefaultReceipts);

  const [selectedReceipts, setSelectedReceipts] = useState([]);

  const onReceiptSelectionChanged = () => {
    const selectedNodes = gridOptions.api.getSelectedNodes();

    const receipts = selectedNodes.map(({ data }) => data);

    return setSelectedReceipts(receipts);
  };

  const receiptIDs = selectedReceipts.map((receipt) => receipt.ReceiptID);

  return (
    <>
      <div className="container-fluid">
        <FilterReceiptsForm allReceipts={allReceipts} setCurrentReceipts={setCurrentReceipts} />
        <div className="ag-theme-alpine ag-grid-custom">
          <AgGridReact
            reactNext
            gridOptions={gridOptions}
            columnDefs={columnsDefinition}
            rowData={currentReceipts}
            onSelectionChanged={onReceiptSelectionChanged}
          />
        </div>

        <div className="buttons-container">
          <Button
            variant="success"
            onClick={() => printSelectedReceipts(selectedReceipts)}
            disabled={selectedReceipts.length < 1}
          >
            <span role="img" aria-label="print-selected">
              🖨️ <Translation value="buttons.receipt.printSelectedReceipts" />
            </span>
          </Button>

          <DeleteReceiptsButton
            receiptIDs={receiptIDs}
            onDelete={() => {
              refetchReceipts();

              setSelectedReceipts([]);
            }}
          />
        </div>
      </div>

      <PrintExpiringReceiptsForm />
    </>
  );
};

export default ReceiptsList;
