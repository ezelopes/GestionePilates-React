import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  {
    headerName: 'Codice Fiscale',
    field: 'CodiceFiscale',
    cellRendererFramework: params => {
      return <Link to={`/paginaallieve/${params.data.CodiceFiscale}`}>{params.value}</Link>;
    }
  },
  { headerName: 'Maggiorenne', field: 'Maggiorenne' },
  { headerName: 'Nome', field: 'Nome' },
  { headerName: 'Cognome', field: 'Cognome' },
  { headerName: 'Citta', field: 'Citta' },
  { headerName: 'Indirizzo', field: 'Indirizzo' },
  { headerName: 'Cellulare', field: 'Cellulare' },
  { headerName: 'Email', field: 'Email' },
  { headerName: 'Data Iscrizione', field: 'DataIscrizione', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Certificato', field: 'DataCertificato', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Nascita', field: 'DataNascita', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Data Green Pass', field: 'DataGreenPass', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Luogo Nascita', field: 'LuogoNascita' },
  { headerName: 'Disciplina', field: 'Disciplina' },
  { headerName: 'Corso', field: 'Corso' },
  { headerName: 'Scuola', field: 'Scuola' },
  { headerName: 'Codice Fiscale Genitore', field: 'CodiceFiscaleGenitore' },
  { headerName: 'Nome Genitore', field: 'NomeGenitore' },
  { headerName: 'Cognome Genitore', field: 'CognomeGenitore' }
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

const PaginaAllieve = () => {
  const [gridOptions] = useState(gridOptionsDefault);
  const [columnDefs] = useState(columnsDefinition);
  const [rowData, setRowData] = useState();
  
  const filterNameRef = useRef();
  const filterSurnameRef = useRef();
  const filterCityRef = useRef();
  const filterAgeRef = useRef();

  const ages = [ null, 'Maggiorenne', 'Minorenne' ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/allieva/getAllieve');
      const body = await result.json();
      setRowData(body);
      sessionStorage.setItem('listaAllieve', JSON.stringify(body));
    };
    
    if (!sessionStorage.getItem('listaAllieve') || (sessionStorage.getItem('listaAllieve') === [])) fetchData();
    else {
      const listaAllieveCached = JSON.parse(sessionStorage.getItem('listaAllieve'));
      setRowData(listaAllieveCached)
    }
  }, []);

  const clearFilters = () => {
    const filterColumns = ['Maggiorenne', 'Nome', 'Cognome', 'Citta']

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
    const filterInstance = gridOptions.api.getFilterInstance('Maggiorenne');

    filterInstance.setModel({
        type: 'contains',
        filter: age
    });

    gridOptions.api.onFilterChanged();
  }

  const viewStudentName = (studentName) => {
    const studentNameFilterComponent = gridOptions.api.getFilterInstance('Nome');

    studentNameFilterComponent.setModel({
        type: 'contains',
        filter: studentName
    });

    gridOptions.api.onFilterChanged();
  }
  
  const viewStudentSurname = (studentSurname) => {
    const studentSurnameFilterComponent = gridOptions.api.getFilterInstance('Cognome');

    studentSurnameFilterComponent.setModel({
        type: 'contains',
        filter: studentSurname
    });

    gridOptions.api.onFilterChanged();
  }
  
  const viewStudentCity = (studentCity) => {
    const studentCityFilterComponent = gridOptions.api.getFilterInstance('Citta');

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
          <Form.Control ref={filterNameRef} type="text" placeholder="Nome Allieva..." onChange={(e) => { viewStudentName(e.target.value) }}/> 
        </Form.Group>
        
        <Form.Group>
          <Form.Label> Cognome Allieva </Form.Label> 
          <Form.Control ref={filterSurnameRef} type="text" placeholder="Cognome Allieva..." onChange={(e) => { viewStudentSurname(e.target.value) }}/> 
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

      <div className="ag-theme-balham" style={{ height: '60vh', width: '100%' }}>
        <AgGridReact
          reactNext={true}
          rowSelection="multiple"
          scrollbarWidth
          rowHeight="45"
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          rowData={rowData}
          // onGridReady={this.onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default PaginaAllieve;
