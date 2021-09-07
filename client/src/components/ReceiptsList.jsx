import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import { updateReceipt, deleteReceipt } from '../helpers/apiCalls';
import CreateReceiptForm from './CreateReceiptForm';

const ReceiptTemplateAdult = require('../pdfTemplates/ReceiptTemplateAdult');
const ReceiptTemplateUnderAge = require('../pdfTemplates/ReceiptTemplateUnderAge');

const MembershipFeeTemplateAdult = require('../pdfTemplates/MembershipFeeTemplateAdult');
const MembershipFeeTemplateUnderAge = require('../pdfTemplates/MembershipFeeTemplateUnderAge');

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
  { headerName: 'Numero Ricevuta', field: 'ReceiptNumber', checkboxSelection: true, editable: true },
  { headerName: 'Tipo Ricevuta', field: 'ReceiptType', editable: true },
  { headerName: 'Data Ricevuta', field: 'ReceiptDate', editable: true, cellRenderer: (params) => (params.value !== 'Invalid date') ? (new Date(params.value)).toLocaleDateString() : '' },
  { headerName: 'Data Inizio Corso', field: 'CourseStartDate', editable: true, cellRenderer: (params) => (params.value !== 'Invalid date') ? (new Date(params.value)).toLocaleDateString() : '' },
  { headerName: 'Data Scadenza Corso', field: 'CourseEndDate', editable: true, cellRenderer: (params) => (params.value !== 'Invalid date') ? (new Date(params.value)).toLocaleDateString() : '' },
  { headerName: 'Somma Euro', field: 'AmountPaid', editable: true },
  { headerName: 'Tipo Pagamento', field: 'PaymentMethod', editable: true }
];

const ReceiptsList = ({ receipts, studentInfo }) => {
  const [gridOptions] = useState(gridOptionsDefault);
  const [columnDefs] = useState(columnsDefinition);

  const [selectedReceipt, setSelectedReceipt] = useState();
  const [showDeleteReceiptModal, setShowDeleteReceiptModal] = useState(false);
  const [showUpdateReceiptModal, setShowUpdateReceiptModal] = useState(false);


  useEffect(() => {
    try{
      gridOptions.api.sizeColumnsToFit();
      window.addEventListener('resize', () => { gridOptions.api.sizeColumnsToFit(); })
    } catch (err) {
      console.log(err);
    }

  }, [])

  const printReceipt = async () => {    
    try {
      if (!selectedReceipt) return alert('Seleziona Ricevuta per Stamparla');
      let documentDefinition;

      if (studentInfo.IsAdult === 'Maggiorenne' && selectedReceipt.ReceiptType === 'Quota') 
        documentDefinition = await ReceiptTemplateAdult.default(studentInfo, selectedReceipt);
      else if (studentInfo.IsAdult === 'Maggiorenne' && selectedReceipt.ReceiptType.toUpperCase() === 'QUOTA ASSOCIATIVA')
        documentDefinition = await MembershipFeeTemplateAdult.default(studentInfo, selectedReceipt);
      else if (studentInfo.IsAdult === 'Minorenne' && selectedReceipt.ReceiptType === 'Quota')
        documentDefinition = await ReceiptTemplateUnderAge.default(studentInfo, selectedReceipt);
      else if (studentInfo.IsAdult === 'Minorenne' && selectedReceipt.ReceiptType.toUpperCase() === 'QUOTA ASSOCIATIVA')
        documentDefinition = await MembershipFeeTemplateUnderAge.default(studentInfo, selectedReceipt);

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

  const onCellChangedEntered = async (data) => {
    await updateReceipt(data)
  }

  const handleUpdateReceiptModal = () => {
    // Reset Form
    setShowUpdateReceiptModal(false)
  }

  return (
    <>
      <div
        className="ag-theme-balham"
        style={{ marginTop: '2em', height: '20em', width: '90%', marginBottom: '2em', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }}
      >
        <AgGridReact
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={receipts}
          onCellValueChanged={({ data }) => onCellChangedEntered(data) }
          onSelectionChanged={onReceiptSelectionChanged}
        ></AgGridReact>
      </div>

      <div className="buttons-container">
        <Button onClick={ async () => await printReceipt() }>
          <span role='img' aria-label='receipt'>🧾</span> STAMPA RICEVUTA
        </Button>
        
        <Button variant='warning' onClick={ () => { 
          if (!selectedReceipt) return alert('Seleziona Ricevuta per Aggiornarla'); 
          setShowUpdateReceiptModal(true)} 
        }>
          <span role='img' aria-label='update'>🔄</span> AGGIORNA RICEVUTA
        </Button>

        <Button variant='danger' onClick={ () => { 
          if (!selectedReceipt) return alert('Seleziona Ricevuta per Eliminarla'); 
          setShowDeleteReceiptModal(true)} 
        }>
          <span role='img' aria-label='bin'>🗑️</span> ELIMINA RICEVUTA
        </Button>
      </div>

      <Modal show={showUpdateReceiptModal} onHide={() => handleUpdateReceiptModal()} dialogClassName="update-student-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title> Aggiorna Ricevuta </Modal.Title>
        </Modal.Header>
        <Modal.Body className="update-student-modal-body">
            <CreateReceiptForm TaxCode={studentInfo.TaxCode} StudentID={studentInfo.StudentID} receiptInfo={selectedReceipt} isForUpdating />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleUpdateReceiptModal() } }>
            CHIUDI
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteReceiptModal} onHide={ () => setShowDeleteReceiptModal(false) } centered>
        <Modal.Header closeButton>
          <Modal.Title> Elimina Ricevuta </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{'maxHeight': 'calc(100vh - 150px)', 'overflowY': 'auto'}}>
            Sei sicura di voler eliminare la ricevuta selezionata?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={async () => { 
            await deleteReceipt(selectedReceipt.ReceiptID);
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

export default ReceiptsList;
