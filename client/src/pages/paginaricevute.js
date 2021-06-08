import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Form } from 'react-bootstrap';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnsDefinition = [
  { headerName: 'Nome', field: 'Nome' },
  { headerName: 'Cognome', field: 'Cognome' },
  { headerName: 'N° Ricevuta', field: 'NumeroRicevuta' },
  { headerName: 'Inizio Corso', field: 'DataInizioCorso', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Scadenza Corso', field: 'DataScadenzaCorso', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
  { headerName: 'Somma Euro', field: 'SommaEuro' },
  { headerName: 'Tipo Pagamento', field: 'TipoPagamento' }
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

const years = [ null, 2019, 2020, 2021, 2022, 2023 ];
const paymentMethods = [ null, 'Contanti', 'Bonifico Bancario', 'Assegno' ];

function PaginaAllieve() {
  const [gridOptions] = useState(gridOptionsDefault);
  const [columnDefs] = useState(columnsDefinition);
  const [rowData, setRowData] = useState();

  const selectYearRef = useRef();
  const selectPaymentMethodRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/ricevuta/getAllRicevute');
      const body = await result.json();
      setRowData(body);
    };
    fetchData();
    gridOptions.api.sizeColumnsToFit();

    window.addEventListener('resize', () => { gridOptions.api.sizeColumnsToFit(); })
  }, []);

  const visualizzaAnno = (anno) => {
    const NumeroRicevutaFilterComponent = gridOptions.api.getFilterInstance('NumeroRicevuta');

    if (anno == '') NumeroRicevutaFilterComponent.setModel(null);
    else {
      const endDigits = anno.substr(anno.length - 2);
      NumeroRicevutaFilterComponent.setModel({
          type: 'endsWith',
          filter: `/${endDigits}`
      });
    }

    gridOptions.api.onFilterChanged();
  }
  
  const viewPaymentMethod = (method) => {
    const PaymentMethodFilterComponent = gridOptions.api.getFilterInstance('TipoPagamento');

    if (method == '') PaymentMethodFilterComponent.setModel(null);
    else {
      PaymentMethodFilterComponent.setModel({
          type: 'endsWith',
          filter: method
      });
    }

    gridOptions.api.onFilterChanged();
  }

  const visualizzaTutte = () => {
    const NumeroRicevutaFilterComponent = gridOptions.api.getFilterInstance('NumeroRicevuta');
    const PaymentMethodFilterComponent = gridOptions.api.getFilterInstance('TipoPagamento');
    
    NumeroRicevutaFilterComponent.setModel(null);
    PaymentMethodFilterComponent.setModel(null);
    gridOptions.api.onFilterChanged();

    // set default values in other components
    selectYearRef.current.value = null;
    selectPaymentMethodRef.current.value = null;
  }

  return (
    <>
      <div className="page-body">
        <div className="filter-form">
          <Form.Label> Seleziona Anno: </Form.Label>
          <Form.Control ref={selectYearRef} as="select" onChange={({ target }) => { visualizzaAnno(target.value) } } style={{ width: '10vw' }}>
            { years.map(year => <option key={`select_${year}`} value={year}> {year} </option>) }
          </Form.Control>
          
          <Form.Label> Seleziona Tipo Pagamento: </Form.Label>
          <Form.Control ref={selectPaymentMethodRef} as="select" onChange={({ target }) => { viewPaymentMethod(target.value) } } style={{ width: '10vw' }}>
            { paymentMethods.map(method => <option key={`select_${method}`} value={method}> {method} </option>) }
          </Form.Control>

          <Button id="buttonVisualizzaTutteRicevute" onClick={visualizzaTutte}>
            Rimuovi Filtri
          </Button>
        </div>

        <div className="ag-theme-balham" style={{ height: '40em', width: '100%' }}>
          <AgGridReact
            reactNext={true}
            rowSelection="multiple"
            scrollbarWidth
            rowHeight="45"
            gridOptions={gridOptions}
            columnDefs={columnDefs}
            rowData={rowData}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
}

export default PaginaAllieve;
