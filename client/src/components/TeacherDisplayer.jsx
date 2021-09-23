import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import CreateUpdateUserForm from './CreateUpdateUserForm';
import { TeacherProvider } from './TeacherContext';

import { updateTeacher, deleteTeacher } from '../helpers/apiCalls';
import toastConfig from '../helpers/toast.config';

import { userType } from '../commondata/commondata';

import 'react-toastify/dist/ReactToastify.css';

const RegistrationFormTemplate = require('../pdfTemplates/RegistrationFormTemplate');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TeacherDisplayer = ({ teacherInitialInfo, teachersList, setTeachersList }) => {
  const [teacherInfo, setTeacherInfo] = useState(teacherInitialInfo);
  const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);
  const [showDeleteTeacherModal, setShowDeleteTeacherModal] = useState(false);

  const printRegistrationForm = async () => {
    try {
      const documentDefinition = await RegistrationFormTemplate.default(teacherInfo);
      pdfMake.createPdf(documentDefinition).open();

      return toast.success('Modulo Iscrizione Creato Correttamente', toastConfig);
    } catch (error) {
      console.error(error);
      return toast.error(`Un errore se e' verificato nello stampare il modulo d'iscrizione`, toastConfig);
    }
  };

  const handleTeacherDeletion = async () => {
    const response = await deleteTeacher(teacherInfo.TeacherID);

    if (response.status === 200) {
      const updatedTeacherList = [...teachersList];
      const receiptIndex = teachersList.findIndex((teacher) => teacher.TeacherID === teacherInfo.TeacherID);

      updatedTeacherList.splice(receiptIndex, 1);

      toast.success(response.message, toastConfig);
      setTeachersList(updatedTeacherList);
    } else {
      toast.error(response.message, toastConfig);
    }

    setShowDeleteTeacherModal(false);
  };

  return (
    <TeacherProvider teacherInfo={teacherInfo}>
      <Card>
        <Card.Body>
          <Card.Title>
            <b>
              {teacherInfo.Name} {teacherInfo.Surname}
            </b>
          </Card.Title>
          <Card.Text>
            <b>Codice Fiscale:</b> {teacherInfo.TaxCode}
          </Card.Text>
          <Card.Text>
            <b>Citta e Indirizzo:</b> {teacherInfo.City} - {teacherInfo.Address}
          </Card.Text>
          <Card.Text>
            <b>Cellulare:</b> {teacherInfo.MobilePhone}
          </Card.Text>
          <Card.Text>
            <b>Email:</b> {teacherInfo.Email}
          </Card.Text>
          <Card.Text>
            <b>Luogo e Data Nascita:</b>
            {teacherInfo.BirthPlace} -
            {teacherInfo.DOB !== null ? new Date(teacherInfo.DOB).toLocaleDateString() : 'Non Definito'}
          </Card.Text>
          <Card.Text>
            <b>Data Iscrizione:</b>
            {teacherInfo.RegistrationDate !== null
              ? new Date(teacherInfo.RegistrationDate).toLocaleDateString()
              : 'Non Definito'}
          </Card.Text>
          <Card.Text>
            <b>Scuola:</b> {teacherInfo.School}
          </Card.Text>
          <Card.Text>
            <b>Disciplina:</b> {teacherInfo.Discipline}
          </Card.Text>
          <Card.Text>
            <b>Corso:</b> {teacherInfo.Course}
          </Card.Text>
          <Card.Text>
            <b>Data Scadenza Certificato:</b>
            {teacherInfo.CertificateExpirationDate !== null
              ? new Date(teacherInfo.CertificateExpirationDate).toLocaleDateString()
              : 'Non Definito'}
          </Card.Text>
          <Card.Text>
            <b>Data Scadenza Green Pass:</b>
            {teacherInfo.GreenPassExpirationDate !== null
              ? new Date(teacherInfo.GreenPassExpirationDate).toLocaleDateString()
              : 'Non Definito'}
          </Card.Text>

          <div className="buttons-container">
            <Button variant="success" onClick={() => printRegistrationForm()}>
              {' '}
              Scarica Modulo{' '}
            </Button>
            <Button variant="primary" onClick={() => setShowUpdateTeacherModal(true)}>
              {' '}
              Aggiorna{' '}
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteTeacherModal(true)}>
              {' '}
              Elimina{' '}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showUpdateTeacherModal}
        onHide={() => setShowUpdateTeacherModal(false)}
        dialogClassName="update-teacher-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title> Aggiorna Insegnante </Modal.Title>
        </Modal.Header>
        <Modal.Body className="update-student-teacher-modal-body">
          <CreateUpdateUserForm
            personInfo={teacherInfo}
            personType={userType[1].user}
            callback={updateTeacher}
            handleModal={setShowUpdateTeacherModal}
            setUserInfo={setTeacherInfo}
          />
        </Modal.Body>
        <Modal.Footer />
      </Modal>

      <Modal show={showDeleteTeacherModal} onHide={() => setShowDeleteTeacherModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title> Elimina Insegnante </Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-student-teacher-modal-body">
          Sei sicura di voler eliminare {teacherInfo.Name} {teacherInfo.Surname}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleTeacherDeletion}>
            ELIMINA
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteTeacherModal(false);
            }}
          >
            CHIUDI
          </Button>
        </Modal.Footer>
      </Modal>
    </TeacherProvider>
  );
};

TeacherDisplayer.propTypes = {
  teacherInitialInfo: PropTypes.object.isRequired,
  teachersList: PropTypes.array.isRequired,
  setTeachersList: PropTypes.func.isRequired,
};

export default TeacherDisplayer;
