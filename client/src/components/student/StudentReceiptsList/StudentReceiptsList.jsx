import React, { useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';

import Translation from '../../common/Translation';
import { printStudentReceipt } from '../../../helpers/printPDF';
import { gridOptionsDefaultStudentReceipts } from '../../../commondata/grid.config';

import { useStudent } from '../StudentContext';
import UpdateReceiptButton from './UpdateReceiptButton/UpdateReceiptButton';
import DeleteReceiptButton from './DeleteReceiptButton/DeleteReceiptButton';

const columnsDefinition = [
  { headerName: 'Numero Ricevuta', field: 'ReceiptNumber', checkboxSelection: true },
  { headerName: 'Tipo Ricevuta', field: 'ReceiptType' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Data Inizio Corso',
    field: 'CourseStartDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Data Scadenza Corso',
    field: 'CourseEndDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
  {
    headerName: 'Tipo Pagamento',
    field: 'PaymentMethod',
    cellRenderer: (params) => params.value || '',
  },
  {
    headerName: 'Include Quota Associativa',
    field: 'IncludeMembershipFee',
    cellRenderer: (params) => (params.value ? 'Si' : 'No'),
  },
];

const StudentReceiptsList = () => {
  const { studentInfo, studentReceipts } = useStudent();

  const [gridOptions] = useState(gridOptionsDefaultStudentReceipts);

  const rowData = useMemo(() => studentReceipts, [studentReceipts]);

  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const onReceiptSelectionChanged = () => {
    const selectedNode = gridOptions.api.getSelectedNodes();

    return setSelectedReceipt(selectedNode[0]?.data || null);
  };

  return (
    <div className="container-fluid">
      <div className="ag-theme-alpine">
        <AgGridReact
          reactNext
          gridOptions={gridOptions}
          columnDefs={columnsDefinition}
          rowData={rowData}
          onSelectionChanged={onReceiptSelectionChanged}
          domLayout="autoHeight"
        />
      </div>

      <div className="buttons-container">
        <Button onClick={async () => printStudentReceipt(selectedReceipt, studentInfo)}>
          <span role="img" aria-label="receipt">
            🖨️ <Translation value="buttons.receipt.printReceipt" />
          </span>
        </Button>

        <UpdateReceiptButton
          key={`update-${selectedReceipt?.ReceiptID}`}
          receipt={selectedReceipt}
          onUpdateCallback={() => setSelectedReceipt(null)}
        />

        <DeleteReceiptButton key={`delete-${selectedReceipt?.ReceiptID}`} receipt={selectedReceipt} />
      </div>
    </div>
  );
};

export default StudentReceiptsList;
