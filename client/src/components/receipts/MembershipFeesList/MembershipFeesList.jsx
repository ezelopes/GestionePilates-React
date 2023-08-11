import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { useReceipt } from '../ReceiptContext';

import { gridOptionsDefaultMembershipFee } from '../../../commondata/grid.config';
import FilterSubscriptionFeesForm from './FilterSubscriptionFeesForm';

const columnsDefinition = [
  { headerName: 'N° Ricevuta', field: 'ReceiptNumber' },
  { headerName: 'Nome', field: 'Name' },
  { headerName: 'Cognome', field: 'Surname' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
];

const MembershipFeesList = () => {
  const { allMembershipFees } = useReceipt();

  const [currentReceipts, setCurrentReceipts] = useState(allMembershipFees);

  return (
    <div className="container-fluid">
      <FilterSubscriptionFeesForm
        allMembershipFees={allMembershipFees}
        currentReceipts={currentReceipts}
        setCurrentReceipts={setCurrentReceipts}
      />
      <div className="ag-theme-alpine ag-grid-custom">
        <AgGridReact
          reactNext
          gridOptions={gridOptionsDefaultMembershipFee}
          columnDefs={columnsDefinition}
          rowData={currentReceipts}
        />
      </div>
    </div>
  );
};

export default MembershipFeesList;
