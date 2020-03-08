const React = require('react');
const { useState } = require('react');
const { Button } = require('react-mdl');
const { AgGridReact } = require('ag-grid-react');
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getBase64ImageFromURL = require('../helpers/get-base64-image');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');

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

const ListaRicevute = ({ ricevute, allievaInfo }) => {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);
  // const [rowData /*setRowData*/] = useState(rowDataFromDB);
  const rowData = ricevute;

  const stampaRicevute = async () => {
    const ricevuteSelezionate = gridOptions.api.getSelectedNodes();
    if (ricevuteSelezionate.length === 0 || ricevuteSelezionate.length > 1) return;
    // console.log(allievaInfo);
    // console.log(ricevuteSelezionate[0]);
    const label_logo = await getBase64ImageFromURL('../images/PILATES_LOGO.png');
    const documentDefinition = {
      content: [
        {
          image: label_logo, // 'data:images/png;base64,' +
          fit: [100, 100]
          // pageBreak: 'after'
        },
        'Hello, this will be the title',
        'And this will be the paragraph :D',
        'What about this sub paragraph? :P'
      ]
    };
    pdfMake.createPdf(documentDefinition).open({}, window);
  };

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
    // const CodiceFiscale = ricevuteSelezionate[0].data.FK_CodiceFiscale;
    // const getRicevuteOfAllievaResult = await fetch(`/api/getRicevuteOfAllieva/${CodiceFiscale}`);
    // const ricevute = await getRicevuteOfAllievaResult.json();
    // setRowData(ricevute);
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
