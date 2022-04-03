import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

import NotFoundPage from './NotFoundPage';

import { StudentProvider } from '../components/student/StudentContext';
import StudentReceiptsList from '../components/student/StudentReceiptsList';
import UpsertUserForm from '../components/user/UpsertUserForm';
import UpsertReceiptForm from '../components/receipts/UpsertReceiptForm';
import Divider from '../components/common/Divider';
import Translation from '../components/common/Translation';

import { updateStudent, updateRegistrationDate, deleteStudent, createReceipt, getStudentWithReceipts } from '../helpers/apiCalls';
import toastConfig from '../commondata/toast.config';
import { printRegistrationForm } from '../helpers/printPDF';

import '../styles/student-page.css';

// TODO: EXPORT MODALS INTO NEW COMPONENTS?

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
        <Spinner animation="border" role="status" className="spinner" />
      ) : (
        <StudentProvider studentInfo={studentInfo} studentReceipts={studentReceipts} setStudentReceipts={setStudentReceipts}>
          <>
            <div className="student-name-title">
              {studentInfo.Name} {studentInfo.Surname}
            </div>

            <div className="buttons-container">
              <Button onClick={() => printRegistrationForm(studentInfo)}>
                <span role="img" aria-label="module">
                  🖨️ <Translation value="buttons.student.printRegistrationForm" />
                </span>
              </Button>

              <Button variant="warning" onClick={() => setShowUpdateStudentModal(true)}>
                <span role="img" aria-label="update">
                  🔄 <Translation value="buttons.student.updateStudent" />
                </span>
              </Button>

              <Button variant="warning" onClick={() => setShowRegistrationDateModal(true)}>
                <span role="img" aria-label="update">
                  🔄 <Translation value="buttons.student.updateRegistrationDate" />
                </span>
              </Button>

              <Button variant="danger" onClick={() => setShowDeleteStudentModal(true)}>
                <span role="img" aria-label="bin">
                  🗑️ <Translation value="buttons.student.deleteStudent" />
                </span>
              </Button>

              <Button variant="secondary" onClick={history.goBack}>
                <span role="img" aria-label="back">
                  🔙 <Translation value="common.back" />
                </span>
              </Button>
            </div>

            <Divider double />

            <StudentReceiptsList />

            <Divider double />

            <div className="form-wrapper">
              <UpsertReceiptForm isForCreating callback={createReceipt} />
            </div>
          </>
          <Modal show={showRegistrationDateModal} onHide={() => setShowRegistrationDateModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <Translation value="modalsContent.updateRegistrationDateHeader" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                type="date"
                defaultValue={studentInfo?.RegistrationDate}
                onChange={({ target }) => setNewRegistrationDate(target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleRegistrationDateUpdate}>
                <Translation value="buttons.student.updateStudent" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowRegistrationDateModal(false);
                }}
              >
                <Translation value="buttons.close" />
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteStudentModal} onHide={() => setShowDeleteStudentModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <Translation value="modalsContent.deleteStudentHeader" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Translation
                value="modalsContent.deleteConfirmationBody"
                replace={{ fullname: `${studentInfo.Name} ${studentInfo.Surname}` }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleStudentDeletion}>
                <Translation value="buttons.student.deleteStudent" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteStudentModal(false);
                }}
              >
                <Translation value="buttons.close" />
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showUpdateStudentModal}
            onHide={() => setShowUpdateStudentModal(false)}
            dialogClassName="update-modal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <Translation value="modalsContent.updateStudentHeader" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UpsertUserForm
                personInfo={studentInfo}
                isStudent
                callback={updateStudent}
                handleModal={setShowUpdateStudentModal}
                setUserInfo={setStudentInfo}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowUpdateStudentModal(false);
                }}
              >
                <Translation value="buttons.close" />
              </Button>
            </Modal.Footer>
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
