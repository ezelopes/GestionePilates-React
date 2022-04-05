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
      <NavBar />
      <main>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/students" component={StudentsPage} exact />
          <Route path="/receipts" component={ReceiptsPage} exact />
          <Route path="/students/:TaxCode" component={StudentPage} exact />
          <Route path="/subscription/student" component={StudentSubscription} exact />
          <Route path="/subscription/teacher" component={TeacherSubscription} exact />
          <Route path="/teachers" component={TeachersPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </Router>
  </>
);

export default App;
