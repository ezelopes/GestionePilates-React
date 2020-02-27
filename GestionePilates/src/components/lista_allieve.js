import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
// import Allieva from '../pages/allieva';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  {
    headerName: 'Codice Fiscale',
    field: 'CodiceFiscale',
    // checkboxSelection: true,
    cellRendererFramework: params => {
      return <Link to={`/paginaallieve/${params.data.CodiceFiscale}`}>{params.value}</Link>;
    }
  },
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
  { headerName: 'Codice Fiscale Genitore', field: 'CodiceFiscaleGenitore' },
  { headerName: 'Nome Genitore', field: 'NomeGenitore' },
  { headerName: 'Cognome Genitore', field: 'CognomeGenitore' }
];

const rowDataFromDB = [
  {
    codicefiscale: 'LPS1234LSP1234LP',
    nome: 'Ezequiel',
    cognome: 'Lopes',
    citta: 'Basingstoke'
  },
  { codicefiscale: 'RXN1234RXN1234RX', nome: 'Roxana', cognome: 'Carro', citta: 'Stezzano' },
  { codicefiscale: 'SRG1234SRG1234SR', nome: 'Sergio', cognome: 'Lopes', citta: 'Stezzano' },
  { codicefiscale: 'RCO1234RCO1234RC', nome: 'Rocio', cognome: 'Lopes', citta: 'Portsmouth' }
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

const ListaAllieve = () => {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  const [rowData, setRowData] = useState(rowDataFromDB);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/getAllieve');
      const body = await result.json();
      setRowData(body);
    };
    fetchData();
  }, []);

  return (
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
  );
};

export default ListaAllieve;
