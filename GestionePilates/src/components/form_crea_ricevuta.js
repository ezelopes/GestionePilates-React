import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Textfield } from 'react-mdl';
// import { ComboBox } from '@progress/kendo-react-dropdowns';
import 'react-widgets/dist/css/react-widgets.css';
import simpleNumberLocalizer from 'react-widgets-simple-number';
import { Combobox, DateTimePicker } from 'react-widgets';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

moment.locale('es');
momentLocalizer();
// combobox ?

simpleNumberLocalizer();

const FormCreaRicevuta = () => {
  let tipoPagamento = [
    { id: 0, tipo: 'Contanti' },
    { id: 1, tipo: 'Carta di Credito' },
    { id: 2, tipo: 'Bonifico' }
  ];
  let sommaEuro = [
    { id: 0, somma: '90' },
    { id: 1, somma: '120' },
    { id: 2, somma: '150' }
  ];

  return (
    <div className="formCreaRicevuta">
      <label id="labelNumRicevuta"> Numero Ricevuta </label>
      {/* <Textfield></Textfield> */}
      <input type="text" id="textNumeroRicevuta" placeholder="Inserisci Numero Ricevuta..." />
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
      <label id="labelDataInizio"> Data Inizio </label>
      <DateTimePicker
        id="dtpDataInizio"
        defaultValue={new Date()}
        format="dddd - DD / MM / YYYY"
        time={false}
      />
      <label id="labelDataScadenza"> Data Scadenza </label>
      <DateTimePicker
        id="dtpDataScadenza"
        defaultValue={new Date()}
        format="dddd - DD / MM / YYYY"
        time={false}
      />
      <Button raised ripple id="buttonCreaRicevuta">
        Crea Ricevuta
      </Button>
    </div>
  );
};

// NumberPicker format="-$#,###.00"

export default FormCreaRicevuta;
