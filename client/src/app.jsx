import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navbar';

import HomePage from './pages/homepage';
import StudentSubscription from './pages/iscrizioneallieve';
import TeacherSubscription from './pages/iscrizioneinsegnanti';
import Student from './pages/allieva';
import StudentsPage from './pages/paginaallieve';
import ReceiptsPage from './pages/paginaricevute';
import TeachersPage from './pages/paginainsegnanti';
import NotFoundPage from './pages/notfoundpage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/paginaallieve" component={StudentsPage} exact />
            <Route path="/paginaricevute" component={ReceiptsPage} exact />
            <Route path="/paginaallieve/:codicefiscale" component={Student} exact />
            <Route path="/iscrizioneallieve" component={StudentSubscription} exact />
            <Route path="/iscrizioneinsegnanti" component={TeacherSubscription} exact />
            <Route path="/paginainsegnanti" component={TeachersPage} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
