import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap'
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import TeacherForm from './TeacherForm'

import { updateTeacher, deleteTeacher } from '../helpers/apiCalls';

const RegistrationFormTemplate = require('../pdfTemplates/RegistrationFormTemplate');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TeacherDisplayer = ({ currentTeacher }) => {
    const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);
    const [teacherInfo] = useState(currentTeacher);
    const [showDeleteTeacherModal, setShowDeleteTeacherModal] = useState(false);

    const [newTaxCode, setNewTaxCode] = useState(teacherInfo.CodiceFiscale);
    const [newName, setNewName] = useState(teacherInfo.Nome);
    const [newSurname, setNewSurname] = useState(teacherInfo.Cognome);
    const [newCity, setNewCity] = useState(teacherInfo.Citta);
    const [newAddress, setNewAddress] = useState(teacherInfo.Indirizzo);
    const [newMobilePhone, setNewMobilePhone] = useState(teacherInfo.Cellulare);
    const [newEmail, setNewEmail] = useState(teacherInfo.Email);
    const [newBirthPlace, setNewBirthPlace] = useState(teacherInfo.LuogoNascita);
    const [newDiscipline, setNewDiscipline] = useState(teacherInfo.Disciplina);
    const [newCourse, setNewCourse] = useState(teacherInfo.Corso);
    const [newSchool, setNewSchool] = useState(teacherInfo.Scuola);
    const [newRegistrationDate, setNewRegistrationDate] = useState(teacherInfo.DataIscrizione.split("-").reverse().join("-"));
    const [newCertificateExpirationDate, setNewCertificateExpirationDate] = useState(teacherInfo.DataCertificato.split("-").reverse().join("-"));
    const [newDOB, setNewDOB] = useState(teacherInfo.DataNascita.split("-").reverse().join("-"));
    const [newGreenPassExpirationDate, setNewGreenPassExpirationDate] = useState(teacherInfo.DataGreenPass.split("-").reverse().join("-"));

    const setFormData = () => {
      setNewTaxCode(teacherInfo.CodiceFiscale)
      setNewName(teacherInfo.Nome)
      setNewSurname(teacherInfo.Cognome)
      setNewCity(teacherInfo.Citta)
      setNewAddress(teacherInfo.Indirizzo)
      setNewMobilePhone(teacherInfo.Cellulare)
      setNewEmail(teacherInfo.Email)
      setNewBirthPlace(teacherInfo.LuogoNascita)
      setNewDiscipline(teacherInfo.Disciplina)
      setNewCourse(teacherInfo.Corso)
      setNewSchool(teacherInfo.Scuola)
      setNewRegistrationDate(teacherInfo.DataIscrizione.split("-").reverse().join("-"))
      setNewCertificateExpirationDate(teacherInfo.DataCertificato.split("-").reverse().join("-"))
      setNewDOB(teacherInfo.DataNascita.split("-").reverse().join("-"))
      setNewGreenPassExpirationDate(teacherInfo.DataGreenPass.split("-").reverse().join("-"))
    }

    const handleUpdateTeacherModal = () => {
        setFormData(); // if closed without saving
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
              <b>{teacherInfo.Nome} {teacherInfo.Cognome}</b>
            </Card.Title>
            <Card.Text>
              <b>Codice Fiscale:</b> {teacherInfo.CodiceFiscale}
            </Card.Text>
            <Card.Text>
              <b>Citta e Indirizzo:</b> {teacherInfo.Citta} - {teacherInfo.Indirizzo}
            </Card.Text>
            <Card.Text>
              <b>Cellulare:</b> {teacherInfo.Cellulare}
            </Card.Text>
            <Card.Text>
              <b>Email:</b> {teacherInfo.Email}
            </Card.Text>
            <Card.Text>
              <b>Luogo e Data Nascita:</b> {teacherInfo.LuogoNascita} - {teacherInfo.DataNascita === 'Invalid date' ? '01-01-1900' : teacherInfo.DataNascita}
            </Card.Text>
            <Card.Text>
              <b>Data Iscrizione:</b> {teacherInfo.DataIscrizione === 'Invalid date' ? '01-01-1900' : teacherInfo.DataIscrizione}
            </Card.Text>
            <Card.Text>
              <b>Disciplina:</b> {teacherInfo.Disciplina}
            </Card.Text>
            <Card.Text>
              <b>Corso:</b> {teacherInfo.Corso}
            </Card.Text>
            <Card.Text>
              <b>Data Certificato:</b> {teacherInfo.DataCertificato === 'Invalid date' ? '01-01-1900' : teacherInfo.DataCertificato}
            </Card.Text>
            <Card.Text>
              <b>Data Scadenza Green Pass:</b> {teacherInfo.DataGreenPass === 'Invalid date' ? '01-01-1900' : teacherInfo.DataGreenPass}
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
              <div className="update-info-form">
              <TeacherForm 
                  teacherInfo={teacherInfo}
                  setNewTaxCode={setNewTaxCode}
                  setNewName={setNewName}
                  setNewSurname={setNewSurname}
                  setNewCity={setNewCity}
                  setNewAddress={setNewAddress}
                  setNewMobilePhone={setNewMobilePhone}
                  setNewEmail={setNewEmail}
                  setNewBirthPlace={setNewBirthPlace}
                  setNewDiscipline={setNewDiscipline}
                  setNewCourse={setNewCourse}
                  setNewSchool={setNewSchool}
                  setNewRegistrationDate={setNewRegistrationDate}
                  setNewCertificateExpirationDate={setNewCertificateExpirationDate}
                  setNewDOB={setNewDOB}
                  setNewGreenPassExpirationDate={setNewGreenPassExpirationDate}
              />
              </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="success" onClick={async () => {
              const updatedTeacherInfo = { InsegnanteID: teacherInfo.InsegnanteID, CodiceFiscale: newTaxCode, Nome: newName, Cognome: newSurname, Citta: newCity, Indirizzo: newAddress, Cellulare: newMobilePhone, Email: newEmail, LuogoNascita: newBirthPlace, Disciplina: newDiscipline, Corso: newCourse, Scuola: newSchool, DataIscrizione: newRegistrationDate, DataCertificato: newCertificateExpirationDate, DataNascita: newDOB, DataGreenPass: newGreenPassExpirationDate };
              await updateTeacher(updatedTeacherInfo);
              handleUpdateTeacherModal()
          } }>
              AGGIORNA
          </Button>
          <Button variant="secondary" onClick={() => { handleUpdateTeacherModal() } }>
              CHIUDI
          </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteTeacherModal} onHide={ () => setShowDeleteTeacherModal(false) } centered>
          <Modal.Header closeButton>
            <Modal.Title> Elimina Insegnante </Modal.Title>
          </Modal.Header>
          <Modal.Body className="delete-student-teacher-modal-body">
              Sei sicura di voler eliminare {teacherInfo.Nome} {teacherInfo.Cognome}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => { deleteTeacher(teacherInfo.InsegnanteID); setShowDeleteTeacherModal(false); } }>
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