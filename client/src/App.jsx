import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/common/Navbar';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import StudentPage from './pages/StudentPage';
import StudentsPage from './pages/StudentsPage';
import StudentSubscription from './pages/StudentSubscriptionPage';

import TeacherSubscription from './pages/TeacherSubscriptionPage';
import TeachersPage from './pages/TeachersPage';

import ReceiptsPage from './pages/ReceiptsPage';

const App = () => (
  <>
    <ToastContainer />
    <Router>
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/paginaallieve" component={StudentsPage} exact />
            <Route path="/paginaricevute" component={ReceiptsPage} exact />
            <Route path="/paginaallieve/:TaxCode" component={StudentPage} exact />
            <Route path="/iscrizioneallieve" component={StudentSubscription} exact />
            <Route path="/iscrizioneinsegnanti" component={TeacherSubscription} exact />
            <Route path="/paginainsegnanti" component={TeachersPage} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Router>
  </>
);

export default App;
