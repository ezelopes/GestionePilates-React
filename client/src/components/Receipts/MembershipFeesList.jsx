import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import FilterReceiptsForm from './FilterReceiptsForm';
import { useReceipt } from './ReceiptContext';

import { gridOptionsDefaultMembershipFee } from '../../helpers/grid.config';

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');

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
  const { allMembershipFees, currentReceipts, setCurrentReceipts } = useReceipt();

  const [gridOptions] = useState(gridOptionsDefaultMembershipFee);

  return (
    <div className="tab-content">
      <FilterReceiptsForm
        allReceipts={allMembershipFees}
        setCurrentReceipts={setCurrentReceipts}
        gridOptions={gridOptions}
        isMembershipFee
      />
      <div className="ag-theme-balham receipts-grid">
        <AgGridReact reactNext gridOptions={gridOptions} columnDefs={columnsDefinition} rowData={currentReceipts} />
      </div>
    </div>
  );
};

export default MembershipFeesList;
