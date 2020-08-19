import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  { headerName: 'Codice Fiscale', field: 'CodiceFiscale' },
  { headerName: 'Nome', field: 'Nome' },
  { headerName: 'Cognome', field: 'Cognome' },
  { headerName: 'Citta', field: 'Citta' },
  { headerName: 'Indirizzo', field: 'Indirizzo' },
  { headerName: 'Cellulare', field: 'Cellulare' },
  { headerName: 'Email', field: 'Email' },
  { headerName: 'Data Iscrizione', field: 'DataIscrizione' },
  { headerName: 'Data Certificato', field: 'DataCertificato' },
  { headerName: 'Data Nascita', field: 'DataNascita' },
  { headerName: 'Luogo Nascita', field: 'LuogoNascita' },
  { headerName: 'Disciplina', field: 'Disciplina' },
  { headerName: 'Corso', field: 'Corso' },
];

const gridOptionsDefault = {
  masterDetail: true,
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    cellStyle: { fontSize: '1.5em' }
  },
  rowSelection: 'single'
};

function InsegnantiPage(props) {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  const [rowData, setRowData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/getInsegnanti');
      const body = await result.json();
      setRowData(body);
    };
    fetchData();
  }, []);

  return (
    <div className="page-body">
      <div className="ag-theme-balham" style={{ height: '30em', width: '100%' }}>
        <AgGridReact
          reactNext={true}
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={rowData}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default InsegnantiPage;
