const studentResponseMessages = {
  ok: {
    create: 'Allieva creata correttamente',
    update: 'Allieva Aggiornata Correttamente!',
    updateRegistration: 'Data Iscrizione Aggiornata Correttamente!',
    delete: 'Allieva Eliminata Correttamente!',
  },
  error: {
    getSingle: `Errore nel recuperare i dati dell'Allieva!`,
    getMultiple: 'Errore nel recuperare i dati delle Allieve!',
    create: 'Errore nel creare Allieva',
    update: `Errore nell'aggiornare Allieva!`,
    updateRegistration: `Errore nell'aggiornare Data Iscrizione!`,
    delete: `Errore nell'eliminare Allieva!`,
  },
};

const receiptResponseMessages = {
  ok: {
    create: 'Ricevuta Inserita Correttamente!',
    update: 'Ricevuta Aggiornata Correttamente!',
    delete: 'Ricevuta Eliminata Correttamente!',
    deleteMultiple: 'Ricevute Eliminate Correttamente!',
  },
  error: {
    getMultiple: 'Errore nel recuperare le ricevute!',
    create: 'Errore nel creare la ricevuta!',
    update: `Errore nell'aggiornare ricevuta!`,
    delete: `Errore nell'eliminare la ricevuta!`,
  },
};

const teacherResponseMessages = {
  ok: {
    create: 'Insegnante Inserita Correttamente!',
    update: 'Insegnante Aggiornata Correttamente!',
    delete: 'Insegnante Eliminata Correttamente!',
  },
  error: {
    getSingle: `Errore nel recuperare i dati dell'insegnante!`,
    getMultiple: 'Errore nel recuperare i dati delle insegnanti!',
    create: 'Errore nel creare insegnante!',
    update: `Errore nell'aggiornare insegnante!`,
    delete: `Errore nell'eliminare insegnante!`,
  },
};

module.exports = { studentResponseMessages, receiptResponseMessages, teacherResponseMessages };
