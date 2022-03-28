import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-bootstrap';

import FilterReceiptsForm from './FilterReceiptsForm';
import Translation from '../common/Translation/Translation';

import { printSelectedReceipts, printExpiringStudents } from '../../helpers/printPDF';
import { useReceipt } from './ReceiptContext';

import { gridOptionsDefaultReceipts } from '../../helpers/grid.config';

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
  {
    headerName: 'Include Quota Associativa',
    field: 'IncludeMembershipFee',
    cellRenderer: (params) => (params.value ? '✅' : ''),
  },
];

const ReceiptsList = () => {
  const { allReceipts, currentReceipts, setCurrentReceipts } = useReceipt();

  const [gridOptions] = useState(gridOptionsDefaultReceipts);

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
          gridOptions={gridOptions}
          columnDefs={columnsDefinition}
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
        {/* ADD COMBOBOX FOR SELECTING YEAR */}
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
