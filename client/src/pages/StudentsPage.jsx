import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import axios from 'axios';
import FilterStudentsForm from '../components/students/FilterStudentsForm';

import { printSelectedStudents } from '../helpers/printPDF';
import { gridOptionsDefaultStudents as gridOptions } from '../commondata/grid.config';

import Translation from '../components/common/Translation';
import PrintStudentsForm from '../components/students/PrintStudentsForm/PrintStudentsForm';
import { withReactQuery } from '../components/common/withReactQuery/withReactQuery';

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
  const cachedStudents = JSON.parse(sessionStorage.getItem('studentsList'));

  const [selectedStudents, setSelectedStudents] = useState([]);

  const {
    data,
    isLoading: isStudentsLoading,
    isError: isStudentsError,
  } = useQuery(['students'], async () => (await axios.get('/api/student/getStudents')).data, {
    enabled: !cachedStudents || cachedStudents.length === 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (responseData) => {
      sessionStorage.setItem('studentsList', JSON.stringify(responseData));
    },
  });

  const students = cachedStudents || data;

  const onStudentSelectionChanged = () => {
    const selectedNodes = gridOptions.api.getSelectedNodes();

    const studentsData = selectedNodes.map((node) => node.data);

    return setSelectedStudents(studentsData);
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

  if (isStudentsLoading) {
    return <Spinner animation="border" role="status" className="spinner" />;
  }

  if (isStudentsError) {
    return (
      <Alert variant="danger">
        <Translation value="common.requestFailed" />
      </Alert>
    );
  }

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

export default withReactQuery(StudentsPage);
