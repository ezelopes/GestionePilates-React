import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  {
    headerName: 'Codice Fiscale',
    field: 'TaxCode',
    cellRendererFramework: params => {
      return <Link to={`/paginaallieve/${params.data.TaxCode}`}>{params.value}</Link>;
    }
  },
  { headerName: 'Maggiorenne', field: 'IsAdult' },
  { headerName: 'Nome', field: 'Name' },
  { headerName: 'Cognome', field: 'Surname' },
  { headerName: 'Citta', field: 'City' },
  { headerName: 'Indirizzo', field: 'Address' },
  { headerName: 'Cellulare', field: 'MobilePhone' },
  { headerName: 'Email', field: 'Email' },
  { headerName: 'Data Iscrizione', field: 'RegistrationDate', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Certificato', field: 'CertificateExpirationDate', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Nascita', field: 'DOB', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Green Pass', field: 'GreenPassExpirationDate', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
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
  
  const filterNameRef = useRef();
  const filterSurnameRef = useRef();
  const filterCityRef = useRef();
  const filterAgeRef = useRef();

  const ages = [ null, 'Maggiorenne', 'Minorenne' ];

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
              { ages.map(age => <option key={`select_${age}`} value={age}> {age} </option>) }
            </Form.Control>
        </Form.Group>

        <Button variant="danger" onClick={clearFilters} style={{ marginTop: '1em' }}>
          Rimuovi Filtri
        </Button>
      </div>

      <div className="ag-theme-balham" style={{ height: '60vh', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }}>
        <AgGridReact
          reactNext={true}
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={students}
          // onGridReady={this.onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default StudentsPage;
