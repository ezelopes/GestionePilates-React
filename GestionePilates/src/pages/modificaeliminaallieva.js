import React, { useState, useEffect } from 'react';
import { Button } from 'react-mdl';
import FormModificaEliminaAllieva from '../components/form_modifica_elimina_allieva';

function ModificaEliminaAllieve(props) {
  const [allievaInfo, setAllievaInfo] = useState(props.location.state);

  const cercaAllieva = async () => {
    const CodiceFiscale = document.getElementById('cercaCodiceFiscale').value;
    if (!CodiceFiscale) {
      document.getElementById('cercaCodiceFiscale').style.borderColor = 'red';
      return;
    }
    const getSingleAllievaResult = await fetch(`/api/getSingleAllieva/${CodiceFiscale}`);
    const info = await getSingleAllievaResult.json();
    if (info !== 0) {
      setAllievaInfo(info[0]);
    }
  };

  return (
    <>
      <div id="cercaAllievaForm">
        <label id="labelNumRicevuta"> Cerca Allieva per Codice Fiscale </label>
        <input type="text" id="cercaCodiceFiscale" placeholder="Inserisci Codice Fiscale..." />
        <Button raised ripple id="buttonCercaAllieva" onClick={cercaAllieva}>
          Cerca Allieva
        </Button>
      </div>
      <div className="page-body" id="modificaAllieva-page-body">
        <FormModificaEliminaAllieva allievaInfoParam={allievaInfo} />
      </div>
    </>
  );
}

export default ModificaEliminaAllieve;
