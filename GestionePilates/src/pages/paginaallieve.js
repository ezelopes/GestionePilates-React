import React from 'react';
// import { Button } from 'react-mdl';
import ListaAllieve from '../components/lista_allieve';
// import ListaRicevute from '../components/lista_ricevute';

function PaginaAllieve(/*props*/) {
  return (
    <div className="paginaallieve-body">
      <ListaAllieve />
      {/* <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
        <ListaRicevute />
        <Button raised ripple style={{ marginLeft: '2em', marginTop: '2em' }}>
          Button
        </Button>
      </div> */}
    </div>
  );
}

export default PaginaAllieve;
