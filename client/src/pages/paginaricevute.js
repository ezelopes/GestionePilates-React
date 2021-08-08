import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Form } from 'react-bootstrap';
import FilteredReceiptsModal from '../components/filtered_receipts_modal'
import formatDate from '../helpers/format-date-for-input-date';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import reverseDate from '../helpers/reverse-date-for-input-date';

const columnsDefinition = [
  { headerName: 'N° Ricevuta', field: 'NumeroRicevuta', checkboxSelection: true },
  { headerName: 'Nome', field: 'Nome' },
  { headerName: 'Cognome', field: 'Cognome' },
  { headerName: 'Data Ricevuta', field: 'DataRicevuta', cellRenderer: (params) => (params.value !== 'Invalid date') ? params.value : '' },
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
    floatingFilter: true,
    cellStyle: { fontSize: '1.5em' },
    flex: 10
  },
  rowSelection: 'single'
};

const paymentMethods = [ null, 'Contanti', 'Bonifico', 'Assegno' ];

const PaginaAllieve = () => {
  const today = formatDate(new Date(), true);

  const [gridOptions] = useState(gridOptionsDefault);
  const [columnDefs] = useState(columnsDefinition);
  const [allReceipts, setAllReceipts] = useState([]);
  const [currentReceipts, setCurrentReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [filteredTotalAmount, setFilteredTotalAmount] = useState(0);
  const [showFilteredAmountModal, setShowFilteredAmountModal] = useState(false);
  const [filteredPaymentMethod, setFilteredPaymentMethod] = useState(null);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const selectPaymentMethodRef = useRef();
  const fromDateRef = useRef();
  const toDateRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/ricevuta/getAllRicevute');
      const body = await result.json();
      setAllReceipts(body);
      setCurrentReceipts(body);
    };
    fetchData();
    gridOptions.api.sizeColumnsToFit();

    window.addEventListener('resize', () => { gridOptions.api.sizeColumnsToFit(); })

  }, []);

  const filterReceipts = () => {
    const fromDateFormatted = new Date(fromDate)
    const toDateFormatted = new Date(toDate)

    const receiptsWithDateFilter = allReceipts.filter(({ DataRicevuta }) =>
      fromDateFormatted <= new Date(reverseDate(DataRicevuta)) && 
      toDateFormatted >= new Date(reverseDate(DataRicevuta))
    )

    if (!filteredPaymentMethod) {
      return setCurrentReceipts(receiptsWithDateFilter)
    }

    const receiptsWithPaymentAndDateFilters = receiptsWithDateFilter.filter(({ TipoPagamento }) =>
       TipoPagamento.includes(filteredPaymentMethod)
    )

    setCurrentReceipts(receiptsWithPaymentAndDateFilters)
  }

  const clearFilters = () => {
    // const NumeroRicevutaFilterComponent = gridOptions.api.getFilterInstance('NumeroRicevuta');
    const PaymentMethodFilterComponent = gridOptions.api.getFilterInstance('TipoPagamento');
    
    // NumeroRicevutaFilterComponent.setModel(null);
    PaymentMethodFilterComponent.setModel(null);
    gridOptions.api.onFilterChanged();

    // set default values in other components
    // selectYearRef.current.value = null;
    selectPaymentMethodRef.current.value = null;
    fromDateRef.current.value = today
    toDateRef.current.value = today

    setCurrentReceipts(allReceipts)
  }

  const calculateAmountBetweenDates = () => {
    if (!filteredPaymentMethod) return alert("Seleziona Tipo di Pagamento!")

    const fromDateFormatted = new Date(fromDate)
    const toDateFormatted = new Date(toDate)

    const receipts = allReceipts.filter(({ DataRicevuta, TipoPagamento }) =>
      fromDateFormatted <= new Date(reverseDate(DataRicevuta)) && 
      toDateFormatted >= new Date(reverseDate(DataRicevuta)) &&
      TipoPagamento.includes(filteredPaymentMethod)
    )

    const filteredAmount = receipts.reduce((accumulator, { SommaEuro }) => {
      return accumulator +  parseFloat(SommaEuro);
    }, 0);
    
    setFilteredReceipts(receipts)
    setFilteredTotalAmount(filteredAmount)
    setShowFilteredAmountModal(true)
  }

  return (
    <>
      <div className="page-body">
        <div className="filter-form">
          
          <Form.Group>
            <Form.Label> Seleziona Tipo Pagamento: </Form.Label>
            <Form.Control ref={selectPaymentMethodRef} as="select" onChange={({ target }) => setFilteredPaymentMethod(target.value)}>
              { paymentMethods.map(method => <option key={`select_${method}`} value={method}> {method} </option>) }
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label> Da: </Form.Label> <br />
            <input ref={fromDateRef} type="date" defaultValue={today} onChange={({ target }) => setFromDate(target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label> A: </Form.Label> <br />
            <input ref={toDateRef} type="date" defaultValue={today} onChange={({ target }) => setToDate(target.value)} />
          </Form.Group>

          <Button variant="success" onClick={calculateAmountBetweenDates} style={{ marginTop: '1.2em' }}>
            Calcola Importo Totale
          </Button>
          
          <Button variant="primary" onClick={filterReceipts} style={{ marginTop: '1.2em' }}>
            Filtra
          </Button>

          <Button variant="danger" onClick={clearFilters} style={{ marginTop: '1.2em' }}>
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
            rowData={currentReceipts}
          ></AgGridReact>
        </div>
      </div>

      <FilteredReceiptsModal 
        showFilteredAmountModal={showFilteredAmountModal}
        setShowFilteredAmountModal={setShowFilteredAmountModal}
        filteredTotalAmount={filteredTotalAmount}
        filteredReceipts={filteredReceipts}
        fromDate={fromDate}
        toDate={toDate}
        filteredPaymentMethod={filteredPaymentMethod}
      />
    </>
  );
}

export default PaginaAllieve;
