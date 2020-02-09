import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
// import Allieva from '../pages/allieva';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  {
    headerName: 'Codice Fiscale',
    field: 'codicefiscale',
    // checkboxSelection: true,
    cellRendererFramework: params => {
      return <Link to={`/paginaallieve/${params.data.codicefiscale}`}>{params.value}</Link>;
    }
  },
  { headerName: 'Nome', field: 'nome' },
  { headerName: 'Cognome', field: 'cognome' },
  { headerName: 'Indirizzo', field: 'indirizzo' },
  { headerName: 'Cellulare', field: 'cellulare' },
  { headerName: 'Email', field: 'email' },
  { headerName: 'Data Iscrizione', field: 'dataiscrizione' },
  { headerName: 'Data Certificato', field: 'datacertificato' },
  { headerName: 'Data Nascita', field: 'datanascita' },
  { headerName: 'Luogo Nascita', field: 'luogonascita' },
  { headerName: 'Disciplina', field: 'disciplina' },
  { headerName: 'Codice Fiscale Genitore', field: 'codicefiscalegenitore' },
  { headerName: 'Nome Genitore', field: 'nomegenitore' },
  { headerName: 'Cognome Genitore', field: 'cognomegenitore' }
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
  // onSelectionChanged: onSelectionChanged
};

// create new component for the Ricevute ag-grid

// function onSelectionChanged() {
//   var selectedRows = gridOptionsDefault.api.getSelectedRows();
//   console.log(selectedRows.length);
//   if (selectedRows.length > 0) console.log(selectedRows[0].codicefiscale);
// }

const ListaAllieve = () => {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  const [rowData /*setRowData*/] = useState(rowDataFromDB);

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

// class ListaAllieve extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       gridOptions: gridOptions,
//       columnDefs: columnDefs,
//       rowData: rowData
//     };
//   }

//   render() {
//     return (
//       <div className="ag-theme-balham" style={{ height: '30em', width: '100%' }}>
//         <AgGridReact
//           // rowSelection="multiple"
//           scrollbarWidth
//           rowHeight="45"
//           gridOptions={this.state.gridOptions}
//           columnDefs={this.state.columnDefs}
//           rowData={this.state.rowData}
//         ></AgGridReact>
//       </div>
//     );
//   }
// }

export default ListaAllieve;
