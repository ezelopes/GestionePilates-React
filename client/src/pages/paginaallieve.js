import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Button } from 'react-mdl';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  {
    headerName: 'Codice Fiscale',
    field: 'CodiceFiscale',
    cellRendererFramework: params => {
      return <Link to={`/paginaallieve/${params.data.CodiceFiscale}`}>{params.value}</Link>;
    }
  },
  { headerName: 'Maggiorenne', field: 'Maggiorenne' },
  { headerName: 'Nome', field: 'Nome' },
  { headerName: 'Cognome', field: 'Cognome' },
  { headerName: 'Citta', field: 'Citta' },
  { headerName: 'Indirizzo', field: 'Indirizzo' },
  { headerName: 'Cellulare', field: 'Cellulare' },
  { headerName: 'Email', field: 'Email' },
  { headerName: 'Data Iscrizione', field: 'DataIscrizione', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Certificato', field: 'DataCertificato', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Nascita', field: 'DataNascita', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Luogo Nascita', field: 'LuogoNascita' },
  { headerName: 'Disciplina', field: 'Disciplina' },
  { headerName: 'Corso', field: 'Corso' },
  { headerName: 'Scuola', field: 'Scuola' },
  { headerName: 'Codice Fiscale Genitore', field: 'CodiceFiscaleGenitore' },
  { headerName: 'Nome Genitore', field: 'NomeGenitore' },
  { headerName: 'Cognome Genitore', field: 'CognomeGenitore' }
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

function PaginaAllieve(/*props*/) {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  const [rowData, setRowData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/getAllieve');
      const body = await result.json();
      setRowData(body);
      localStorage.setItem('listaAllieve', JSON.stringify(body));
    };
    
    if (!localStorage.getItem('listaAllieve') || (localStorage.getItem('listaAllieve') === [])) fetchData();
    else {
      const listaAllieveCached = JSON.parse(localStorage.getItem('listaAllieve'));
      setRowData(listaAllieveCached)
    }
  }, []);

  const visualizzaMaggiorenni = () => {
    const filterInstance = gridOptions.api.getFilterInstance('Maggiorenne');

    filterInstance.setModel({
        type: 'endsWith',
        filter: 'Maggiorenne'
    });

    gridOptions.api.onFilterChanged();
  }

  const visualizzaMinorenni = () => {
    const filterInstance = gridOptions.api.getFilterInstance('Maggiorenne');

    filterInstance.setModel({
        type: 'endsWith',
        filter: 'Minorenne'
    });

    gridOptions.api.onFilterChanged();
  }

  const visualizzaTutti = () => {
    var maggiorenneFilterComponent = gridOptions.api.getFilterInstance('Maggiorenne');
    maggiorenneFilterComponent.setModel(null);
    gridOptions.api.onFilterChanged();
  }

  return (
    <div className="page-body">
      <Button raised ripple id="buttonVisualizzaMaggiorenni" onClick={visualizzaMaggiorenni} style={{ marginBottom: '2em', marginRight: '2em' }}>
        Visualizza Maggiorenni
      </Button>
      <Button raised ripple id="buttonVisualizzaMinorenni" onClick={visualizzaMinorenni} style={{ marginBottom: '2em', marginRight: '2em' }}>
        Visualizza Minorenni
      </Button>
      <Button raised ripple id="buttonVisualizzaTutti" onClick={visualizzaTutti} style={{ marginBottom: '2em', marginRight: '2em' }}>
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
          // onGridReady={this.onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default PaginaAllieve;
