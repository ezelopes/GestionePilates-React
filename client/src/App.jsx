import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/common/Navbar';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import Student from './pages/StudentPage';
import StudentsPage from './pages/StudentsPage';
import StudentSubscription from './pages/StudentSubscriptionPage';

import TeacherSubscription from './pages/TeacherSubscriptionPage';
import TeachersPage from './pages/TeachersPage';

import ReceiptsPage from './pages/ReceiptsPage';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <ToastContainer />
    <Router>
      <div className="App">
        <NavBar />
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/paginaallieve" component={StudentsPage} exact />
            <Route path="/paginaricevute" component={ReceiptsPage} exact />
            <Route path="/paginaallieve/:TaxCode" component={Student} exact />
            <Route path="/iscrizioneallieve" component={StudentSubscription} exact />
            <Route path="/iscrizioneinsegnanti" component={TeacherSubscription} exact />
            <Route path="/paginainsegnanti" component={TeachersPage} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  </>
);

export default App;
