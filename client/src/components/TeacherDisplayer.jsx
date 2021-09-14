import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap'
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import CreateUpdateUserForm from './CreateUpdateUserForm'

import { updateTeacher, deleteTeacher } from '../helpers/apiCalls';

const RegistrationFormTemplate = require('../pdfTemplates/RegistrationFormTemplate');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TeacherDisplayer = ({ teacherInfo }) => {
    const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);
    const [showDeleteTeacherModal, setShowDeleteTeacherModal] = useState(false);

    const handleUpdateTeacherModal = () => {
        setShowUpdateTeacherModal(false);
    }

    const stampaModuloIscrizione = async () => {
        try {
            const documentDefinition = await RegistrationFormTemplate.default(teacherInfo);
            pdfMake.createPdf(documentDefinition).open();
        } catch (error) {
            console.log(error);
        }
    };

    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>
              <b>{teacherInfo.Name} {teacherInfo.Surname}</b>
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
              <b>Luogo e Data Nascita:</b> {teacherInfo.BirthPlace} - { teacherInfo.DOB !== null ? new Date(teacherInfo.DOB).toLocaleDateString(): 'Non Definito' }
            </Card.Text>
            <Card.Text>
              <b>Data Iscrizione:</b> { teacherInfo.RegistrationDate !== null ? new Date(teacherInfo.RegistrationDate).toLocaleDateString(): 'Non Definito' }
            </Card.Text>
            <Card.Text>
              <b>Disciplina:</b> {teacherInfo.Discipline}
            </Card.Text>
            <Card.Text>
              <b>Corso:</b> {teacherInfo.Course}
            </Card.Text>
            <Card.Text>
              <b>Data Scadenza Certificato:</b> { teacherInfo.CertificateExpirationDate !== null ? new Date(teacherInfo.CertificateExpirationDate).toLocaleDateString(): 'Non Definito' }
            </Card.Text>
            <Card.Text>
              <b>Data Scadenza Green Pass:</b> { teacherInfo.GreenPassExpirationDate !== null ? new Date(teacherInfo.GreenPassExpirationDate).toLocaleDateString(): 'Non Definito' }
            </Card.Text>

            <div className="buttons-container">
              <Button variant="success" onClick={ () => stampaModuloIscrizione()}> Scarica Modulo </Button>
              <Button variant="primary" onClick={ () => setShowUpdateTeacherModal(true) }> Aggiorna </Button>
              <Button variant="danger" onClick={() => setShowDeleteTeacherModal(true) }> Elimina </Button>
            </div>

          </Card.Body>
        </Card>

        <Modal show={showUpdateTeacherModal} onHide={() => handleUpdateTeacherModal()} dialogClassName="update-teacher-modal" centered>
          <Modal.Header closeButton>
          <Modal.Title> Aggiorna Insegnante </Modal.Title>
          </Modal.Header>
          <Modal.Body className="update-student-teacher-modal-body">
            <CreateUpdateUserForm 
                personInfo={teacherInfo}
                personType={'Teacher'}
                callback={updateTeacher}
            />
          </Modal.Body>
          <Modal.Footer />
        </Modal>

        <Modal show={showDeleteTeacherModal} onHide={ () => setShowDeleteTeacherModal(false) } centered>
          <Modal.Header closeButton>
            <Modal.Title> Elimina Insegnante </Modal.Title>
          </Modal.Header>
          <Modal.Body className="delete-student-teacher-modal-body">
              Sei sicura di voler eliminare {teacherInfo.Name} {teacherInfo.Surname}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={async () => {
              await deleteTeacher(teacherInfo.TeacherID);
              setShowDeleteTeacherModal(false); 
            }}>
              ELIMINA
            </Button>
            <Button variant="secondary" onClick={() => { setShowDeleteTeacherModal(false) } }>
              CHIUDI
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
};


export default TeacherDisplayer;