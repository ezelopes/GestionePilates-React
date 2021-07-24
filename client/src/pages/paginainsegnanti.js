import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Modal, Button } from 'react-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import FormInsegnante from '../components/form_insegnante'

import { updateTeacher } from '../helpers/api-calls';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


const pdfTemplateModuloIscrizione = require('../pdfTemplates/pdf-template-modulo-iscrizione');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const teacherDefaultData = {
  CodiceFiscale: '',
  Nome: '',
  Cognome: '',
  Citta: '',
  Indirizzo: '',
  Cellulare: '',
  Email: '',
  LuogoNascita: '',
  Disciplina: '',
  Corso: '',
  Scuola: '',
  DataIscrizione: '',
  DataCertificato: '',
  DataNascita: ''
}

const InsegnantiPage = () => {
  const [teachersList, setTeachersList] = useState();
  const [teacherInfo, setTeacherInfo] = useState(teacherDefaultData);

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

  const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);

  const teacherRowClicked = ({ data }) => {
    console.log(data)
    setTeacherInfo({
      InsegnanteID: data.InsegnanteID,
      CodiceFiscale: data.CodiceFiscale,
      Nome: data.Nome,
      Cognome: data.Cognome,
      Citta: data.Citta,
      Indirizzo: data.Indirizzo,
      Cellulare: data.Cellulare,
      Email: data.Email,
      LuogoNascita: data.LuogoNascita,
      Disciplina: data.Disciplina,
      Corso: data.Corso,
      Scuola: data.Scuola,
      DataIscrizione: data.DataIscrizione,
      DataCertificato: data.DataCertificato,
      DataNascita: data.DataNascita
    })
    setNewCodiceFiscale(data.CodiceFiscale)
    setNewNome(data.Nome)
    setNewCognome(data.Cognome)
    setNewCitta(data.Citta)
    setNewIndirizzo(data.Indirizzo)
    setNewCellulare(data.Cellulare)
    setNewEmail(data.Email)
    setNewLuogoNascita(data.LuogoNascita)
    setNewDisciplina(data.Disciplina)
    setNewCorso(data.Corso)
    setNewScuola(data.Scuola)
    setNewDataIscrizione(data.DataIscrizione)
    setNewDataCertificato(data.DataCertificato)
    setNewDataNascita(data.DataNascita)

    setShowUpdateTeacherModal(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/insegnante/getInsegnanti');
      const body = await result.json();
      setTeachersList(body);
    };
    fetchData();
  }, []);

  const handleUpdateTeacherModal = () => {
    setTeacherInfo(teacherDefaultData); // if closed without saving
    setShowUpdateTeacherModal(false);
  }

  const stampaModuloIscrizione = async ({ data }) => {
    try {
      const documentDefinition = await pdfTemplateModuloIscrizione.default(data);
      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.log(error);
    }
  };

  const columnsDefinition = [
    {
      headerName: 'Aggiorna',
      field: 'UpdateTeacher',
      cellRendererFramework: params => {
        // return <Link to={`/paginaallieve/${params.data.CodiceFiscale}`}>{params.value}</Link>;
        return (
          <>
            <Button onClick={ () => teacherRowClicked(params) }> Test </Button>
          </>
        )
      }
    },
    {
      headerName: 'Modulo Iscrizione',
      field: 'module',
      cellRendererFramework: params => {
        // return <Link to={`/paginaallieve/${params.data.CodiceFiscale}`}>{params.value}</Link>;
        return (
          <>
            <Button onClick={ () => stampaModuloIscrizione(params)}> Modulo </Button>
          </>
        )
      }
    },
    { headerName: 'Codice Fiscale', field: 'CodiceFiscale' },
    { headerName: 'Nome', field: 'Nome' },
    { headerName: 'Cognome', field: 'Cognome' },
    { headerName: 'Citta', field: 'Citta' },
    { headerName: 'Indirizzo', field: 'Indirizzo' },
    { headerName: 'Cellulare', field: 'Cellulare' },
    { headerName: 'Email', field: 'Email' },
    { headerName: 'Data Iscrizione', field: 'DataIscrizione', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
    { headerName: 'Data Certificato', field: 'DataCertificato', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
    { headerName: 'Data Nascita', field: 'DataNascita', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
    { headerName: 'Luogo Nascita', field: 'LuogoNascita' },
    { headerName: 'Disciplina', field: 'Disciplina' },
    { headerName: 'Corso', field: 'Corso' },
  ];

  const gridOptionsDefault = {
    masterDetail: true,
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      cellStyle: { fontSize: '1.5em' }
    },
    rowSelection: 'single'
  };


  return (
    <div className="page-body">
      <div className="ag-theme-balham" style={{ height: '30em', width: '100%' }}>
        <AgGridReact
          reactNext={true}
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptionsDefault}
          columnDefs={columnsDefinition}
          rowData={teachersList}
        ></AgGridReact>
      </div>
      
      <Modal show={showUpdateTeacherModal} onHide={() => handleUpdateTeacherModal()} dialogClassName="update-teacher-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title> Aggiorna Insegnante </Modal.Title>
        </Modal.Header>
        {/* change class name */}
        <Modal.Body className="updateStudentModalBody">
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
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={async () => { 
            const updatedTeacherInfo = { InsegnanteID: teacherInfo.InsegnanteID, CodiceFiscale: newCodiceFiscale, Nome: newNome, Cognome: newCognome, Citta: newCitta, Indirizzo: newIndirizzo, Cellulare: newCellulare, Email: newEmail, LuogoNascita: newLuogoNascita, Disciplina: newDisciplina, Corso: newCorso, Scuola: newScuola, DataIscrizione: newDataIscrizione.split("-").reverse().join("-"), DataCertificato: newDataCertificato.split("-").reverse().join("-"), DataNascita: newDataNascita.split("-").reverse().join("-") };
            await updateTeacher(updatedTeacherInfo); // refreshing the page
            handleUpdateTeacherModal()
          } }>
            AGGIORNA
          </Button>
          <Button variant="secondary" onClick={() => { handleUpdateTeacherModal() } }>
            CHIUDI
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InsegnantiPage;
