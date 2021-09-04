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

  const [newIsAdult, setNewIsAdult] = useState('');
  const [newTaxCode, setNewTaxCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newMobilePhone, setNewMobilePhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthPlace, setNewBirthPlace] = useState('');
  const [newDiscipline, setNewDiscipline] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newRegistrationDate, setNewRegistrationDate] = useState('');
  const [newCertificateExpirationDate, setNewCertificateExpirationDate] = useState('');
  const [newDOB, setNewDOB] = useState('');
  const [newGreenPassExpirationDate, setNewGreenPassExpirationDate] = useState('');
  const [newParentTaxCode, setNewParentTaxCode] = useState('');
  const [newParentName, setNewParentName] = useState('');
  const [newParentSurname, setNewParentSurname] = useState('');
  
  const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
  const [showRegistrationDateModal, setShowRegistrationDateModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);

  const setFormData = (studentInfo) => {
    setNewIsAdult(studentInfo.Maggiorenne);
    setNewTaxCode(studentInfo.CodiceFiscale);
    setNewName(studentInfo.Nome);
    setNewSurname(studentInfo.Cognome);
    setNewCity(studentInfo.Citta);
    setNewAddress(studentInfo.Indirizzo);
    setNewMobilePhone(studentInfo.Cellulare);
    setNewEmail(studentInfo.Email);
    setNewBirthPlace(studentInfo.LuogoNascita);
    setNewDiscipline(studentInfo.Disciplina);
    setNewCourse(studentInfo.Corso);
    setNewSchool(studentInfo.Scuola);
    setNewRegistrationDate(reverseDate(studentInfo.DataIscrizione));
    setNewCertificateExpirationDate(reverseDate(studentInfo.DataCertificato));
    setNewDOB(reverseDate(studentInfo.DataNascita));
    setNewGreenPassExpirationDate(reverseDate(studentInfo.DataGreenPass));
    setNewParentTaxCode(studentInfo.CodiceFiscaleGenitore);
    setNewParentName(studentInfo.NomeGenitore);
    setNewParentSurname(studentInfo.CognomeGenitore);
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
    // TODO: Reduce this to one endpoint call!
    const fetchData = async () => {
      const getSingleStudentResult = await fetch(`/api/allieva/getSingleAllieva/${match.params.codicefiscale}`);
      const singleStudent = await getSingleStudentResult.json();
      setStudentInfo(singleStudent);
      setFormData(singleStudent);
      setNewRegistrationDate(singleStudent.DataIscrizione)

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
                newIsAdult={newIsAdult}
                setNewIsAdult={setNewIsAdult}
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
                setNewParentTaxCode={setNewParentTaxCode}
                setNewParentName={setNewParentName}
                setNewParentSurname={setNewParentSurname}
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={async () => {
            const updatedStudentInfo = { 
              AllievaID: studentInfo.AllievaID,
              Maggiorenne: newIsAdult,
              CodiceFiscale: newTaxCode,
              Nome: newName,
              Cognome: newSurname,
              Citta: newCity,
              Indirizzo: newAddress,
              Cellulare: newMobilePhone,
              Email: newEmail,
              LuogoNascita: newBirthPlace,
              Disciplina: newDiscipline,
              Corso: newCourse,
              Scuola: newSchool,
              DataIscrizione: newRegistrationDate,
              DataCertificato: newCertificateExpirationDate,
              DataNascita: newDOB,
              DataGreenPass: newGreenPassExpirationDate,
              CodiceFiscaleGenitore: newParentTaxCode,
              NomeGenitore: newParentName,
              CognomeGenitore: newParentSurname 
            };
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
