import React from 'react';
import { Button } from 'react-mdl';
import 'react-widgets/dist/css/react-widgets.css';
import simpleNumberLocalizer from 'react-widgets-simple-number';
import { Combobox } from 'react-widgets';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import formatDate from '../helpers/format-date-for-input-date';
import commondata from '../commondata/commondata'

moment.locale('es');
momentLocalizer();

simpleNumberLocalizer();

function IscrizioneInsegnanti() {
  const today = formatDate(new Date(), true);

  const discipline = commondata.discipline;
  const corsi = commondata.corsi;
  const scuole = commondata.scuole;

  const creaInsegnante = async () => {
    // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
    if (document.getElementById('textCodiceFiscale').value === '') {
      document.getElementById('textCodiceFiscale').style.borderColor = 'red';
      return;
    }

    const response = await fetch('/api/creaInsegnante', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + idToken
      },
      body: JSON.stringify({
        CodiceFiscale: document.getElementById('textCodiceFiscale').value,
        Nome: document.getElementById('textNomeInsegnante').value,
        Cognome: document.getElementById('textCognomeInsegnante').value,
        Citta: document.getElementById('textCitta').value,
        Indirizzo: document.getElementById('textIndirizzo').value,
        Cellulare: document.getElementById('textCellulare').value,
        Email: document.getElementById('textEmail').value,
        DataIscrizione: document.getElementById('dtpDataIscrizione').value,
        DataCertificato: document.getElementById('dtpDataCertificato').value,
        DataNascita: document.getElementById('dtpDataNascita').value,
        LuogoNascita: document.getElementById('textLuogoNascita').value,
        Disciplina: document.getElementById('comboboxDisciplina_input').value,
        Corso: document.getElementById('comboboxCorso_input').value,
        Scuola: document.getElementById('comboboxScuola_input').value,
      })
    });
    const responseParsed = await response.json();
    alert(responseParsed.message);
    resetForm();
  };

  const resetForm = () => {
    document.getElementById('comboboxDisciplina_input').defaultValue = discipline[0].disciplina;
    document.getElementById('comboboxCorso_input').defaultValue = corsi[0].corso;
    document.getElementById('comboboxScuola_input').defaultValue = scuole[0].scuola;
    document.getElementById('formCreaInsegnante').reset();
  };

  return (
    <>
      <div className="page-body">
        <div className="formWrapper">
          <form id="formCreaInsegnante">

            <label id="labelCodiceFiscale"> Codice Fiscale </label>
            <input type="text" id="textCodiceFiscale" placeholder="Inserisci Codice Fiscale..." />

            <label id="labelNomeInsegnante"> Nome Insegnante </label>
            <input type="text" id="textNomeInsegnante" placeholder="Inserisci Nome Insegnante..." />

            <label id="labelCognomeInsegnante"> Cognome Insegnante </label>
            <input type="text" id="textCognomeInsegnante" placeholder="Inserisci Cognome Insegnante..." />

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
            <Combobox
              id="comboboxDisciplina"
              data={discipline}
              defaultValue={discipline[0]}
              valueField="id"
              textField="disciplina"
              caseSensitive={false}
              filter="contains"
            />

            <label id="labelCorso"> Corso </label>
            <Combobox
              id="comboboxCorso"
              data={corsi}
              defaultValue={corsi[0]}
              valueField="id"
              textField="corso"
              caseSensitive={false}
              filter="contains"
              placeholder="Seleziona Corso..."
            />

            <label id="labelScuole"> Scuola </label>
            <Combobox
              id="comboboxScuola"
              data={scuole}
              defaultValue={scuole[0]}
              valueField="id"
              textField="scuola"
              caseSensitive={false}
              filter="contains"
              placeholder="Seleziona Scuola..."
            />

            <label id="labelDataIscrizione"> Data Iscrizione </label>
            <input id="dtpDataIscrizione" type="date" defaultValue={today} />

            <label id="labelDataCertificato"> Data Certificato </label>
            <input id="dtpDataCertificato" type="date" defaultValue={today} />

            <label id="labelDataNascita"> Data Nascita </label>
            <input id="dtpDataNascita" type="date" defaultValue={today} />

          </form>
          <Button raised ripple id="buttonCreaInsegnante" onClick={creaInsegnante}>
            Crea Insegnante
          </Button>
          <Button raised ripple id="buttonResetForm" onClick={resetForm}>
            Reset Form
          </Button>
        </div>
      </div>
    </>
  );
}

export default IscrizioneInsegnanti;
