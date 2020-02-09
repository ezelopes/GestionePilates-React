import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const gridOptionsDefault = {
  masterDetail: true,
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    cellStyle: { fontSize: '1.5em' }
  }
};

const columnsDefinition = [
  { headerName: 'Numero Ricevuta', field: 'numeroricevuta', checkboxSelection: true },
  { headerName: 'Data Inizio', field: 'datainizio' },
  { headerName: 'Data Scadenza', field: 'datascadenza' },
  { headerName: 'Somma Euro', field: 'sommaeuro' },
  { headerName: 'Codice Fiscale', field: 'codicefiscale' }
];

const rowDataFromDB = [
  {
    datainizio: '1/1/20',
    datascadenza: '1/3/20',
    numeroricevuta: '100',
    sommaeuro: '85',
    codicefiscale: 'LPS1234LSP1234LP'
  },
  {
    datainizio: '1/1/20',
    datascadenza: '1/3/20',
    numeroricevuta: '101',
    sommaeuro: '90',
    codicefiscale: 'RXN1234RXN1234RX'
  },
  {
    datainizio: '1/1/20',
    datascadenza: '1/3/20',
    numeroricevuta: '102',
    sommaeuro: '95',
    codicefiscale: 'SRG1234SRG1234SR'
  }
];

// create new component for the Ricevute ag-grid

const ListaRicevute = () => {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  const [rowData /*setRowData*/] = useState(rowDataFromDB);

  return (
    <div className="ag-theme-balham" style={{ marginTop: '2em', height: '15em', width: '70%' }}>
      <AgGridReact
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

// class ListaRicevute extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       gridOptions: {
//         masterDetail: true,
//         defaultColDef: {
//           resizable: true,
//           sortable: true,
//           filter: true,
//           cellStyle: { fontSize: '1.5em' }
//         },
//         columnDefs: columnDefs
//         // rowData: rowData
//       }
//     };
//   }

//   render() {
//     return (
//       <div className="ag-theme-balham" style={{ marginTop: '2em', height: '15em', width: '70%' }}>
//         <AgGridReact
//           rowSelection="multiple"
//           scrollbarWidth
//           rowHeight="45"
//           gridOptions={this.state.gridOptions}
//           columnDefs={this.state.gridOptions.columnDefs}
//           rowData={this.state.gridOptions.rowData}
//         ></AgGridReact>
//       </div>
//     );
//   }
// }

export default ListaRicevute;
