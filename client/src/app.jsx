import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navbar';

import homepage from './pages/homepage';
import iscrizioneallieve from './pages/iscrizioneallieve';
import iscrizioneinsegnanti from './pages/iscrizioneinsegnanti';
import allieva from './pages/allieva';
import paginaallieve from './pages/paginaallieve';
import paginaricevute from './pages/paginaricevute';
import paginainsegnanti from './pages/paginainsegnanti';
import notfoundpage from './pages/notfoundpage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div>
          {/* Switch makes sure only one route at a time is displayed */}
          <Switch>
            <Route path="/" component={homepage} exact />
            <Route path="/paginaallieve" component={paginaallieve} exact />
            <Route path="/paginaricevute" component={paginaricevute} exact />
            <Route path="/paginaallieve/:codicefiscale" component={allieva} exact />
            <Route path="/iscrizioneallieve" component={iscrizioneallieve} exact />
            <Route path="/iscrizioneinsegnanti" component={iscrizioneinsegnanti} exact />
            <Route path="/paginainsegnanti" component={paginainsegnanti} exact />
            <Route component={notfoundpage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
