import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './homepage';
import PaginaAllieve from './paginaallieve';
import IscrizioneAllieve from './iscrizioneallieve';
import ModificaEliminaAllieva from './modificaeliminaallieva';
import PaginaInsegnanti from './paginainsegnanti';

const Main = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/paginaallieve" component={PaginaAllieve} />
    <Route exact path="/iscrizioneallieve" component={IscrizioneAllieve} />
    <Route exact path="/modificaeliminaallieva" component={ModificaEliminaAllieva} />
    <Route exact path="/paginainsegnanti" component={PaginaInsegnanti} />
  </Switch>
);

export default Main;
