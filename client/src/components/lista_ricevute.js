const React = require('react');
const { useState } = require('react');
const { Button } = require('react-mdl');
const { AgGridReact } = require('ag-grid-react');
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const pdfTemplateMaggiorenni = require('../helpers/pdf-template-maggiorenni');
const pdfTemplateMinorenni = require('../helpers/pdf-template-minorenni');

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

  const rowData = ricevute;

  const stampaRicevute = async () => {
    const ricevuteSelezionate = gridOptions.api.getSelectedNodes();
    if (ricevuteSelezionate.length === 0 || ricevuteSelezionate.length > 1) return;

    try {
      let documentDefinition;
      if (allievaInfo.Maggiorenne === 'Maggiorenne') {
        documentDefinition = await pdfTemplateMaggiorenni.default(allievaInfo, ricevuteSelezionate[0].data);
      } else {
        documentDefinition = await pdfTemplateMinorenni.default(allievaInfo, ricevuteSelezionate[0].data);
      }
      pdfMake.createPdf(documentDefinition).open({}, window);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminaRicevute = async () => {
    const ricevuteSelezionate = gridOptions.api.getSelectedNodes();
    if (ricevuteSelezionate.length === 0) return;

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
          // rowSelection="multiple"
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

export default ListaRicevute;
