import React from 'react';
import { Button } from 'react-mdl';
import 'react-widgets/dist/css/react-widgets.css';
import simpleNumberLocalizer from 'react-widgets-simple-number';
import { Combobox, DateTimePicker } from 'react-widgets';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

moment.locale('es');
momentLocalizer();

simpleNumberLocalizer();

const FormCreaAllieva = ({ CodiceFiscale }) => {
  let eta = [
    { id: 0, eta: 'Maggiorenne' },
    { id: 1, eta: 'Minorenne' }
  ];

  const creaAllieva = async () => {
    // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
    // if (document.getElementById('textNumeroRicevuta').value === '') {
    //   document.getElementById('textNumeroRicevuta').style.borderColor = 'red';
    //   return;
    // }
    const response = await fetch('/api/creaAllieva', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + idToken
      },
      body: JSON.stringify({})
    });
    const responseParsed = await response.json();
    alert(responseParsed.message);
  };

  const resetForm = () => {};

  return (
    <>
      <div className="formCreaRicevuta">
        <label id="labelEta"> Età </label>
        <Combobox
          id="comboboxEta"
          data={eta}
          defaultValue={eta[0]}
          valueField="id"
          textField="eta"
          caseSensitive={false}
          filter="contains"
        />

        <label id="labelCodiceFiscale"> Codice Fiscale </label>
        <input type="text" id="textCodiceFiscale" placeholder="Inserisci Codice Fiscale..." />

        <label id="labelNomeAllieva"> Nome Allieva </label>
        <input type="text" id="textNomeAllieva" placeholder="Inserisci Nome Allieva..." />

        <label id="labelCognomeAllieva"> Cognome Allieva </label>
        <input type="text" id="textCognomeAllieva" placeholder="Inserisci Cognome Allieva..." />

        <label id="labelCitta"> Citta </label>
        <input type="text" id="textCitta" placeholder="Inserisci Citta..." />

        <label id="labelIndirizzo"> Indirizzo </label>
        <input type="text" id="textIndirizzo" placeholder="Inserisci Indirizzo..." />

        <label id="labelCellulare"> Cellulare </label>
        <input type="text" id="textCellulare" placeholder="Inserisci Cellulare..." />

        <label id="labelEmail"> Email </label>
        <input type="text" id="textEmail" placeholder="Inserisci Email..." />

        <label id="labelLuogoNascita"> Luogo Nascita </label>
        <input type="text" id="textLuogoNascita" placeholder="Inserisci LuogoNascita..." />

        <label id="labelDisciplina"> Disciplina </label>
        <input type="text" id="textDisciplina" placeholder="Inserisci Disciplina..." />

        <label id="labelDataIscrizione"> Data Iscrizione </label>
        <DateTimePicker id="dtpDataIscrizione" defaultValue={new Date()} format="MM/DD/YYYY" time={false} />

        <label id="labelDataCertificato"> Data Certificato </label>
        <DateTimePicker id="dtpDataCertificato" defaultValue={new Date()} format="MM/DD/YYYY" time={false} />

        <label id="labelDataNascita"> Data Nascita </label>
        <DateTimePicker id="dtpDataNascita" defaultValue={new Date()} format="MM/DD/YYYY" time={false} />

        <label id="labelCodiceFiscaleGenitore"> Codice Fiscale Genitore </label>
        <input
          type="text"
          id="textCodiceFiscaleGenitore"
          placeholder="Inserisci Codice Fiscale Genitore..."
        />

        <label id="labelNomeGenitore"> Nome Genitore </label>
        <input type="text" id="textNomeGenitore" placeholder="Inserisci Nome Genitore..." />

        <label id="labelCognomeGenitore"> Cognome Genitore </label>
        <input type="text" id="textCognomeGenitore" placeholder="Inserisci Cognome Genitore..." />

        <Button raised ripple id="buttonCreaAllieva" onClick={creaAllieva}>
          Crea Allieva
        </Button>
      </div>
      <Button raised ripple id="buttonCreaAllieva" onClick={resetForm} style={{ marginTop: '2em' }}>
        Reset Form
      </Button>
    </>
  );
};

export default FormCreaAllieva;
