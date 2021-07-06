import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FormModificaEliminaInsegnante from '../components/form_modifica_elimina_insegnante';

function ModificaEliminaInseganti(props) {
  const [insegnanteInfo, setInsegnanteInfo] = useState(props.location.state);
  // let insegnanteInfo = props.location.state;

  const cercaInsegnante = async () => {
    const CodiceFiscale = document.getElementById('cercaCodiceFiscale').value;

    if (!CodiceFiscale) {
      document.getElementById('cercaCodiceFiscale').style.borderColor = 'red';
      return;
    }
    const getSingleInsegnanteResult = await fetch(`/api/insegnante/getSingleInsegnante/${CodiceFiscale}`);
    const info = await getSingleInsegnanteResult.json();
    if (info !== 0) {
      setInsegnanteInfo(info[0]);
      // insegnanteInfo = info[0];
    }
  };

  return (
    <>
      <div className="cercaForm">
        <label id="labelNumRicevuta"> Cerca Insegnante per Codice Fiscale </label>
        <input type="text" id="cercaCodiceFiscale" placeholder="Inserisci Codice Fiscale..." />
        <Button variant="secondary" id="buttonCercaInsegnante" onClick={cercaInsegnante}>
          Cerca Insegnante
        </Button>
      </div>
      <div className="page-body" id="modificaInsegnante-page-body">
        <FormModificaEliminaInsegnante insegnanteInfoParam={insegnanteInfo} />
      </div>
    </>
  );
}

export default ModificaEliminaInseganti;
