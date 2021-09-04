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

    const [newTaxCode, setNewTaxCode] = useState(teacherInfo.TaxCode);
    const [newName, setNewName] = useState(teacherInfo.Name);
    const [newSurname, setNewSurname] = useState(teacherInfo.Surname);
    const [newCity, setNewCity] = useState(teacherInfo.City);
    const [newAddress, setNewAddress] = useState(teacherInfo.Address);
    const [newMobilePhone, setNewMobilePhone] = useState(teacherInfo.MobilePhone);
    const [newEmail, setNewEmail] = useState(teacherInfo.Email);
    const [newBirthPlace, setNewBirthPlace] = useState(teacherInfo.BirthPlace);
    const [newDiscipline, setNewDiscipline] = useState(teacherInfo.Discipline);
    const [newCourse, setNewCourse] = useState(teacherInfo.Course);
    const [newSchool, setNewSchool] = useState(teacherInfo.School);
    const [newRegistrationDate, setNewRegistrationDate] = useState(teacherInfo.RegistrationDate.split("-").reverse().join("-"));
    const [newCertificateExpirationDate, setNewCertificateExpirationDate] = useState(teacherInfo.CertificateExpirationDate.split("-").reverse().join("-"));
    const [newDOB, setNewDOB] = useState(teacherInfo.DOB.split("-").reverse().join("-"));
    const [newGreenPassExpirationDate, setNewGreenPassExpirationDate] = useState(teacherInfo.GreenPassExpirationDate.split("-").reverse().join("-"));

    const setFormData = () => {
      setNewTaxCode(teacherInfo.NewTaxCode)
      setNewName(teacherInfo.NewName)
      setNewSurname(teacherInfo.NewSurname)
      setNewCity(teacherInfo.NewCity)
      setNewAddress(teacherInfo.NewAddress)
      setNewMobilePhone(teacherInfo.NewMobilePhone)
      setNewEmail(teacherInfo.NewEmail)
      setNewBirthPlace(teacherInfo.NewBirthPlace)
      setNewDiscipline(teacherInfo.NewDiscipline)
      setNewCourse(teacherInfo.NewCourse)
      setNewSchool(teacherInfo.NewSchool)
      setNewRegistrationDate(teacherInfo.NewRegistrationDate.split("-").reverse().join("-"))
      setNewCertificateExpirationDate(teacherInfo.NewCertificateExpirationDate.split("-").reverse().join("-"))
      setNewDOB(teacherInfo.NewDOB.split("-").reverse().join("-"))
      setNewGreenPassExpirationDate(teacherInfo.NewGreenPassExpirationDate.split("-").reverse().join("-"))
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
              <b>Luogo e Data Nascita:</b> {teacherInfo.BirthPlace} - {teacherInfo.DOB === 'Invalid date' ? '01-01-1900' : teacherInfo.DOB}
            </Card.Text>
            <Card.Text>
              <b>Data Iscrizione:</b> {teacherInfo.RegistrationDate === 'Invalid date' ? '01-01-1900' : teacherInfo.RegistrationDate}
            </Card.Text>
            <Card.Text>
              <b>Disciplina:</b> {teacherInfo.Discipline}
            </Card.Text>
            <Card.Text>
              <b>Corso:</b> {teacherInfo.Course}
            </Card.Text>
            <Card.Text>
              <b>Data Certificato:</b> {teacherInfo.CertificateExpirationDate === 'Invalid date' ? '01-01-1900' : teacherInfo.CertificateExpirationDate}
            </Card.Text>
            <Card.Text>
              <b>Data Scadenza Green Pass:</b> {teacherInfo.GreenPassExpirationDate === 'Invalid date' ? '01-01-1900' : teacherInfo.GreenPassExpirationDate}
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
              const updatedTeacherInfo = {
                TeacherID: teacherInfo.InsegnanteID,
                TaxCode: newTaxCode,
                Name: newName,
                Surname: newSurname,
                City: newCity,
                Address: newAddress,
                MobilePhone: newMobilePhone,
                Email: newEmail,
                BirthPlace: newBirthPlace,
                Discipline: newDiscipline,
                Course: newCourse,
                School: newSchool,
                RegistrationDate: newRegistrationDate,
                CertificateExpirationDate: newCertificateExpirationDate,
                DOB: newDOB,
                GreenPassExpirationDate: newGreenPassExpirationDate
              };
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
              Sei sicura di voler eliminare {teacherInfo.Name} {teacherInfo.Surname}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => { deleteTeacher(teacherInfo.TeacherID); setShowDeleteTeacherModal(false); } }>
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