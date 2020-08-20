import React from 'react';
import { Button } from 'react-mdl';
import 'react-widgets/dist/css/react-widgets.css';
import simpleNumberLocalizer from 'react-widgets-simple-number';
import { Combobox } from 'react-widgets';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import formatDate from '../helpers/format-date-for-input-date';

moment.locale('es');
momentLocalizer();

simpleNumberLocalizer();

const FormCreaRicevuta = ({ CodiceFiscale }) => {
  const today = formatDate(new Date(), true);
  let tipoRicevuta = [
    { id: 0, tipo: 'Quota' },
    { id: 1, tipo: 'Quota Associativa' },
  ];
  let tipoPagamento = [
    { id: 0, tipo: 'Contanti' },
    { id: 1, tipo: 'Assegno' },
    { id: 2, tipo: 'Bonifico' }
  ];
  let sommaEuro = [
    { id: 0, somma: '90' },
    { id: 1, somma: '120' },
    { id: 2, somma: '150' }
  ];

  const creaRicevuta = async () => {
    // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
    if (document.getElementById('textNumeroRicevuta').value === '') {
      document.getElementById('textNumeroRicevuta').style.borderColor = 'red';
      return;
    }

    let infoRicevuta = {
      NumeroRicevuta: document.getElementById('textNumeroRicevuta').value,
      DataRicevuta: document.getElementById('dtpDataRicevuta').value,
      DataInizioCorso: document.getElementById('dtpDataInizioCorso').value,
      DataScadenzaCorso: document.getElementById('dtpDataScadenzaCorso').value,
      SommaEuro: document.getElementById('comboboxSommaEuro_input').value,
      TipoPagamento: document.getElementById('comboboxTipoPagamento_input').value,
      TipoRicevuta: document.getElementById('comboboxTipoRicevuta_input').value,
      CodiceFiscale: CodiceFiscale
    };
    const tipoRicevuta = document.getElementById('comboboxTipoRicevuta_input').value;
    if (tipoRicevuta === 'Quota Associativa') {
      delete infoRicevuta.DataInizioCorso;
      delete infoRicevuta.DataScadenzaCorso;
    }

    const response = await fetch('/api/creaRicevuta', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoRicevuta)
    });
    const responseParsed = await response.json();
    alert(responseParsed.message);
    window.location.reload();
  };

  return (
    <div className="formWrapper">
      <form className="formCreaRicevuta">
        <label id="labelNumRicevuta"> Numero Ricevuta </label>
        <input type="text" id="textNumeroRicevuta" placeholder="Inserisci Numero Ricevuta..." />
        <label id="labelRicevuta"> Tipo Ricevuta </label>
        <Combobox
          id="comboboxTipoRicevuta"
          data={tipoRicevuta}
          defaultValue={tipoRicevuta[0]}
          valueField="id"
          textField="tipo"
          caseSensitive={false}
          filter="contains"
        />
        <label id="labelPagamento"> Tipo Pagamento </label>
        <Combobox
          id="comboboxTipoPagamento"
          data={tipoPagamento}
          defaultValue={tipoPagamento[0]}
          valueField="id"
          textField="tipo"
          caseSensitive={false}
          filter="contains"
        />
        <label id="labelSomma"> Somma Euro </label>
        <Combobox
          id="comboboxSommaEuro"
          data={sommaEuro}
          defaultValue={sommaEuro[0]}
          valueField="id"
          textField="somma"
          caseSensitive={false}
          filter="contains"
        />

        <label id="labelDataRicevuta"> Data Ricevuta </label>
        <input id="dtpDataRicevuta" type="date" defaultValue={today} />

        <label id="labelDataInizioCorso"> Data Inizio Corso </label>
        <input id="dtpDataInizioCorso" type="date" defaultValue={today} />

        <label id="labelDataScadenzaCorso"> Data Scadenza Corso </label>
        <input id="dtpDataScadenzaCorso" type="date" defaultValue={today} />
        
      </form>
      <Button raised ripple id="buttonCreaRicevuta" onClick={creaRicevuta}>
        Crea Ricevuta
      </Button>
    </div>
  );
};

export default FormCreaRicevuta;
