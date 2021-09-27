import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import FilterReceiptsForm from './FilterReceiptsForm';

import 'react-toastify/dist/ReactToastify.css';

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

const gridOptionsDefault = {
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    cellStyle: { fontSize: '1.5em' },
    flex: 10,
  },
};

const MembershipFeesList = ({ allMembershipFees, currentMembershipFees, setCurrentMembershipFees }) => {
  const [gridOptions] = useState(gridOptionsDefault);
  const [columnDefs] = useState(columnsDefinition);

  return (
    <div className="tab-content">
      <FilterReceiptsForm
        allReceipts={allMembershipFees}
        setCurrentReceipts={setCurrentMembershipFees}
        gridOptions={gridOptions}
        isMembershipFee
      />
      {/* Receipts */}
      <div className="ag-theme-balham receipts-grid">
        <AgGridReact
          reactNext
          rowMultiSelectWithClick
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={currentMembershipFees}
        />
      </div>
    </div>
  );
};

MembershipFeesList.propTypes = {
  allMembershipFees: PropTypes.array.isRequired,
  currentMembershipFees: PropTypes.array.isRequired,
  setCurrentMembershipFees: PropTypes.func.isRequired,
};

export default MembershipFeesList;
