import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-mdl';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// nome cognome numeroricevuta somma datainiziocorso e datascadenzacorso
// filtra per anno -> ricevuta 001/19 , 001/20, 001/21 ...
const columnsDefinition = [
  { headerName: 'Nome Allieva', field: 'Nome' },
  { headerName: 'Cognome Allieva', field: 'Cognome' },
  { headerName: 'Numero Ricevuta', field: 'NumeroRicevuta' },
  { headerName: 'Data Inizio Corso', field: 'DataInizioCorso', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Scadenza Corso', field: 'DataScadenzaCorso', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Somma Euro', field: 'SommaEuro' }
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

function PaginaAllieve() {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  const [rowData, setRowData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/getAllRicevute');
      const body = await result.json();
      setRowData(body);
    };
    fetchData();
  }, []);

  
  const visualizza2019 = () => {
    const NumeroRicevutaFilterComponent = gridOptions.api.getFilterInstance('NumeroRicevuta');

    NumeroRicevutaFilterComponent.setModel({
        type: 'endsWith',
        filter: '/19'
    });

    gridOptions.api.onFilterChanged();
  }

  const visualizza2020 = () => {
    const NumeroRicevutaFilterComponent = gridOptions.api.getFilterInstance('NumeroRicevuta');

    NumeroRicevutaFilterComponent.setModel({
        type: 'endsWith',
        filter: '/20'
    });

    gridOptions.api.onFilterChanged();
  }

  const visualizzaTutte = () => {
    var NumeroRicevutaFilterComponent = gridOptions.api.getFilterInstance('NumeroRicevuta');
    NumeroRicevutaFilterComponent.setModel(null);
    gridOptions.api.onFilterChanged();
  }

  return (
    <>
      <div className="page-body">
        <Button raised ripple id="buttonVisualizza2019" onClick={visualizza2019} style={{ marginBottom: '2em', marginRight: '2em' }}>
          Visualizza 2019
        </Button>
        <Button raised ripple id="buttonVisualizza2020" onClick={visualizza2020} style={{ marginBottom: '2em', marginRight: '2em' }}>
          Visualizza 2020
        </Button>
        <Button raised ripple id="buttonVisualizzaTutteRicevute" onClick={visualizzaTutte} style={{ marginBottom: '2em', marginRight: '2em' }}>
          Visualizza Tutti
        </Button>
        <div className="ag-theme-balham" style={{ height: '40em', width: '100%' }}>
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
    </>
  );
}

export default PaginaAllieve;
