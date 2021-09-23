import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import NotFoundPage from './NotFoundPage';

import CreateUpdateUserForm from '../components/CreateUpdateUserForm';
import StudentReceiptsList from '../components/StudentReceiptsList';
import CreateUpdateReceiptForm from '../components/CreateUpdateReceiptForm';
import { StudentProvider } from '../components/StudentContext';
import Divider from '../components/Divider';

import { updateStudent, updateRegistrationDate, deleteStudent, createReceipt } from '../helpers/apiCalls';
import toastConfig from '../helpers/toast.config';

import { userType } from '../commondata/commondata';

const RegistrationFormTemplate = require('../pdfTemplates/RegistrationFormTemplate');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');

const StudentPage = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({});
  const [studentReceipts, setStudentReceipts] = useState([]);

  const [newRegistrationDate, setNewRegistrationDate] = useState(null);

  const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
  const [showRegistrationDateModal, setShowRegistrationDateModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);

  const history = useHistory();

  const printRegistrationForm = async () => {
    try {
      const documentDefinition = await RegistrationFormTemplate.default(studentInfo);

      pdfMake.createPdf(documentDefinition).open();

      return toast.success('PDF Creato Correttamente', toastConfig);
    } catch (error) {
      return toast.error(`Un errore se e' verificato nello stampare il modulo d'iscrizione`, toastConfig);
    }
  };

  useEffect(() => {
    // TODO: Reduce this to one endpoint call!
    const fetchData = async () => {
      const getStudentResult = await fetch(`/api/student/getSingleStudent/${match.params.TaxCode}`);
      const student = await getStudentResult.json();
      setStudentInfo(student);
      setNewRegistrationDate(student.RegistrationDate);

      const getReceiptsOfStudentResult = await fetch(`/api/receipt/getStudentReceipts/${match.params.TaxCode}`);
      const receipts = await getReceiptsOfStudentResult.json();
      setStudentReceipts(receipts);

      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegistrationDateUpdate = async () => {
    const response = await updateRegistrationDate(studentInfo.StudentID, newRegistrationDate);

    if (response.status === 200) {
      setStudentInfo(response.updatedStudent);

      toast.success(response.message, toastConfig);
    } else {
      toast.error(response.message, toastConfig);
    }
    setShowRegistrationDateModal(false);
  };

  const handleStudentDeletion = async () => {
    const response = await deleteStudent(studentInfo.StudentID);

    if (response.status === 200) {
      setShowDeleteStudentModal(false);
      toast.success(response.message, toastConfig);
      return history.push('/paginaallieve');
    }

    return toast.error(response.message, toastConfig);
  };

  if (!studentInfo) {
    return <NotFoundPage />;
  }

  return (
    <>
      {loading ? (
        <div className="spinnerWrapper">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <StudentProvider
          studentInfo={studentInfo}
          studentReceipts={studentReceipts}
          setStudentReceipts={setStudentReceipts}
        >
          <div className="page-body">
            <div className="student-name-title">
              {studentInfo.Name} {studentInfo.Surname}
            </div>

            <div className="buttons-container">
              <Button onClick={printRegistrationForm}>
                <span role="img" aria-label="module">
                  💾
                </span>{' '}
                MODULO ISCRIZIONE
              </Button>

              <Button variant="warning" onClick={() => setShowUpdateStudentModal(true)}>
                <span role="img" aria-label="update">
                  🔄
                </span>{' '}
                AGGIORNA ALLIEVA
              </Button>

              <Button variant="warning" onClick={() => setShowRegistrationDateModal(true)}>
                <span role="img" aria-label="update">
                  🔄
                </span>{' '}
                AGGIORNA DATA ISCRIZIONE
              </Button>

              <Button variant="danger" onClick={() => setShowDeleteStudentModal(true)}>
                <span role="img" aria-label="bin">
                  🗑️
                </span>{' '}
                ELIMINA ALLIEVA
              </Button>

              <Button variant="secondary" onClick={history.goBack}>
                <span role="img" aria-label="back">
                  🔙
                </span>{' '}
                INDIETRO
              </Button>
            </div>

            <StudentReceiptsList />

            <Divider double />

            <div className="form-wrapper create-receipt-form-wrapper">
              <CreateUpdateReceiptForm isForCreating callback={createReceipt} />
            </div>
          </div>
          <Modal show={showRegistrationDateModal} onHide={() => setShowRegistrationDateModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title> Aggiorna Data Iscrizione </Modal.Title>
            </Modal.Header>
            <Modal.Body className="update-registration-date">
              <input
                type="date"
                defaultValue={studentInfo?.RegistrationDate}
                onChange={({ target }) => setNewRegistrationDate(target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleRegistrationDateUpdate}>
                AGGIORNA
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowRegistrationDateModal(false);
                }}
              >
                CHIUDI
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteStudentModal} onHide={() => setShowDeleteStudentModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title> Elimina Allieva </Modal.Title>
            </Modal.Header>
            <Modal.Body className="delete-student-teacher-modal-body">
              Sei sicura di voler eliminare {studentInfo.Name} {studentInfo.Surname}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleStudentDeletion}>
                ELIMINA
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteStudentModal(false);
                }}
              >
                CHIUDI
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showUpdateStudentModal}
            onHide={() => setShowUpdateStudentModal(false)}
            dialogClassName="update-student-modal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title> Aggiorna Allieva </Modal.Title>
            </Modal.Header>
            <Modal.Body className="update-student-modal-body">
              <CreateUpdateUserForm
                personInfo={studentInfo}
                personType={userType[0].user}
                callback={updateStudent}
                handleModal={setShowUpdateStudentModal}
                setUserInfo={setStudentInfo}
              />
            </Modal.Body>
            <Modal.Footer />
          </Modal>
        </StudentProvider>
      )}
    </>
  );
};

StudentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      TaxCode: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

StudentPage.defaultValue = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      TaxCode: '',
    }),
  }),
};

export default StudentPage;
