import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navbar';
// import { Layout, Navigation, Header, Content } from 'react-mdl';
// import { Link } from 'react-router-dom';
// import Main from './pages/main';

import homepage from './pages/homepage';
import iscrizioneallieve from './pages/iscrizioneallieve';
import allieva from './pages/allieva';
import modificaeliminaallieva from './pages/modificaeliminaallieva';
import paginaallieve from './pages/paginaallieve';
import paginacorsi from './pages/paginacorsi';
import paginainsegnanti from './pages/paginainsegnanti';
import notfoundpage from './pages/notfoundpage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          {/* Switch makes sure only one route at a time is displayed */}
          <Switch>
            <Route path="/" component={homepage} exact />
            <Route path="/paginaallieve" component={paginaallieve} exact />
            <Route path="/paginaallieve/:codicefiscale" component={allieva} exact />
            {/* <Route path="/allieva" component={allieva} exact />
            <Route path="/allieva/:codicefiscale" component={allieva} exact /> */}
            <Route path="/iscrizioneallieve" component={iscrizioneallieve} exact />
            <Route path="/modificaeliminaallieva" component={modificaeliminaallieva} exact />
            <Route path="/paginainsegnanti" component={paginainsegnanti} exact />
            <Route path="/paginacorsi" component={paginacorsi} exact />
            {/* If it doesn't match any of the above, then not found */}
            <Route component={notfoundpage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
