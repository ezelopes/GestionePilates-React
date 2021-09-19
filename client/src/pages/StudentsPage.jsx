import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import toastConfig from '../helpers/toast.config';

import 'react-toastify/dist/ReactToastify.css';

const StudentsDataTemplate = require('../pdfTemplates/StudentsDataTemplate');
const StudentsDataGreenPassTemplate = require('../pdfTemplates/StudentsDataGreenPassTemplate');

import { ages, months, years } from '../commondata/commondata'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Divider from '../components/Divider';

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
  const [selectedMonth, setselectedMonth] = useState(months[0].id)
  const [selectedYearGreenPass, setSelectedYearGreenPass] = useState(years[0].id)
  
  const filterNameRef = useRef();
  const filterSurnameRef = useRef();
  const filterCityRef = useRef();
  const filterAgeRef = useRef();
  
  const dropdownAges = [ null, ages[0].age, ages[1].age ];

  const onGridReady = () => {    
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
  };

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

  const filterColumn = (columnName, value) => {
    const columnFilterComponent = gridOptions.api.getFilterInstance(columnName);
  
    columnFilterComponent.setModel({
        type: 'contains',
        filter: value
    });
  
    gridOptions.api.onFilterChanged();
  }

  const printSelectedStudents = async () => {
    try {
      if (selectedStudents.length === 0) return toast.error('Seleziona Allieve per Stamparle', toastConfig);
      const documentDefinition = await StudentsDataTemplate.default(selectedStudents);

      pdfMake.createPdf(documentDefinition).open();
    } catch (err) {
      console.log(err)
    }
  }

  const printStudentsBasedOnRegistrationDate = async () => {
    try {
      const studentsWithExpiringGreenPass =  students.filter(({ RegistrationDate, GreenPassExpirationDate, IsAdult }) => {
        if (RegistrationDate) {
          const RegistrationDateFormatted = new Date(RegistrationDate)
          console.log(!!GreenPassExpirationDate)
          return RegistrationDateFormatted.getMonth() === selectedMonth && RegistrationDateFormatted.getFullYear() === selectedYearGreenPass && IsAdult === ages[0].age && !!GreenPassExpirationDate
        }
      })

      const month = months.find(({ id }) => id == selectedMonth).month

      if (studentsWithExpiringGreenPass.length > 0) {
        const documentDefinition = await StudentsDataTemplate.default(
          studentsWithExpiringGreenPass, 
          month.toUpperCase(),
          selectedYearGreenPass
        );

        pdfMake.createPdf(documentDefinition).open();
      } else {
        toast.error(`Nessuna allieva iscritta nel ${month} ${selectedYearGreenPass}`, toastConfig);
      }

    } catch (err) {
      console.log(err)
    }
  }

  const printStudentsWithExpiringGreenPass = async () => {
    try {
      const studentsWithExpiringGreenPass =  students.filter(({ GreenPassExpirationDate }) => {
        if (GreenPassExpirationDate) {
          const GreenPassExpirationDateFormatted = new Date(GreenPassExpirationDate)
          return GreenPassExpirationDateFormatted.getMonth() === selectedMonth && GreenPassExpirationDateFormatted.getFullYear() === selectedYearGreenPass
        }
      })

      const month = months.find(({ id }) => id == selectedMonth).month

      if (studentsWithExpiringGreenPass.length > 0) {
        const documentDefinition = await StudentsDataGreenPassTemplate.default(
          studentsWithExpiringGreenPass, 
          month.toUpperCase(),
          selectedYearGreenPass
        );

        pdfMake.createPdf(documentDefinition).open();
      } else {
        toast.error(`Nessuna allieva con Scadenza Green Pass nel ${month} ${selectedYearGreenPass}`, toastConfig);
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>    
      <ToastContainer />

      <div className="page-body">
        <div className="filter-form">

          <Form.Group>
            <Form.Label> Nome Allieva </Form.Label> 
            <Form.Control ref={filterNameRef} type="text" placeholder="Inserisci Nome..." onChange={(e) => { filterColumn('Name', e.target.value) }}/> 
          </Form.Group>
          
          <Form.Group>
            <Form.Label> Cognome Allieva </Form.Label> 
            <Form.Control ref={filterSurnameRef} type="text" placeholder="Inserisci Cognome..." onChange={(e) => { filterColumn('Surname', e.target.value) }}/> 
          </Form.Group>
          
          <Form.Group>
            <Form.Label> Città </Form.Label> 
            <Form.Control ref={filterCityRef} type="text" placeholder="Città..." onChange={(e) => { filterColumn('City', e.target.value) }}/> 
          </Form.Group>

          <Form.Group>
            <Form.Label> Età </Form.Label> 
            <Form.Control ref={filterAgeRef} as="select" onChange={({ target }) => { filterColumn('IsAdult', target.value) } }>
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
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>

        <Divider />

        <div className="buttons-container">
          <Button variant="success" onClick={printSelectedStudents}>
            Stampa Allieve Selezionate
          </Button>
        </div>

        <div className="form-wrapper green-pass-form">
          <Form.Group>
            <Form.Label> Mese </Form.Label> 
            <Form.Control ref={filterAgeRef} as="select" onChange={({ target }) => { setselectedMonth(parseInt(target.value)) } }>
                { months.map(month => <option key={`select_${month.id}`} value={month.id}> {month.month} </option>) }
              </Form.Control>
          </Form.Group>
          
          <Form.Group>
            <Form.Label> Anno </Form.Label> 
            <Form.Control ref={filterAgeRef} as="select" onChange={({ target }) => { setSelectedYearGreenPass(parseInt(target.value)) } }>
                { years.map(year => <option key={`select_${year.id}`} value={year.id}> {year.year} </option>) }
              </Form.Control>
          </Form.Group>

          <Button variant="success" onClick={printStudentsWithExpiringGreenPass} style={{ marginTop: '1em' }}>
            Stampa Allieve (Green Pass)
          </Button>
          
          <Button variant="success" onClick={printStudentsBasedOnRegistrationDate} style={{ marginTop: '1em' }}>
            Stampa Allieve (Data Iscrizione)
          </Button>
        </div>
      </div>
    </>
  );
}

export default StudentsPage;
