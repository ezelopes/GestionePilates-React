import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import NotFoundPage from './NotFoundPage';

import StudentReceiptsList from '../components/Student/StudentReceiptsList';
import CreateUpdateUserForm from '../components/forms/CreateUpdateUserForm';
import CreateUpdateReceiptForm from '../components/forms/CreateUpdateReceiptForm';
import { StudentProvider } from '../components/Student/StudentContext';
import Divider from '../components/common/Divider';

import { updateStudent, updateRegistrationDate, deleteStudent, createReceipt, getStudentWithReceipts } from '../helpers/apiCalls';
import toastConfig from '../helpers/toast.config';
import { printRegistrationForm } from '../helpers/printPDF';

import { userType } from '../commondata';

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

  useEffect(() => {
    const fetchData = async () => {
      const { student, receipts } = await getStudentWithReceipts(match.params.TaxCode);

      setStudentInfo(student);
      setNewRegistrationDate(student?.RegistrationDate);
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
            <span className="sr-only" />
          </Spinner>
        </div>
      ) : (
        <StudentProvider studentInfo={studentInfo} studentReceipts={studentReceipts} setStudentReceipts={setStudentReceipts}>
          <div className="page-body">
            <div className="student-name-title">
              {studentInfo.Name} {studentInfo.Surname}
            </div>

            <div className="buttons-container">
              <Button onClick={() => printRegistrationForm(studentInfo)}>
                <span role="img" aria-label="module">
                  🖨️ MODULO ISCRIZIONE
                </span>
              </Button>

              <Button variant="warning" onClick={() => setShowUpdateStudentModal(true)}>
                <span role="img" aria-label="update">
                  🔄 AGGIORNA ALLIEVA
                </span>
              </Button>

              <Button variant="warning" onClick={() => setShowRegistrationDateModal(true)}>
                <span role="img" aria-label="update">
                  🔄 AGGIORNA DATA ISCRIZIONE
                </span>
              </Button>

              <Button variant="danger" onClick={() => setShowDeleteStudentModal(true)}>
                <span role="img" aria-label="bin">
                  🗑️ ELIMINA ALLIEVA
                </span>
              </Button>

              <Button variant="secondary" onClick={history.goBack}>
                <span role="img" aria-label="back">
                  🔙 INDIETRO
                </span>
              </Button>
            </div>

            <Divider double />

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
