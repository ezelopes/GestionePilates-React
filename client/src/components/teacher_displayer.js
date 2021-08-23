import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap'
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import FormInsegnante from './form_insegnante'

import { updateTeacher, deleteTeacher } from '../helpers/api-calls';

const pdfTemplateModuloIscrizione = require('../pdfTemplates/pdf-template-modulo-iscrizione');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const teachersDisplayer = ({ currentTeacher }) => {
    const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);
    const [teacherInfo, setTeacherInfo] = useState(currentTeacher);
    const [showDeleteTeacherModal, setShowDeleteTeacherModal] = useState(false);

    const [newCodiceFiscale, setNewCodiceFiscale] = useState(teacherInfo.CodiceFiscale);
    const [newNome, setNewNome] = useState(teacherInfo.Nome);
    const [newCognome, setNewCognome] = useState(teacherInfo.Cognome);
    const [newCitta, setNewCitta] = useState(teacherInfo.Citta);
    const [newIndirizzo, setNewIndirizzo] = useState(teacherInfo.Indirizzo);
    const [newCellulare, setNewCellulare] = useState(teacherInfo.Cellulare);
    const [newEmail, setNewEmail] = useState(teacherInfo.Email);
    const [newLuogoNascita, setNewLuogoNascita] = useState(teacherInfo.LuogoNascita);
    const [newDisciplina, setNewDisciplina] = useState(teacherInfo.Disciplina);
    const [newCorso, setNewCorso] = useState(teacherInfo.Corso);
    const [newScuola, setNewScuola] = useState(teacherInfo.Scuola);
    const [newDataIscrizione, setNewDataIscrizione] = useState(teacherInfo.DataIscrizione.split("-").reverse().join("-"));
    const [newDataCertificato, setNewDataCertificato] = useState(teacherInfo.DataCertificato.split("-").reverse().join("-"));
    const [newDataNascita, setNewDataNascita] = useState(teacherInfo.DataNascita.split("-").reverse().join("-"));
    const [newDataGreenPass, setNewDataGreenPass] = useState(teacherInfo.DataGreenPass.split("-").reverse().join("-"));

    const setFormData = () => {
      setNewCodiceFiscale(teacherInfo.CodiceFiscale)
      setNewNome(teacherInfo.Nome)
      setNewCognome(teacherInfo.Cognome)
      setNewCitta(teacherInfo.Citta)
      setNewIndirizzo(teacherInfo.Indirizzo)
      setNewCellulare(teacherInfo.Cellulare)
      setNewEmail(teacherInfo.Email)
      setNewLuogoNascita(teacherInfo.LuogoNascita)
      setNewDisciplina(teacherInfo.Disciplina)
      setNewCorso(teacherInfo.Corso)
      setNewScuola(teacherInfo.Scuola)
      setNewDataIscrizione(teacherInfo.DataIscrizione.split("-").reverse().join("-"))
      setNewDataCertificato(teacherInfo.DataCertificato.split("-").reverse().join("-"))
      setNewDataNascita(teacherInfo.DataNascita.split("-").reverse().join("-"))
      setNewDataGreenPass(teacherInfo.DataGreenPass.split("-").reverse().join("-"))
    }

    const handleUpdateTeacherModal = () => {
        setFormData(); // if closed without saving
        setShowUpdateTeacherModal(false);
    }

    const stampaModuloIscrizione = async () => {
        try {
            const documentDefinition = await pdfTemplateModuloIscrizione.default(teacherInfo);
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
              <b>Luogo e Data Nascita:</b> {teacherInfo.LuogoNascita} - {teacherInfo.DataNascita}
            </Card.Text>
            <Card.Text>
              <b>Data Iscrizione:</b> {teacherInfo.DataIscrizione}
            </Card.Text>
            <Card.Text>
              <b>Disciplina:</b> {teacherInfo.Disciplina}
            </Card.Text>
            <Card.Text>
              <b>Corso:</b> {teacherInfo.Corso}
            </Card.Text>
            <Card.Text>
              <b>Data Certificato:</b> {teacherInfo.DataCertificato}
            </Card.Text>
            <Card.Text>
              <b>Data Scadenza Green Pass:</b> {teacherInfo.DataGreenPass}
            </Card.Text>

            <Button variant="success" onClick={ () => stampaModuloIscrizione()}> Scarica Modulo </Button>
            <Button variant="primary" onClick={ () => setShowUpdateTeacherModal(true) } style={{ marginLeft: '1em' }}> Aggiorna </Button>
            <Button variant="danger" onClick={() => setShowDeleteTeacherModal(true) } style={{ marginLeft: '1em' }}> Elimina </Button>

          </Card.Body>
        </Card>

        <Modal show={showUpdateTeacherModal} onHide={() => handleUpdateTeacherModal()} dialogClassName="update-teacher-modal" centered>
          <Modal.Header closeButton>
          <Modal.Title> Aggiorna Insegnante </Modal.Title>
          </Modal.Header>
          <Modal.Body className="updateTeacherModalBody">
              {/* change class name */}
              <div className="update-student-form">
              <FormInsegnante 
                  insegnanteInfo={teacherInfo}
                  setNewCodiceFiscale={setNewCodiceFiscale}
                  setNewNome={setNewNome}
                  setNewCognome={setNewCognome}
                  setNewCitta={setNewCitta}
                  setNewIndirizzo={setNewIndirizzo}
                  setNewCellulare={setNewCellulare}
                  setNewEmail={setNewEmail}
                  setNewLuogoNascita={setNewLuogoNascita}
                  setNewDisciplina={setNewDisciplina}
                  setNewCorso={setNewCorso}
                  setNewScuola={setNewScuola}
                  setNewDataIscrizione={setNewDataIscrizione}
                  setNewDataCertificato={setNewDataCertificato}
                  setNewDataNascita={setNewDataNascita}
                  setNewDataGreenPass={setNewDataGreenPass}
              />
              </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="success" onClick={async () => {
              const updatedTeacherInfo = { InsegnanteID: teacherInfo.InsegnanteID, CodiceFiscale: newCodiceFiscale, Nome: newNome, Cognome: newCognome, Citta: newCitta, Indirizzo: newIndirizzo, Cellulare: newCellulare, Email: newEmail, LuogoNascita: newLuogoNascita, Disciplina: newDisciplina, Corso: newCorso, Scuola: newScuola, DataIscrizione: newDataIscrizione, DataCertificato: newDataCertificato, DataNascita: newDataNascita, DataGreenPass: newDataGreenPass };
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
            <Modal.Title> Elimina Allieva </Modal.Title>
          </Modal.Header>
          <Modal.Body className="deleteStudentModalBody">
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


export default teachersDisplayer;