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

const FormCreaAllieva = () => {
  const today = formatDate(new Date(), true);

  let eta = [
    { id: 0, eta: 'Maggiorenne' },
    { id: 1, eta: 'Minorenne' }
  ];

  const creaAllieva = async () => {
    // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
    if (document.getElementById('textCodiceFiscale').value === '') {
      document.getElementById('textCodiceFiscale').style.borderColor = 'red';
      return;
    }

    const response = await fetch('/api/creaAllieva', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + idToken
      },
      body: JSON.stringify({
        CodiceFiscale: document.getElementById('textCodiceFiscale').value,
        Maggiorenne: document.getElementById('comboboxEta_input').value, // Maggiorenne,
        Nome: document.getElementById('textNomeAllieva').value,
        Cognome: document.getElementById('textCognomeAllieva').value,
        Citta: document.getElementById('textCitta').value,
        Indirizzo: document.getElementById('textIndirizzo').value,
        Cellulare: document.getElementById('textCellulare').value,
        Email: document.getElementById('textEmail').value,
        DataIscrizione: document.getElementById('dtpDataIscrizione').value,
        DataCertificato: document.getElementById('dtpDataCertificato').value,
        DataNascita: document.getElementById('dtpDataNascita').value,
        LuogoNascita: document.getElementById('textLuogoNascita').value,
        Disciplina: document.getElementById('textDisciplina').value,
        CodiceFiscaleGenitore: document.getElementById('textCodiceFiscaleGenitore').value,
        NomeGenitore: document.getElementById('textNomeGenitore').value,
        CognomeGenitore: document.getElementById('textCognomeGenitore').value
      })
    });
    const responseParsed = await response.json();
    alert(responseParsed.message);
    resetForm();
  };

  const resetForm = () => {
    document.getElementById('comboboxEta_input').defaultValue = eta[0].eta;
    document.getElementById('formCreaAllieva').reset();
  };

  return (
    <>
      <div className="formWrapper">
        <form className="formCreaRicevuta" id="formCreaAllieva">
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
          <input id="dtpDataIscrizione" type="date" defaultValue={today} />

          <label id="labelDataCertificato"> Data Certificato </label>
          <input id="dtpDataCertificato" type="date" defaultValue={today} />

          <label id="labelDataNascita"> Data Nascita </label>
          <input id="dtpDataNascita" type="date" defaultValue={today} />

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
        </form>
        <Button raised ripple id="buttonCreaAllieva" onClick={creaAllieva}>
          Crea Allieva
        </Button>
        <Button raised ripple id="buttonResetForm" onClick={resetForm}>
          Reset Form
        </Button>
      </div>
    </>
  );
};

export default FormCreaAllieva;
