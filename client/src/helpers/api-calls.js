import reverseDate from './reverse-date-for-input-date';

const createStudent = async (newAllieva) => {
  // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
  if (!newAllieva.CodiceFiscale || newAllieva.CodiceFiscale === '') return alert('Codice Fiscale non puo essere vuoto');

  const response = await fetch('/api/allieva/creaAllieva', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAllieva)
  });

  if (response.status === 200) {
    const responseParsed = await response.json();
    const AllievaID = responseParsed.AllievaID;
    newAllieva.AllievaID = AllievaID;
    
    const listaAllieveCached = JSON.parse(sessionStorage.getItem('listaAllieve'));
    listaAllieveCached.push(newAllieva);
    sessionStorage.setItem('listaAllieve', JSON.stringify(listaAllieveCached));
    
    alert('Allieva Creata Correttamente');
  }
  // resetForm();
};

const updateStudent = async (allievaModificata) => {
  if (!allievaModificata.CodiceFiscale || allievaModificata.CodiceFiscale === '') return alert('Codice Fiscale non puo essere vuoto');

  const response = await fetch('/api/allieva/modificaAllieva', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(allievaModificata)
  });
  
  if (response.status === 200) {
    // update session storage
    
    const listaAllieveCached = JSON.parse(sessionStorage.getItem('listaAllieve'));
    
    for (let i = 0; i < listaAllieveCached.length; i++) {
      if(allievaModificata.AllievaID === listaAllieveCached[i].AllievaID) {
        listaAllieveCached[i] = allievaModificata;
        break;
      }
    }

    sessionStorage.setItem('listaAllieve', JSON.stringify(listaAllieveCached));

    window.location.assign(`/paginaallieve/${allievaModificata.CodiceFiscale}`)
    const responseParsed = await response.json();
    alert(responseParsed.message);
  }
  
}

const updateRegistrationDate = async (AllievaID, DataIscrizione) => {
  const response = await fetch('/api/allieva/aggiornaDataIscrizione', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ AllievaID, DataIscrizione })
  });

  if (response.status === 200) {
    const listaAllieveCached = JSON.parse(sessionStorage.getItem('listaAllieve'));
    
    for (let i = 0; i < listaAllieveCached.length; i++) {
      if(AllievaID === listaAllieveCached[i].AllievaID) {
        listaAllieveCached[i].DataIscrizione = reverseDate(DataIscrizione) || '1900-01-01';
        break;
      }
    }

    sessionStorage.setItem('listaAllieve', JSON.stringify(listaAllieveCached));

    const responseParsed = await response.json();
    return alert(responseParsed.message);
  }
  return alert('Error');
}

const updateReceipt = async (updatedReceipt) => {
  const response = await fetch('/api/ricevuta/modificaRicevuta', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      RicevutaID: updatedReceipt.RicevutaID,
      NumeroRicevuta: updatedReceipt.NumeroRicevuta,
      TipoRicevuta: updatedReceipt.TipoRicevuta,
      DataRicevuta: updatedReceipt.DataRicevuta.split("-").reverse().join("-"),
      DataInizioCorso: updatedReceipt.DataInizioCorso.split("-").reverse().join("-"),
      DataScadenzaCorso: updatedReceipt.DataScadenzaCorso.split("-").reverse().join("-"),
      SommaEuro: updatedReceipt.SommaEuro,
      TipoPagamento: updatedReceipt.TipoPagamento,
    })
  });
  const responseParsed = await response.json();
  alert(responseParsed.message);
}

const deleteStudent = async (AllievaID) => {
  const response = await fetch('/api/allieva/eliminaAllieva', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ AllievaID })
  });

  if (response.status === 200) {
    const listaAllieveCached = JSON.parse(sessionStorage.getItem('listaAllieve'));

    const removeIndex = listaAllieveCached.findIndex(allieva => allieva.AllievaID === AllievaID);
    listaAllieveCached.splice(removeIndex, 1);

    sessionStorage.setItem('listaAllieve', JSON.stringify(listaAllieveCached));
  }

  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.assign('/paginaallieve');
}

const deleteReceipt = async (RicevutaID) => {
  const response = await fetch('/api/ricevuta/eliminaRicevuta', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      RicevuteId: RicevutaID
    })
  });
  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.reload();
}

export {
  createStudent,
  updateStudent,
  updateRegistrationDate,
  updateReceipt,
  deleteStudent,
  deleteReceipt,
};