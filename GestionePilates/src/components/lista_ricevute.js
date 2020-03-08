import React, { useState } from 'react';
import { Button } from 'react-mdl';
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

  const stampaRicevute = () => {};
  const eliminaRicevute = async () => {
    const ricevuteSelezionate = gridOptions.api.getSelectedNodes();
    if (ricevuteSelezionate.length === 0) return; // alert('Nessuna Ricevuta Selezionata')

    const idRicevuteSelezionate = ricevuteSelezionate.map(ricevuta => {
      return ricevuta.data.RicevutaID;
    });

    const response = await fetch('/api/eliminaRicevute', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + idToken
      },
      body: JSON.stringify({
        RicevuteId: idRicevuteSelezionate
      })
    });
    const responseParsed = await response.json();
    alert(responseParsed.message);
  };

  return (
    <>
      <div
        className="ag-theme-balham"
        id="listaRicevute"
        style={{ marginTop: '2em', height: '20em', width: '90%' }}
      >
        <AgGridReact
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={rowData}
        ></AgGridReact>
      </div>

      <Button raised ripple id="buttonStampaRicevute" onClick={stampaRicevute} style={{ marginTop: '2em' }}>
        Stampa Ricevuta
      </Button>
      <Button
        raised
        ripple
        id="buttonEliminaRicevute"
        onClick={eliminaRicevute}
        style={{ marginTop: '2em', marginLeft: '2em' }}
      >
        Elimina Ricevuta
      </Button>
    </>
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
