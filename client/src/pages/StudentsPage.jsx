import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FilterStudentsForm from '../components/students/FilterStudentsForm';

import { getAllStudents } from '../helpers/apiCalls';
import { printSelectedStudents } from '../helpers/printPDF';
import { gridOptionsDefaultStudents } from '../commondata/grid.config';

import Translation from '../components/common/Translation';
import PrintStudentsForm from '../components/students/PrintStudentsForm/PrintStudentsForm';

const columnsDefinition = [
  { headerName: 'Seleziona', checkboxSelection: true, headerCheckboxSelection: true },
  {
    headerName: 'Codice Fiscale',
    field: 'TaxCode',
    // eslint-disable-next-line react/prop-types
    cellRendererFramework: ({ data, value }) => <Link to={`/students/${data.TaxCode}`}>{value}</Link>,
  },
  { headerName: 'Età', field: 'IsAdult' },
  { headerName: 'Nome', field: 'Name' },
  { headerName: 'Cognome', field: 'Surname' },
  { headerName: 'Citta', field: 'City' },
  { headerName: 'Indirizzo', field: 'Address' },
  { headerName: 'Cellulare', field: 'MobilePhone' },
  { headerName: 'Email', field: 'Email' },
  {
    headerName: 'Data Iscrizione',
    field: 'RegistrationDate',
    cellRenderer: (params) => (params.value !== null ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Data Scadenza Certificato',
    field: 'CertificateExpirationDate',
    cellRenderer: (params) => (params.value !== null ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Data Nascita',
    field: 'DOB',
    cellRenderer: (params) => (params.value !== null ? new Date(params.value).toLocaleDateString() : ''),
  },
  {
    headerName: 'Data Green Pass',
    field: 'GreenPassExpirationDate',
    cellRenderer: (params) => (params.value !== null ? new Date(params.value).toLocaleDateString() : ''),
  },
  { headerName: 'Luogo Nascita', field: 'BirthPlace' },
  { headerName: 'Disciplina', field: 'Discipline' },
  { headerName: 'Corso', field: 'Course' },
  { headerName: 'Scuola', field: 'School' },
  { headerName: 'Codice Fiscale Genitore', field: 'ParentTaxCode' },
  { headerName: 'Nome Genitore', field: 'ParentName' },
  { headerName: 'Cognome Genitore', field: 'ParentSurname' },
];

const StudentsPage = () => {
  const [gridOptions] = useState(gridOptionsDefaultStudents);

  const [students, setStudents] = useState();
  const [selectedStudents, setSelectedStudents] = useState([]);

  const onGridReady = () => {
    const fetchData = async () => {
      const { allStudents } = await getAllStudents();
      setStudents(allStudents);
    };

    if (!sessionStorage.getItem('studentsList') || sessionStorage.getItem('studentsList').length === 0) {
      fetchData();
    } else {
      const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
      setStudents(studentListCached);
    }
  };

  const onStudentSelectionChanged = () => {
    const selectedNodes = gridOptions.api.getSelectedNodes();
    if (selectedNodes.length === 0) {
      return setSelectedStudents([]);
    }

    const currentSelectedStudents = [];
    selectedNodes.forEach((node) => {
      currentSelectedStudents.push(node.data);
    });

    return setSelectedStudents(currentSelectedStudents);
  };

  const filterColumn = (columnName, value) => {
    const columnFilterComponent = gridOptions.api.getFilterInstance(columnName);

    columnFilterComponent.setModel({
      type: 'contains',
      filter: value,
    });

    gridOptions.api.onFilterChanged();
  };

  const clearColumns = (filterColumns) => {
    filterColumns.forEach((columnName) => {
      const filterComponent = gridOptions.api.getFilterInstance(columnName);
      filterComponent.setModel(null);
    });

    gridOptions.api.onFilterChanged();
  };

  return (
    <>
      <div className="container-fluid">
        <FilterStudentsForm filterColumn={filterColumn} clearColumns={clearColumns} />

        <div className="ag-theme-alpine ag-grid-custom">
          <AgGridReact
            reactNext
            gridOptions={gridOptions}
            columnDefs={columnsDefinition}
            rowData={students}
            onSelectionChanged={onStudentSelectionChanged}
            onGridReady={onGridReady}
          />
        </div>

        <div className="buttons-container">
          <Button variant="success" onClick={() => printSelectedStudents(selectedStudents)}>
            <span role="img" aria-label="print">
              🖨️ <Translation value="buttons.student.printSelectedStudents" />
            </span>
          </Button>
        </div>
      </div>

      {students && <PrintStudentsForm students={students} />}
    </>
  );
};

export default StudentsPage;
