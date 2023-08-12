import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

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

const MembershipFeesList = ({ receipts }) => {
  const [currentReceipts, setCurrentReceipts] = useState(receipts);

  return (
    <div className="container-fluid">
      <FilterSubscriptionFeesForm
        allMembershipFees={receipts}
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

MembershipFeesList.propTypes = {
  /**
   * List of all membership receipts.
   */
  receipts: PropTypes.array.isRequired,
};

export default MembershipFeesList;
