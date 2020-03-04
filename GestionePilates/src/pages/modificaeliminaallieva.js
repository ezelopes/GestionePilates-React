import React from 'react';
import FormModificaEliminaAllieva from '../components/form_modifica_elimina_allieva';

function ModificaEliminaAllieve(props) {
  const allievaInfo = props.location.state;
  console.log(allievaInfo);

  return (
    <>
      <h1> Modifica Elimina Page - {allievaInfo.CodiceFiscale} </h1>
      <label id="labelCodiceFiscale"> Cerca Codice Fiscale</label>
      <FormModificaEliminaAllieva allievaInfo={allievaInfo} />
    </>
  );
}

export default ModificaEliminaAllieve;
