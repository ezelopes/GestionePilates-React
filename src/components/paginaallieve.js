import React, { Component } from 'react';
import ListaAllieve from './helper-components/lista_allieve';
import ListaRicevute from './helper-components/lista_ricevute';

class PaginaAllieve extends Component {
  render() {
    return (
      <div className="paginaallieve-body">
        <ListaAllieve />
        <ListaRicevute style={{ marginTop: '30px' }} />
      </div>
    );
  }
}

export default PaginaAllieve;
