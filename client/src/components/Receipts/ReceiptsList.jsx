import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-bootstrap';

import FilterReceiptsForm from './FilterReceiptsForm';
import Translation from '../common/Translation/Translation';

import { printSelectedReceipts, printExpiringStudents } from '../../helpers/printPDF';
import { useReceipt } from './ReceiptContext';

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');

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
];

const gridOptionsDefault = {
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

const ReceiptsList = () => {
  const { allReceipts, currentReceipts, setCurrentReceipts } = useReceipt();

  const [gridOptions] = useState(gridOptionsDefault);
  const [columnDefs] = useState(columnsDefinition);

  const [receiptsForAmountSummary, setReceiptsForAmountSummary] = useState([]);

  const [selectedReceipts, setSelectedReceipts] = useState([]);

  const onReceiptSelectionChanged = () => {
    const selectedNodes = gridOptions.api.getSelectedNodes();
    if (selectedNodes.length === 0) {
      return setSelectedReceipts([]);
    }

    const receipts = [];
    selectedNodes.forEach((node) => {
      receipts.push(node.data);
    });

    return setSelectedReceipts(receipts);
  };

  useEffect(() => {
    setSelectedReceipts([]);
    setReceiptsForAmountSummary([]);
  }, [currentReceipts]);

  return (
    <div className="tab-content">
      <FilterReceiptsForm
        allReceipts={allReceipts}
        receiptsForAmountSummary={receiptsForAmountSummary}
        setCurrentReceipts={setCurrentReceipts}
        setReceiptsForAmountSummary={setReceiptsForAmountSummary}
        gridOptions={gridOptions}
      />
      <div className="ag-theme-balham receipts-grid">
        <AgGridReact
          reactNext
          rowMultiSelectWithClick
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={currentReceipts}
          onSelectionChanged={onReceiptSelectionChanged}
        />
      </div>

      <div className="buttons-container">
        <Button variant="success" onClick={() => printSelectedReceipts(selectedReceipts)}>
          <span role="img" aria-label="print-selected">
            🖨️ <Translation value="buttons.receipt.printSelectedReceipts" />
          </span>
        </Button>
        <Button variant="success" onClick={() => printExpiringStudents(currentReceipts)}>
          <span role="img" aria-label="print-selected">
            🖨️ <Translation value="buttons.student.printExpiringStudents" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ReceiptsList;
