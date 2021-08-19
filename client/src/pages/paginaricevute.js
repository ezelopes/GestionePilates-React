import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import FilteredReceiptsModal from '../components/filtered_receipts_modal'
import formatDate from '../helpers/format-date-for-input-date';
import orderReceiptsBasedOnReceiptNumber from '../helpers/order-receipts';
import reverseDate from '../helpers/reverse-date-for-input-date';

const pdfTemplateMaggiorenni = require('../pdfTemplates/pdf-template-maggiorenni');
const pdfTemplateMinorenni = require('../pdfTemplates/pdf-template-minorenni');

const pdfTemplateQuotaAssociativaMaggiorenni = require('../pdfTemplates/pdf-template-quota-associativa-maggiorenni');
const pdfTemplateQuotaAssociativaMinorenni = require('../pdfTemplates/pdf-template-quota-associativa-minorenni');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');

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
  const [selectedReceipts, setSelectedReceipts] = useState([]);
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
      
      const orderedReceipts = orderReceiptsBasedOnReceiptNumber(body)

      setAllReceipts(orderedReceipts);
      setCurrentReceipts(orderedReceipts);
    };
    fetchData();
    gridOptions.api.sizeColumnsToFit();

    window.addEventListener('resize', () => { gridOptions.api.sizeColumnsToFit(); })

  }, []);

  const onReceiptSelectionChanged = () => {
    const selectedNodes = gridOptions.api.getSelectedNodes();
    if (selectedNodes.length === 0) return setSelectedReceipts([]);

    const receipts = []
    selectedNodes.forEach(node => {
      receipts.push(node.data)
    });

    setSelectedReceipts(receipts);
  }

  const printReceipts = async () => {    
    try {
      if (selectedReceipts.length === 0) return alert('Seleziona Ricevute per Stamparle');

      const finalDocumentDefinition = { 
        info: { author: "Roxana Carro", subject: "Ricevute", title: "Ricevute Multiple" }, 
        pageMargins: [40, 5, 40, 0], 
        content: [],
      }

      for (const [index, data] of selectedReceipts.entries()) {
        console.log(index)
        let documentDefinition;

        const studentInfo = {
          Maggiorenne: data.Maggiorenne,
          CodiceFiscale: data.CodiceFiscale,
          Nome: data.Nome,
          Cognome: data.Cognome,
          Citta: data.Citta,
          Indirizzo: data.Indirizzo,
          Cellulare: data.Cellulare,
          Email: data.Email,
          DataIscrizione: data.DataIscrizione,
          DataCertificato: data.DataCertificato,
          DataNascita: data.DataNascita,
          LuogoNascita: data.LuogoNascita,
          Disciplina: data.Disciplina,
          Corso: data.Corso,
          Scuola: data.Scuola,
          NomeGenitore: data.NomeGenitore,
          CognomeGenitore: data.CognomeGenitore,
          CodiceFiscaleGenitore: data.CodiceFiscaleGenitore
        }
        
        const receiptInfo = {
          NumeroRicevuta: data.NumeroRicevuta,
          SommaEuro: data.SommaEuro,
          TipoPagamento: data.TipoPagamento,
          TipoRicevuta: data.TipoRicevuta,
          DataRicevuta: data.DataRicevuta,
          DataInizioCorso: data.DataInizioCorso,
          DataScadenzaCorso: data.DataScadenzaCorso
        }

        if (studentInfo.Maggiorenne === 'Maggiorenne' && receiptInfo.TipoRicevuta === 'Quota') 
          documentDefinition = await pdfTemplateMaggiorenni.default(studentInfo, receiptInfo);
        else if (studentInfo.Maggiorenne === 'Maggiorenne' && receiptInfo.TipoRicevuta.toUpperCase() === 'QUOTA ASSOCIATIVA')
          documentDefinition = await pdfTemplateQuotaAssociativaMaggiorenni.default(studentInfo, receiptInfo);
        else if (studentInfo.Maggiorenne === 'Minorenne' && receiptInfo.TipoRicevuta === 'Quota')
          documentDefinition = await pdfTemplateMinorenni.default(studentInfo, receiptInfo);
        else if (studentInfo.Maggiorenne === 'Minorenne' && receiptInfo.TipoRicevuta.toUpperCase() === 'QUOTA ASSOCIATIVA')
          documentDefinition = await pdfTemplateQuotaAssociativaMinorenni.default(studentInfo, receiptInfo);

        console.log('documentDefinition', documentDefinition)
        if (index % 2 == 1) {
          console.log(documentDefinition.content[documentDefinition.content.length - 1])
          documentDefinition.content[documentDefinition.content.length - 1].pageBreak = "after"
          documentDefinition.content[documentDefinition.content.length - 1].canvas = []
        }
        Array.prototype.push.apply(finalDocumentDefinition.content, documentDefinition.content);
      }

      console.log('finalDocumentDefinition', finalDocumentDefinition)
      pdfMake.createPdf(finalDocumentDefinition).open();
    } catch (error) {
      console.log(error);
    }
  };

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
    
    const copy = [...receipts]
    const orderedReceipts = orderReceiptsBasedOnReceiptNumber(copy)

    setFilteredReceipts(orderedReceipts)
    setFilteredTotalAmount(filteredAmount)
    setShowFilteredAmountModal(true)
  }

  const orderReceipts = () => {
    const copy = [...currentReceipts]
    const orderedReceipts = orderReceiptsBasedOnReceiptNumber(copy)

    setCurrentReceipts(orderedReceipts)
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


        </div>
        
        <div className="filter-form" style={{ marginTop: '-2em'}}>
          <Button variant="success" onClick={calculateAmountBetweenDates} style={{ marginTop: '1.2em' }}>
            Calcola Importo Totale
          </Button>
          
          <Button variant="primary" onClick={filterReceipts} style={{ marginTop: '1.2em' }}>
            Filtra
          </Button>
          
          <Button variant="primary" onClick={orderReceipts} style={{ marginTop: '1.2em' }}>
            Ordina per Numero Ricevuta
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
            onSelectionChanged={onReceiptSelectionChanged}
          ></AgGridReact>
        </div>
        
        {/* printReceipts */}
        <Button variant="success" onClick={printReceipts} style={{ marginTop: '1.2em' }}>
          Stampa Ricevute Selezionate
        </Button>
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
