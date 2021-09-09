import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const StudentsDataTemplate = require('../pdfTemplates/StudentsDataTemplate');

import { ages } from '../commondata/commondata'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  { headerName: 'Seleziona', checkboxSelection: true, headerCheckboxSelection: true },
  {
    headerName: 'Codice Fiscale',
    field: 'TaxCode',
    cellRendererFramework: params => {
      return <Link to={`/paginaallieve/${params.data.TaxCode}`}>{params.value}</Link>;
    }
  },
  { headerName: 'Età', field: 'IsAdult' },
  { headerName: 'Nome', field: 'Name' },
  { headerName: 'Cognome', field: 'Surname' },
  { headerName: 'Citta', field: 'City' },
  { headerName: 'Indirizzo', field: 'Address' },
  { headerName: 'Cellulare', field: 'MobilePhone' },
  { headerName: 'Email', field: 'Email' },
  { headerName: 'Data Iscrizione', field: 'RegistrationDate', cellRenderer: (params) => (params.value !== null) ? new Date(params.value).toLocaleDateString() : '' },
  { headerName: 'Data Scadenza Certificato', field: 'CertificateExpirationDate', cellRenderer: (params) => (params.value !== null) ? new Date(params.value).toLocaleDateString() : '' },
  { headerName: 'Data Nascita', field: 'DOB', cellRenderer: (params) => (params.value !== null) ? new Date(params.value).toLocaleDateString() : '' },
  { headerName: 'Data Green Pass', field: 'GreenPassExpirationDate', cellRenderer: (params) => (params.value !== null) ? new Date(params.value).toLocaleDateString() : '' },
  { headerName: 'Luogo Nascita', field: 'BirthPlace' },
  { headerName: 'Disciplina', field: 'Discipline' },
  { headerName: 'Corso', field: 'Course' },
  { headerName: 'Scuola', field: 'School' },
  { headerName: 'Codice Fiscale Genitore', field: 'ParentTaxCode' },
  { headerName: 'Nome Genitore', field: 'ParentName' },
  { headerName: 'Cognome Genitore', field: 'ParentSurname' }
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

const StudentsPage = () => {
  const [gridOptions] = useState(gridOptionsDefault);
  const [columnDefs] = useState(columnsDefinition);
  const [students, setStudents] = useState();
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const filterNameRef = useRef();
  const filterSurnameRef = useRef();
  const filterCityRef = useRef();
  const filterAgeRef = useRef();
  
  const dropdownAges = [ null, ages[0].age, ages[1].age ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/student/getStudents');
      const body = await result.json();
      setStudents(body);
      sessionStorage.setItem('studentsList', JSON.stringify(body));
    };
    
    if (!sessionStorage.getItem('studentsList') || (sessionStorage.getItem('studentsList') === [])) fetchData();
    else {
      const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
      setStudents(studentListCached)
    }
  }, []);

  
  /*
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
    }; 
  */

  const onStudentSelectionChanged = () => {
    const selectedNodes = gridOptions.api.getSelectedNodes();
    if (selectedNodes.length === 0) return setSelectedStudents([]);

    const students = []
    selectedNodes.forEach(node => {
      students.push(node.data)
    });

    setSelectedStudents(students);
  }

  const clearFilters = () => {
    const filterColumns = ['IsAdult', 'Name', 'Surname', 'City']

    filterColumns.forEach(columnName => {
      const filterComponent = gridOptions.api.getFilterInstance(columnName);
      filterComponent.setModel(null);
    });
    
    filterNameRef.current.value = null;
    filterSurnameRef.current.value = null;
    filterCityRef.current.value = null;
    filterAgeRef.current.value = null;

    gridOptions.api.onFilterChanged();
  }

  const viewAge = (age) => {
    const filterInstance = gridOptions.api.getFilterInstance('IsAdult');

    filterInstance.setModel({
        type: 'contains',
        filter: age
    });

    gridOptions.api.onFilterChanged();
  }

  const viewStudentName = (studentName) => {
    const studentNameFilterComponent = gridOptions.api.getFilterInstance('Name');

    studentNameFilterComponent.setModel({
        type: 'contains',
        filter: studentName
    });

    gridOptions.api.onFilterChanged();
  }
  
  const viewStudentSurname = (studentSurname) => {
    const studentSurnameFilterComponent = gridOptions.api.getFilterInstance('Surname');

    studentSurnameFilterComponent.setModel({
        type: 'contains',
        filter: studentSurname
    });

    gridOptions.api.onFilterChanged();
  }
  
  const viewStudentCity = (studentCity) => {
    const studentCityFilterComponent = gridOptions.api.getFilterInstance('City');

    studentCityFilterComponent.setModel({
        type: 'contains',
        filter: studentCity
    });

    gridOptions.api.onFilterChanged();
  }

  const printStudents = async () => {
    try {
      if (selectedStudents.length === 0) return alert('Seleziona Allieve per Stamparle');
      const documentDefinition = await StudentsDataTemplate.default(selectedStudents);

      pdfMake.createPdf(documentDefinition).open();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="page-body">
      <div className="filter-form">

        <Form.Group>
          <Form.Label> Nome Allieva </Form.Label> 
          <Form.Control ref={filterNameRef} type="text" placeholder="Inserisci Nome..." onChange={(e) => { viewStudentName(e.target.value) }}/> 
        </Form.Group>
        
        <Form.Group>
          <Form.Label> Cognome Allieva </Form.Label> 
          <Form.Control ref={filterSurnameRef} type="text" placeholder="Inserisci Cognome..." onChange={(e) => { viewStudentSurname(e.target.value) }}/> 
        </Form.Group>
        
        <Form.Group>
          <Form.Label> Città </Form.Label> 
          <Form.Control ref={filterCityRef} type="text" placeholder="Città..." onChange={(e) => { viewStudentCity(e.target.value) }}/> 
        </Form.Group>

        <Form.Group>
          <Form.Label> Età </Form.Label> 
          <Form.Control ref={filterAgeRef} as="select" onChange={({ target }) => { viewAge(target.value) } }>
              { dropdownAges.map(age => <option key={`select_${age}`} value={age}> {age} </option>) }
            </Form.Control>
        </Form.Group>

        <Button variant="danger" onClick={clearFilters} style={{ marginTop: '1em' }}>
          Rimuovi Filtri
        </Button>
      </div>

      <div className="ag-theme-balham student-list-grid">
        <AgGridReact
          reactNext={true}
          rowMultiSelectWithClick={true}
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={students}
          onSelectionChanged={onStudentSelectionChanged}
          // onGridReady={this.onGridReady}
        ></AgGridReact>
      </div>

      <div className="buttons-container">
        <Button variant="success" onClick={printStudents}>
          Stampa Allieve Selezionate
        </Button>
      </div>
    </div>
  );
}

export default StudentsPage;
