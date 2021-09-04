import reverseDate from './reverseDateForInputDate';

const createStudent = async (newStudent) => {
  // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
  if (!newStudent.CodiceFiscale || newStudent.CodiceFiscale === '') return alert('Codice Fiscale non puo essere vuoto');

  const response = await fetch('/api/allieva/creaAllieva', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newStudent)
  });

  if (response.status === 200) {
    const responseParsed = await response.json();
    const StudentID = responseParsed.AllievaID;
    newStudent.AllievaID = StudentID;
    
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    studentListCached.push(newStudent);
    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));
    
    alert('Allieva Creata Correttamente');
  }
  // resetForm();
};

const createReceipt = async (newReceipt) => {
  // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
  if (!newReceipt.NumeroRicevuta || newReceipt.NumeroRicevuta === '') return alert('Numero Ricevuta non puo essere vuoto');

  const response = await fetch('/api/ricevuta/creaRicevuta', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newReceipt)
  });

  if (newReceipt.TipoRicevuta === 'Quota Associativa') {
    delete newReceipt.DataInizioCorso;
    delete newReceipt.DataScadenzaCorso;
  }

  if (response.status === 200) {
    const responseParsed = await response.json();
    alert(responseParsed.message);
    window.location.reload();
  }
};

const createTeacher = async (newTeacher) => {
  // AGGIUNGI CONTROLLI SU DATA, SOMMA, TIPO.
  if (!newTeacher.CodiceFiscale || newTeacher.CodiceFiscale === '') return alert('Codice Fiscale non puo essere vuoto');

  const response = await fetch('/api/insegnante/creaInsegnante', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTeacher)
  });

  if (response.status === 200) {
    const responseParsed = await response.json();
    console.log(responseParsed)
    
    alert('Insegnante Creata Correttamente');
  }
  // resetForm();
};

const updateStudent = async (updatedStudent) => {
  if (!updatedStudent.CodiceFiscale || updatedStudent.CodiceFiscale === '') return alert('Codice Fiscale non puo essere vuoto');

  const response = await fetch('/api/allieva/modificaAllieva', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedStudent)
  });
  
  // update session storage
  if (response.status === 200) {
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    
    for (let i = 0; i < studentListCached.length; i++) {
      if(updatedStudent.AllievaID === studentListCached[i].AllievaID) {
        studentListCached[i] = updatedStudent;
        break;
      }
    }

    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));

    window.location.assign(`/paginaallieve/${updatedStudent.CodiceFiscale}`)
    const responseParsed = await response.json();
    alert(responseParsed.message);
  }
  
}

const updateTeacher = async (updatedTeacherInfo) => {
  if (!updatedTeacherInfo.CodiceFiscale || updatedTeacherInfo.CodiceFiscale === '') return alert('Codice Fiscale non puo essere vuoto');

  const response = await fetch('/api/insegnante/modificaInsegnante', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTeacherInfo)
  });
  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.reload();
  return;
}

const updateRegistrationDate = async (StudentID, RegistrationDate) => {
  const response = await fetch('/api/allieva/aggiornaDataIscrizione', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ AllievaID: StudentID, DataIscrizione: RegistrationDate })
  });

  if (response.status === 200) {
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));
    
    for (let i = 0; i < studentListCached.length; i++) {
      if(StudentID === studentListCached[i].AllievaID) {
        studentListCached[i].DataIscrizione = reverseDate(RegistrationDate) || '1900-01-01';
        break;
      }
    }

    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));

    const responseParsed = await response.json();
    alert(responseParsed.message);
    return window.location.reload();
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

const deleteStudent = async (StudentID) => {
  const response = await fetch('/api/allieva/eliminaAllieva', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ AllievaID: StudentID })
  });

  if (response.status === 200) {
    const studentListCached = JSON.parse(sessionStorage.getItem('studentsList'));

    const removeIndex = studentListCached.findIndex(student => student.AllievaID === StudentID);
    studentListCached.splice(removeIndex, 1);

    sessionStorage.setItem('studentsList', JSON.stringify(studentListCached));
  }

  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.assign('/paginaallieve');
}

const deleteReceipt = async (ReceiptID) => {
  const response = await fetch('/api/ricevuta/eliminaRicevuta', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      RicevuteId: ReceiptID
    })
  });
  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.reload();
}

const deleteTeacher = async (TeacherID) => {
  const response = await fetch('/api/insegnante/eliminaInsegnante', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      InsegnanteID: TeacherID
    })
  });
  const responseParsed = await response.json();
  alert(responseParsed.message);
  window.location.reload();
}

export {
  createStudent,
  createReceipt,
  createTeacher,
  updateStudent,
  updateRegistrationDate,
  updateTeacher,
  updateReceipt,
  deleteStudent,
  deleteReceipt,
  deleteTeacher,
};