import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import NotFoundPage from './notfoundpage';
import FormAllieva from '../components/form_allieva';
import ListaRicevute from '../components/lista_ricevute';
import FormCreaRicevuta from '../components/form_ricevuta';
import reverseDate from '../helpers/reverse-date-for-input-date';
import { updateStudent, updateRegistrationDate, deleteStudent } from '../helpers/api-calls';

const pdfTemplateModuloIscrizione = require('../pdfTemplates/pdf-template-modulo-iscrizione');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');


const Allieva = ({ match }) => {

  const [allievaInfo, setAllievaInfo] = useState({});
  const [allievaRicevute, setAllievaRicevute] = useState([]);
  const [newRegistrationDate, setNewRegistrationDate] = useState(allievaInfo.DataIscrizione);

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

  const setFormData = (allievaInfo) => {
    setNewMaggiorenne(allievaInfo.Maggiorenne);
    setNewCodiceFiscale(allievaInfo.CodiceFiscale);
    setNewNome(allievaInfo.Nome);
    setNewCognome(allievaInfo.Cognome);
    setNewCitta(allievaInfo.Citta);
    setNewIndirizzo(allievaInfo.Indirizzo);
    setNewCellulare(allievaInfo.Cellulare);
    setNewEmail(allievaInfo.Email);
    setNewLuogoNascita(allievaInfo.LuogoNascita);
    setNewDisciplina(allievaInfo.Disciplina);
    setNewCorso(allievaInfo.Corso);
    setNewScuola(allievaInfo.Scuola);
    setNewDataIscrizione(reverseDate(allievaInfo.DataIscrizione));
    setNewDataCertificato(reverseDate(allievaInfo.DataCertificato));
    setNewDataNascita(reverseDate(allievaInfo.DataNascita));
    setNewDataGreenPass(reverseDate(allievaInfo.DataGreenPass));
    setNewCodiceFiscaleGenitore(allievaInfo.CodiceFiscaleGenitore);
    setNewNomeGenitore(allievaInfo.NomeGenitore);
    setNewCognomeGenitore(allievaInfo.CognomeGenitore);
  }

  const handleUpdateStudentModal = () => {
    setFormData(allievaInfo); // if closed without saving
    setShowUpdateStudentModal(false);
  }


  const stampaModuloIscrizione = async () => {
    try {
      const documentDefinition = await pdfTemplateModuloIscrizione.default(allievaInfo);
      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const getSingleAllievaResult = await fetch(`/api/allieva/getSingleAllieva/${match.params.codicefiscale}`);
      const singleAllieva = await getSingleAllievaResult.json();
      setAllievaInfo(singleAllieva[0]);
      setFormData(singleAllieva[0]);
      setNewRegistrationDate(singleAllieva[0].DataIscrizione)

      const getRicevuteOfAllievaResult = await fetch(`/api/ricevuta/getRicevuteOfAllieva/${match.params.codicefiscale}`);
      const ricevute = await getRicevuteOfAllievaResult.json();
      setAllievaRicevute(ricevute);
    };
    fetchData();

  }, []);

  if (!allievaInfo) return <NotFoundPage />;

  return (
    <>
      <div className="page-body">
        <div className="studentNameTitle">
          {allievaInfo.Nome} {allievaInfo.Cognome}
        </div>

        <div className="buttonsContainer">
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

        <ListaRicevute ricevute={allievaRicevute} allievaInfo={allievaInfo} />
        <FormCreaRicevuta CodiceFiscale={match.params.codicefiscale} AllievaID={allievaInfo.AllievaID} />
      </div>

      <Modal show={showRegistrationDateModal} onHide={ () => setShowRegistrationDateModal(false) } centered>
        <Modal.Header closeButton>
          <Modal.Title> Aggiorna Data Iscrizione </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateRegistrationDate">
            <input type="date" defaultValue={ reverseDate(allievaInfo.DataIscrizione) } onChange={({ target }) => setNewRegistrationDate(target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => { updateRegistrationDate(allievaInfo.AllievaID, newRegistrationDate); setShowRegistrationDateModal(false); } }>
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
        <Modal.Body className="deleteStudentModalBody">
            Sei sicura di voler eliminare {allievaInfo.Nome} {allievaInfo.Cognome}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => { deleteStudent(allievaInfo.AllievaID); setShowDeleteStudentModal(false); } }>
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
        <Modal.Body className="updateStudentModalBody">
            <div className="update-info-form">
              <FormAllieva 
                allievaInfo={allievaInfo}
                newMaggiorenne={newMaggiorenne}
                setNewMaggiorenne={setNewMaggiorenne}
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
                setNewCodiceFiscaleGenitore={setNewCodiceFiscaleGenitore}
                setNewNomeGenitore={setNewNomeGenitore}
                setNewCognomeGenitore={setNewCognomeGenitore}
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={async () => {
            const updatedAllievaInfo = { AllievaID: allievaInfo.AllievaID, Maggiorenne: newMaggiorenne, CodiceFiscale: newCodiceFiscale, Nome: newNome, Cognome: newCognome, Citta: newCitta, Indirizzo: newIndirizzo, Cellulare: newCellulare, Email: newEmail, LuogoNascita: newLuogoNascita, Disciplina: newDisciplina, Corso: newCorso, Scuola: newScuola, DataIscrizione: newDataIscrizione, DataCertificato: newDataCertificato, DataNascita: newDataNascita, DataGreenPass: newDataGreenPass, CodiceFiscaleGenitore: newCodiceFiscaleGenitore, NomeGenitore: newNomeGenitore, CognomeGenitore: newCognomeGenitore };
            await updateStudent(updatedAllievaInfo); // refreshing the page
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

export default Allieva;
