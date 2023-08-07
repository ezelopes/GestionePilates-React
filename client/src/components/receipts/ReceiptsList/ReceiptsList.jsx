import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { useReceipt } from '../ReceiptContext';
import FilterReceiptsForm from '../FilterReceiptsForm';
import PrintExpiringReceiptsForm from '../PrintExpiringReceiptsForm';

import Translation from '../../common/Translation';
import { printSelectedReceipts } from '../../../helpers/printPDF';
import { gridOptionsDefaultReceipts } from '../../../commondata/grid.config';
import { deleteReceipts } from '../../../helpers/apiCalls';
import toastConfig from '../../../commondata/toast.config';

const columnsDefinition = [
  { headerName: 'N° Ricevuta', field: 'ReceiptNumber', checkboxSelection: true, headerCheckboxSelection: true },
  { headerName: 'Nome', field: 'Name' },
  { headerName: 'Cognome', field: 'Surname' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Inizio Corso',
    field: 'CourseStartDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Scadenza Corso',
    field: 'CourseEndDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
  { headerName: 'Tipo Pagamento', field: 'PaymentMethod' },
  {
    headerName: 'Include Quota Associativa',
    field: 'IncludeMembershipFee',
    cellRenderer: (params) => (params.value ? '✅' : ''),
    cellClass: 'ag-grid-cell-centered',
  },
];

const ReceiptsList = () => {
  const { allReceipts, currentReceipts, setCurrentReceipts, refetchReceipts } = useReceipt();

  const [gridOptions] = useState(gridOptionsDefaultReceipts);

  const [receiptsForAmountSummary, setReceiptsForAmountSummary] = useState([]);
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const [showDeleteReceiptsModal, setShowDeleteReceiptsModal] = useState(false);

  const onReceiptSelectionChanged = () => {
    const selectedNodes = gridOptions.api.getSelectedNodes();
    if (selectedNodes.length === 0) {
      return setSelectedReceipts([]);
    }

    const receipts = [];
    selectedNodes.forEach((node) => {
      receipts.push(node.data);
    });

    return setSelectedReceipts(receipts);
  };

  const handleReceiptDelete = async () => {
    const receiptIDs = selectedReceipts.map((receipt) => receipt.ReceiptID);

    const { status, message } = await deleteReceipts(receiptIDs);

    if (status === 200) {
      setCurrentReceipts(currentReceipts.filter(({ ReceiptID }) => !receiptIDs.includes(ReceiptID)));

      // SetAllReceipts(allReceipts.filter(({ ReceiptID }) => !receiptIDs.includes(ReceiptID)));
      refetchReceipts();

      setSelectedReceipts([]);

      toast.success(message, toastConfig);
    } else {
      toast.error(message, toastConfig);
    }

    setShowDeleteReceiptsModal(false);
  };

  useEffect(() => {
    setSelectedReceipts([]);
    setReceiptsForAmountSummary([]);
  }, [currentReceipts]);

  return (
    <>
      <div className="container-fluid">
        <FilterReceiptsForm
          allReceipts={allReceipts}
          receiptsForAmountSummary={receiptsForAmountSummary}
          setCurrentReceipts={setCurrentReceipts}
          setReceiptsForAmountSummary={setReceiptsForAmountSummary}
          gridOptions={gridOptions}
        />
        <div className="ag-theme-alpine ag-grid-custom">
          <AgGridReact
            reactNext
            gridOptions={gridOptions}
            columnDefs={columnsDefinition}
            rowData={currentReceipts}
            onSelectionChanged={onReceiptSelectionChanged}
          />
        </div>

        <div className="buttons-container">
          <Button
            variant="success"
            onClick={() => printSelectedReceipts(selectedReceipts)}
            disabled={selectedReceipts.length < 1}
          >
            <span role="img" aria-label="print-selected">
              🖨️ <Translation value="buttons.receipt.printSelectedReceipts" />
            </span>
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              setShowDeleteReceiptsModal(true);
            }}
            disabled={selectedReceipts.length < 1}
          >
            <span role="img" aria-label="delete-selected">
              🗑️ <Translation value="buttons.receipt.deleteSelectedReceipts" />
            </span>
          </Button>
        </div>
      </div>

      <PrintExpiringReceiptsForm />

      <Modal
        show={showDeleteReceiptsModal}
        onHide={() => setShowDeleteReceiptsModal(false)}
        dialogClassName="update-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.deleteReceiptsHeader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Translation value="modalsContent.deleteReceiptsBody" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleReceiptDelete}>
            <Translation value="buttons.receipt.deleteReceipts" />
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteReceiptsModal(false)}>
            <Translation value="buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceiptsList;
