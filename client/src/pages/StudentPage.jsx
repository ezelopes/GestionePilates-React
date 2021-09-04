import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import NotFoundPage from './NotFoundPage';
import StudentForm from '../components/StudentForm';
import ReceiptsList from '../components/ReceiptsList';
import CreateReceiptForm from '../components/CreateReceiptForm';
import reverseDate from '../helpers/reverseDateForInputDate';
import { updateStudent, updateRegistrationDate, deleteStudent } from '../helpers/apiCalls';

const RegistrationFormTemplate = require('../pdfTemplates/RegistrationFormTemplate');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');


const StudentPage = ({ match }) => {

  const [studentInfo, setStudentInfo] = useState({});
  const [studentReceipts, setStudentReceipts] = useState([]);
  const [newRegistrationDate, setNewRegistrationDate] = useState(studentInfo.DataIscrizione);

  const [newMaggiorenne, setNewMaggiorenne] = useState('');
  const [newCodiceFiscale, setNewCodiceFiscale] = useState('');
  const [newNome, setNewNome] = useState('');
  const [newCognome, setNewCognome] = useState('');
  const [newCitta, setNewCitta] = useState('');
  const [newIndirizzo, setNewIndirizzo] = useState('');
  const [newCellulare, setNewCellulare] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLuogoNascita, setNewLuogoNascita] = useState('');
  const [newDisciplina, setNewDisciplina] = useState('');
  const [newCorso, setNewCorso] = useState('');
  const [newScuola, setNewScuola] = useState('');
  const [newDataIscrizione, setNewDataIscrizione] = useState('');
  const [newDataCertificato, setNewDataCertificato] = useState('');
  const [newDataNascita, setNewDataNascita] = useState('');
  const [newDataGreenPass, setNewDataGreenPass] = useState('');
  const [newCodiceFiscaleGenitore, setNewCodiceFiscaleGenitore] = useState('');
  const [newNomeGenitore, setNewNomeGenitore] = useState('');
  const [newCognomeGenitore, setNewCognomeGenitore] = useState('');
  
  const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
  const [showRegistrationDateModal, setShowRegistrationDateModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);

  const setFormData = (studentInfo) => {
    setNewMaggiorenne(studentInfo.Maggiorenne);
    setNewCodiceFiscale(studentInfo.CodiceFiscale);
    setNewNome(studentInfo.Nome);
    setNewCognome(studentInfo.Cognome);
    setNewCitta(studentInfo.Citta);
    setNewIndirizzo(studentInfo.Indirizzo);
    setNewCellulare(studentInfo.Cellulare);
    setNewEmail(studentInfo.Email);
    setNewLuogoNascita(studentInfo.LuogoNascita);
    setNewDisciplina(studentInfo.Disciplina);
    setNewCorso(studentInfo.Corso);
    setNewScuola(studentInfo.Scuola);
    setNewDataIscrizione(reverseDate(studentInfo.DataIscrizione));
    setNewDataCertificato(reverseDate(studentInfo.DataCertificato));
    setNewDataNascita(reverseDate(studentInfo.DataNascita));
    setNewDataGreenPass(reverseDate(studentInfo.DataGreenPass));
    setNewCodiceFiscaleGenitore(studentInfo.CodiceFiscaleGenitore);
    setNewNomeGenitore(studentInfo.NomeGenitore);
    setNewCognomeGenitore(studentInfo.CognomeGenitore);
  }

  const handleUpdateStudentModal = () => {
    setFormData(studentInfo); // if closed without saving
    setShowUpdateStudentModal(false);
  }


  const stampaModuloIscrizione = async () => {
    try {
      const documentDefinition = await RegistrationFormTemplate.default(studentInfo);
      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const getSingleStudentResult = await fetch(`/api/allieva/getSingleAllieva/${match.params.codicefiscale}`);
      const singleStudent = await getSingleStudentResult.json();
      setStudentInfo(singleStudent[0]);
      setFormData(singleStudent[0]);
      setNewRegistrationDate(singleStudent[0].DataIscrizione)

      const getReceiptsOfStudentResult = await fetch(`/api/ricevuta/getRicevuteOfAllieva/${match.params.codicefiscale}`);
      const receipts = await getReceiptsOfStudentResult.json();
      setStudentReceipts(receipts);
    };
    fetchData();

  }, []);

  if (!studentInfo) return <NotFoundPage />;

  return (
    <>
      <div className="page-body">
        <div className="student-name-title">
          {studentInfo.Nome} {studentInfo.Cognome}
        </div>

        <div className="buttons-container">
          <Button onClick={stampaModuloIscrizione}>
            <span role='img' aria-label='module'>💾</span> MODULO ISCRIZIONE
          </Button>
          
          <Button variant="warning" onClick={ () => setShowUpdateStudentModal(true) }>
            <span role='img' aria-label='update'>🔄</span> AGGIORNA ALLIEVA
          </Button>

          <Button variant="warning" id="aggiornaDataIscrizione" onClick={ () => setShowRegistrationDateModal(true) }>
            <span role='img' aria-label='update'>🔄</span> AGGIORNA DATA ISCRIZIONE
          </Button>

          <Button variant='danger' onClick={ () => setShowDeleteStudentModal(true) }>
            <span role='img' aria-label='bin'>🗑️</span> ELIMINA ALLIEVA
          </Button>

          <Button variant="secondary" onClick={ () => window.location.assign('/paginaallieve') }>
            <span role='img' aria-label='back'>🔙</span> INDIETRO
          </Button>
        </div>

        <ReceiptsList receipts={studentReceipts} studentInfo={studentInfo} />
        <CreateReceiptForm CodiceFiscale={match.params.codicefiscale} AllievaID={studentInfo.AllievaID} />
      </div>

      <Modal show={showRegistrationDateModal} onHide={ () => setShowRegistrationDateModal(false) } centered>
        <Modal.Header closeButton>
          <Modal.Title> Aggiorna Data Iscrizione </Modal.Title>
        </Modal.Header>
        <Modal.Body className="update-registration-date">
            <input type="date" defaultValue={ reverseDate(studentInfo.DataIscrizione) } onChange={({ target }) => setNewRegistrationDate(target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => { updateRegistrationDate(studentInfo.AllievaID, newRegistrationDate); setShowRegistrationDateModal(false); } }>
            AGGIORNA
          </Button>
          <Button variant="secondary" onClick={() => { setShowRegistrationDateModal(false) } }>
            CHIUDI
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showDeleteStudentModal} onHide={ () => setShowDeleteStudentModal(false) } centered>
        <Modal.Header closeButton>
          <Modal.Title> Elimina Allieva </Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-student-teacher-modal-body">
            Sei sicura di voler eliminare {studentInfo.Nome} {studentInfo.Cognome}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => { deleteStudent(studentInfo.AllievaID); setShowDeleteStudentModal(false); } }>
            ELIMINA
          </Button>
          <Button variant="secondary" onClick={() => { setShowDeleteStudentModal(false) } }>
            CHIUDI
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateStudentModal} onHide={() => handleUpdateStudentModal()} dialogClassName="update-student-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title> Aggiorna Allieva </Modal.Title>
        </Modal.Header>
        <Modal.Body className="update-student-modal-body">
            <div className="update-info-form">
              <StudentForm 
                studentInfo={studentInfo}
                newIsAdult={newMaggiorenne}
                setNewIsAdult={setNewMaggiorenne}
                setNewTaxCode={setNewCodiceFiscale}
                setNewName={setNewNome}
                setNewSurname={setNewCognome}
                setNewCity={setNewCitta}
                setNewAddress={setNewIndirizzo}
                setNewMobilePhone={setNewCellulare}
                setNewEmail={setNewEmail}
                setNewBirthPlace={setNewLuogoNascita}
                setNewDiscipline={setNewDisciplina}
                setNewCourse={setNewCorso}
                setNewSchool={setNewScuola}
                setNewRegistrationDate={setNewDataIscrizione}
                setNewCertificateExpirationDate={setNewDataCertificato}
                setNewDOB={setNewDataNascita}
                setNewGreenPassExpirationDate={setNewDataGreenPass}
                setNewParentTaxCode={setNewCodiceFiscaleGenitore}
                setNewParentName={setNewNomeGenitore}
                setNewParentSurname={setNewCognomeGenitore}
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={async () => {
            const updatedStudentInfo = { AllievaID: studentInfo.AllievaID, Maggiorenne: newMaggiorenne, CodiceFiscale: newCodiceFiscale, Nome: newNome, Cognome: newCognome, Citta: newCitta, Indirizzo: newIndirizzo, Cellulare: newCellulare, Email: newEmail, LuogoNascita: newLuogoNascita, Disciplina: newDisciplina, Corso: newCorso, Scuola: newScuola, DataIscrizione: newDataIscrizione, DataCertificato: newDataCertificato, DataNascita: newDataNascita, DataGreenPass: newDataGreenPass, CodiceFiscaleGenitore: newCodiceFiscaleGenitore, NomeGenitore: newNomeGenitore, CognomeGenitore: newCognomeGenitore };
            await updateStudent(updatedStudentInfo); // refreshing the page
          } }>
            AGGIORNA
          </Button>
          <Button variant="secondary" onClick={() => { handleUpdateStudentModal() } }>
            CHIUDI
          </Button>
        </Modal.Footer>
      </Modal>
      

    </>
  );
}

export default StudentPage;
