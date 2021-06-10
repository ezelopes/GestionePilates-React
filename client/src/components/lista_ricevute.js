import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import { updateReceipt, deleteReceipt } from '../helpers/api-calls';

const pdfTemplateMaggiorenni = require('../pdfTemplates/pdf-template-maggiorenni');
const pdfTemplateMinorenni = require('../pdfTemplates/pdf-template-minorenni');

const pdfTemplateQuotaAssociativaMaggiorenni = require('../pdfTemplates/pdf-template-quota-associativa-maggiorenni');
const pdfTemplateQuotaAssociativaMinorenni = require('../pdfTemplates/pdf-template-quota-associativa-minorenni');

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
  { headerName: 'Numero Ricevuta', field: 'NumeroRicevuta', checkboxSelection: true, editable: true },
  { headerName: 'Tipo Ricevuta', field: 'TipoRicevuta', editable: true },
  { headerName: 'Data Ricevuta', field: 'DataRicevuta', editable: true, cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Inizio Corso', field: 'DataInizioCorso', editable: true, cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Scadenza Corso', field: 'DataScadenzaCorso', editable: true, cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Somma Euro', field: 'SommaEuro', editable: true },
  { headerName: 'Tipo Pagamento', field: 'TipoPagamento', editable: true }
];

const ListaRicevute = ({ ricevute, allievaInfo }) => {
  const [gridOptions /*setGridOptions*/] = useState(gridOptionsDefault);
  const [columnDefs /*setColumnDefs*/] = useState(columnsDefinition);

  const [selectedReceipt, setSelectedReceipt] = useState();
  const [showDeleteReceiptModal, setShowDeleteReceiptModal] = useState(false);


  useEffect(() => {
    try{
      gridOptions.api.sizeColumnsToFit();
      window.addEventListener('resize', () => { gridOptions.api.sizeColumnsToFit(); })
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stampaRicevute = async () => {    
    try {
      if (!selectedReceipt) return alert('Seleziona Ricevuta per Stamparla');
      let documentDefinition;

      if (allievaInfo.Maggiorenne === 'Maggiorenne' && selectedReceipt.TipoRicevuta === 'Quota') 
        documentDefinition = await pdfTemplateMaggiorenni.default(allievaInfo, selectedReceipt);
      else if (allievaInfo.Maggiorenne === 'Maggiorenne' && selectedReceipt.TipoRicevuta.toUpperCase() === 'QUOTA ASSOCIATIVA')
        documentDefinition = await pdfTemplateQuotaAssociativaMaggiorenni.default(allievaInfo, selectedReceipt);
      else if (allievaInfo.Maggiorenne === 'Minorenne' && selectedReceipt.TipoRicevuta === 'Quota')
        documentDefinition = await pdfTemplateMinorenni.default(allievaInfo, selectedReceipt);
      else if (allievaInfo.Maggiorenne === 'Minorenne' && selectedReceipt.TipoRicevuta.toUpperCase() === 'QUOTA ASSOCIATIVA')
        documentDefinition = await pdfTemplateQuotaAssociativaMinorenni.default(allievaInfo, selectedReceipt);

      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.log(error);
    }
  };

  const onReceiptSelectionChanged = () => {
    const selectedNode = gridOptions.api.getSelectedNodes();
    if (selectedNode.length === 0) return setSelectedReceipt(null);

    setSelectedReceipt(selectedNode[0].data);
  }

  return (
    <>
      <div
        className="ag-theme-balham"
        id="listaRicevute"
        style={{ marginTop: '2em', height: '20em', width: '90%', marginBottom: '2em' }}
      >
        <AgGridReact
          // rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={ricevute}
          onCellValueChanged={({ data }) => updateReceipt(data)}
          onSelectionChanged={onReceiptSelectionChanged}
        ></AgGridReact>
      </div>

      <Button onClick={stampaRicevute}>
        <span role='img' aria-label='receipt'>🧾</span> STAMPA RICEVUTA
      </Button>
      <Button variant='danger' style={{  marginLeft: '2em' }} onClick={ () => { 
        if (!selectedReceipt) return alert('Seleziona Ricevuta per Eliminarla'); 
        setShowDeleteReceiptModal(true)} 
      }>
        <span role='img' aria-label='bin'>🗑️</span> ELIMINA RICEVUTA
      </Button>

      <Modal show={showDeleteReceiptModal} onHide={ () => setShowDeleteReceiptModal(false) } centered>
        <Modal.Header closeButton>
          <Modal.Title> Elimina Ricevuta </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{'maxHeight': 'calc(100vh - 150px)', 'overflowY': 'auto'}}>
            Sei sicura di voler eliminare la ricevuta selezionata?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => { 
            deleteReceipt(selectedReceipt.RicevutaID);
            setShowDeleteReceiptModal(false); } 
          }>
            ELIMINA
          </Button>
          <Button variant="secondary" onClick={() => { setShowDeleteReceiptModal(false) } }>
            CHIUDI
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};

export default ListaRicevute;
