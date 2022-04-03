import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';

import Translation from '../../common/Translation';
import { getTranslation } from '../../common/Translation/helpers';
import UpsertReceiptForm from '../../receipts/UpsertReceiptForm';
import { updateReceipt, deleteReceipt } from '../../../helpers/apiCalls';
import { printStudentReceipt } from '../../../helpers/printPDF';
import toastConfig from '../../../commondata/toast.config';
import { gridOptionsDefaultStudentReceipts } from '../../../commondata/grid.config';

import { useStudent } from '../StudentContext';

const columnsDefinition = [
  { headerName: 'Numero Ricevuta', field: 'ReceiptNumber', checkboxSelection: true },
  { headerName: 'Tipo Ricevuta', field: 'ReceiptType' },
  {
    headerName: 'Data Ricevuta',
    field: 'ReceiptDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Data Inizio Corso',
    field: 'CourseStartDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Data Scadenza Corso',
    field: 'CourseEndDate',
    cellRenderer: (params) => (params.value ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Somma Euro', field: 'AmountPaid' },
  { headerName: 'Tipo Pagamento', field: 'PaymentMethod' },
  {
    headerName: 'Include Quota Associativa',
    field: 'IncludeMembershipFee',
    cellRenderer: (params) => (params.value ? 'Si' : 'No'),
  },
];

const StudentReceiptsList = () => {
  const { studentInfo, studentReceipts, setStudentReceipts } = useStudent();

  const [gridOptions] = useState(gridOptionsDefaultStudentReceipts);
  const [rowData, setRowData] = useState(studentReceipts);

  const [selectedReceipt, setSelectedReceipt] = useState();
  const [showDeleteReceiptModal, setShowDeleteReceiptModal] = useState(false);
  const [showUpdateReceiptModal, setShowUpdateReceiptModal] = useState(false);

  useEffect(() => {
    setRowData(studentReceipts);
  }, [studentReceipts]);

  const onReceiptSelectionChanged = () => {
    const selectedNode = gridOptions.api.getSelectedNodes();
    if (selectedNode.length === 0) {
      return setSelectedReceipt(null);
    }

    return setSelectedReceipt(selectedNode[0].data);
  };

  const handleDeleteReceipt = async () => {
    const response = await deleteReceipt(selectedReceipt.ReceiptID);

    if (response.status === 200) {
      const updatedStudentReceipts = [...studentReceipts];
      const receiptIndex = studentReceipts.findIndex((receipt) => receipt.ReceiptID === selectedReceipt.ReceiptID);

      updatedStudentReceipts.splice(receiptIndex, 1);

      toast.success(response.message, toastConfig);
      setStudentReceipts(updatedStudentReceipts);
    } else {
      toast.error(response.message, toastConfig);
    }

    setShowDeleteReceiptModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="ag-theme-alpine">
        <AgGridReact
          reactNext
          gridOptions={gridOptions}
          columnDefs={columnsDefinition}
          rowData={rowData}
          onSelectionChanged={onReceiptSelectionChanged}
          domLayout="autoHeight"
        />
      </div>

      <div className="buttons-container">
        <Button onClick={async () => printStudentReceipt(selectedReceipt, studentInfo)}>
          <span role="img" aria-label="receipt">
            🖨️ <Translation value="buttons.receipt.printReceipt" />
          </span>
        </Button>

        <Button
          variant="warning"
          onClick={() => {
            if (!selectedReceipt) {
              return toast.error(getTranslation('toast.error.noReceiptSelectedForUpdate'), toastConfig);
            }
            return setShowUpdateReceiptModal(true);
          }}
        >
          <span role="img" aria-label="update">
            🔄 <Translation value="buttons.receipt.updateReceipt" />
          </span>
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            if (!selectedReceipt) {
              return toast.error(getTranslation('toast.error.noReceiptSelectedForDelete'), toastConfig);
            }
            return setShowDeleteReceiptModal(true);
          }}
        >
          <span role="img" aria-label="bin">
            🗑️ <Translation value="buttons.receipt.deleteReceipt" />
          </span>
        </Button>
      </div>

      <Modal
        show={showUpdateReceiptModal}
        onHide={() => setShowUpdateReceiptModal(false)}
        dialogClassName="update-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.updateReceiptHeader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpsertReceiptForm receiptInfo={selectedReceipt} callback={updateReceipt} handleModal={setShowUpdateReceiptModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowUpdateReceiptModal(false);
            }}
          >
            <Translation value="buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteReceiptModal} onHide={() => setShowDeleteReceiptModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Translation value="modalsContent.deleteReceiptHeader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Translation value="modalsContent.deleteReceiptBody" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteReceipt}>
            <Translation value="buttons.receipt.deleteReceipt" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteReceiptModal(false);
            }}
          >
            <Translation value="buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentReceiptsList;
