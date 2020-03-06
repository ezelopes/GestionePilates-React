import React from 'react';
import { Button } from 'react-mdl';
import 'react-widgets/dist/css/react-widgets.css';
import simpleNumberLocalizer from 'react-widgets-simple-number';
import { Combobox } from 'react-widgets';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import reverseDate from '../helpers/reverse-date-for-input-date';

moment.locale('es');
momentLocalizer();

simpleNumberLocalizer();

const FormModificaEliminaAllieva = ({ allievaInfo }) => {
  let CodiceFiscale;
  let Maggiorenne;
  let Nome;
  let Cognome;
  let Citta;
  let Indirizzo;
  let Cellulare;
  let Email;
  let DataIscrizione;
  let DataCertificato;
  let DataNascita;
  let LuogoNascita;
  let Disciplina;
  let NomeGenitore;
  let CognomeGenitore;
  let CodiceFiscaleGenitore;
  if (allievaInfo) {
    CodiceFiscale = allievaInfo.CodiceFiscale;
    Maggiorenne = allievaInfo.Maggiorenne;
    Nome = allievaInfo.Nome;
    Cognome = allievaInfo.Cognome;
    Citta = allievaInfo.Citta;
    Indirizzo = allievaInfo.CodiceFiscale;
    Cellulare = allievaInfo.Cellulare;
    Email = allievaInfo.Email;
    DataIscrizione = reverseDate(allievaInfo.DataIscrizione);
    DataCertificato = reverseDate(allievaInfo.DataCertificato);
    DataNascita = reverseDate(allievaInfo.DataNascita);
    LuogoNascita = allievaInfo.LuogoNascita;
    Disciplina = allievaInfo.Disciplina;
    NomeGenitore = allievaInfo.NomeGenitore;
    CognomeGenitore = allievaInfo.CognomeGenitore;
    CodiceFiscaleGenitore = allievaInfo.CodiceFiscaleGenitore;
  }
  let eta = [
    { id: 0, eta: 'Maggiorenne' },
    { id: 1, eta: 'Minorenne' }
  ];

  const modificaAllieva = async () => {
    // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
    if (document.getElementById('textCodiceFiscale').value === '') {
      document.getElementById('textCodiceFiscale').style.borderColor = 'red';
      return;
    }

    const response = await fetch('/api/modificaAllieva', {
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
  };

  const eliminaAllieva = async () => {
    // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
    if (document.getElementById('textCodiceFiscale').value === '') {
      document.getElementById('textCodiceFiscale').style.borderColor = 'red';
      return;
    }

    const response = await fetch('/api/eliminaAllieva', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: 'Bearer ' + idToken
      },
      body: JSON.stringify({
        CodiceFiscale: document.getElementById('textCodiceFiscale').value
      })
    });
    const responseParsed = await response.json();
    alert(responseParsed.message);
    resetForm();
  };

  const resetForm = () => {
    document.getElementById('comboboxEta_input').defaultValue = eta[0].eta;
    document.getElementById('formCreaRicevuta').reset();
  };

  return (
    <>
      <div className="formWrapper">
        <div className="formCreaRicevuta">
          <label id="labelEta"> Età </label>
          <Combobox
            id="comboboxEta"
            data={eta}
            defaultValue={eta.find(currentEta => {
              return currentEta.eta === Maggiorenne;
            })}
            valueField="id"
            textField="eta"
            caseSensitive={false}
            filter="contains"
          />

          <label id="labelCodiceFiscale"> Codice Fiscale </label>
          <input
            type="text"
            id="textCodiceFiscale"
            placeholder="Inserisci Codice Fiscale..."
            defaultValue={CodiceFiscale}
          />

          <label id="labelNomeAllieva"> Nome Allieva </label>
          <input
            type="text"
            id="textNomeAllieva"
            placeholder="Inserisci Nome Allieva..."
            defaultValue={Nome}
          />

          <label id="labelCognomeAllieva"> Cognome Allieva </label>
          <input
            type="text"
            id="textCognomeAllieva"
            placeholder="Inserisci Cognome Allieva..."
            defaultValue={Cognome}
          />

          <label id="labelCitta"> Citta </label>
          <input type="text" id="textCitta" placeholder="Inserisci Citta..." defaultValue={Citta} />

          <label id="labelIndirizzo"> Indirizzo </label>
          <input
            type="text"
            id="textIndirizzo"
            placeholder="Inserisci Indirizzo..."
            defaultValue={Indirizzo}
          />

          <label id="labelCellulare"> Cellulare </label>
          <input
            type="text"
            id="textCellulare"
            placeholder="Inserisci Cellulare..."
            defaultValue={Cellulare}
          />

          <label id="labelEmail"> Email </label>
          <input type="text" id="textEmail" placeholder="Inserisci Email..." defaultValue={Email} />

          <label id="labelLuogoNascita"> Luogo Nascita </label>
          <input
            type="text"
            id="textLuogoNascita"
            placeholder="Inserisci LuogoNascita..."
            defaultValue={LuogoNascita}
          />

          <label id="labelDisciplina"> Disciplina </label>
          <input
            type="text"
            id="textDisciplina"
            placeholder="Inserisci Disciplina..."
            defaultValue={Disciplina}
          />

          <label id="labelDataIscrizione"> Data Iscrizione </label>
          <input id="dtpDataIscrizione" type="date" defaultValue={DataIscrizione} />

          <label id="labelDataCertificato"> Data Certificato </label>
          <input id="dtpDataCertificato" type="date" defaultValue={DataCertificato} />

          <label id="labelDataNascita"> Data Nascita </label>
          <input id="dtpDataNascita" type="date" defaultValue={DataNascita} />

          <label id="labelCodiceFiscaleGenitore"> Codice Fiscale Genitore </label>
          <input
            type="text"
            id="textCodiceFiscaleGenitore"
            placeholder="Inserisci Codice Fiscale Genitore..."
            defaultValue={CodiceFiscaleGenitore}
          />

          <label id="labelNomeGenitore"> Nome Genitore </label>
          <input
            type="text"
            id="textNomeGenitore"
            placeholder="Inserisci Nome Genitore..."
            defaultValue={NomeGenitore}
          />

          <label id="labelCognomeGenitore"> Cognome Genitore </label>
          <input
            type="text"
            id="textCognomeGenitore"
            placeholder="Inserisci Cognome Genitore..."
            defaultValue={CognomeGenitore}
          />
        </div>
        <Button raised ripple id="buttonModificaAllieva" onClick={modificaAllieva}>
          Modifica Allieva
        </Button>
        <Button raised ripple id="buttonEliminaAllieva" onClick={eliminaAllieva}>
          Elimina Allieva
        </Button>
      </div>
    </>
  );
};

export default FormModificaEliminaAllieva;
