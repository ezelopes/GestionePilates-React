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
  { headerName: 'Numero Ricevuta', field: 'NumeroRicevuta', checkboxSelection: true },
  { headerName: 'Data Inizio', field: 'DataInizio' },
  { headerName: 'Data Scadenza', field: 'DataScadenza' },
  { headerName: 'Somma Euro', field: 'SommaEuro' },
  { headerName: 'Tipo Pagamento', field: 'TipoPagamento' },
  { headerName: 'Codice Fiscale', field: 'FK_CodiceFiscale' }
];

const ListaRicevute = ({ ricevute }) => {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  // const [rowData /*setRowData*/] = useState(rowDataFromDB);
  const rowData = ricevute;
  console.log(rowData);

  return (
    <div className="ag-theme-balham" style={{ marginTop: '2em', height: '20em', width: '90%' }}>
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
