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
  console.log(allievaInfo);
  let CodiceFiscale;
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

    const response = await fetch('/api/', {
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
        DataIscrizione: document.getElementById('dtpDataIscrizione_input').value,
        DataCertificato: document.getElementById('dtpDataCertificato_input').value,
        DataNascita: document.getElementById('dtpDataNascita_input').value,
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
        <input
          type="text"
          id="textCodiceFiscale"
          placeholder="Inserisci Codice Fiscale..."
          value={CodiceFiscale}
        />

        <label id="labelNomeAllieva"> Nome Allieva </label>
        <input type="text" id="textNomeAllieva" placeholder="Inserisci Nome Allieva..." value={Nome} />

        <label id="labelCognomeAllieva"> Cognome Allieva </label>
        <input
          type="text"
          id="textCognomeAllieva"
          placeholder="Inserisci Cognome Allieva..."
          value={Cognome}
        />

        <label id="labelCitta"> Citta </label>
        <input type="text" id="textCitta" placeholder="Inserisci Citta..." value={Citta} />

        <label id="labelIndirizzo"> Indirizzo </label>
        <input type="text" id="textIndirizzo" placeholder="Inserisci Indirizzo..." value={Indirizzo} />

        <label id="labelCellulare"> Cellulare </label>
        <input type="text" id="textCellulare" placeholder="Inserisci Cellulare..." value={Cellulare} />

        <label id="labelEmail"> Email </label>
        <input type="text" id="textEmail" placeholder="Inserisci Email..." value={Email} />

        <label id="labelLuogoNascita"> Luogo Nascita </label>
        <input
          type="text"
          id="textLuogoNascita"
          placeholder="Inserisci LuogoNascita..."
          value={LuogoNascita}
        />

        <label id="labelDisciplina"> Disciplina </label>
        <input type="text" id="textDisciplina" placeholder="Inserisci Disciplina..." value={Disciplina} />

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
          value={CodiceFiscaleGenitore}
        />

        <label id="labelNomeGenitore"> Nome Genitore </label>
        <input
          type="text"
          id="textNomeGenitore"
          placeholder="Inserisci Nome Genitore..."
          value={NomeGenitore}
        />

        <label id="labelCognomeGenitore"> Cognome Genitore </label>
        <input
          type="text"
          id="textCognomeGenitore"
          placeholder="Inserisci Cognome Genitore..."
          value={CognomeGenitore}
        />

        <Button raised ripple id="buttonModificaAllieva" onClick={modificaAllieva}>
          Modifica Allieva
        </Button>
      </div>
      <Button raised ripple id="buttonCreaAllieva" onClick={resetForm} style={{ marginTop: '2em' }}>
        Reset Form
      </Button>
    </>
  );
};

export default FormModificaEliminaAllieva;
