import React from 'react';
import FormModificaEliminaAllieva from '../components/form_modifica_elimina_allieva';

function ModificaEliminaAllieve(props) {
  const allievaInfo = props.location.state;
  console.log(allievaInfo);
  if (!allievaInfo) return <h1> ERROR </h1>;
  return (
    <>
      <div className="allieva-body">
        <h1> Modifica Elimina Page - {allievaInfo.CodiceFiscale} </h1>
        <label id="labelCodiceFiscale"> Cerca Codice Fiscale</label>
        <FormModificaEliminaAllieva allievaInfo={allievaInfo} />
      </div>
    </>
  );
}

export default ModificaEliminaAllieve;
