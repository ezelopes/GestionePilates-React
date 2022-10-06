import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import Translation from '../Translation';

import './navbar.css';

const NavBar = () => (
  <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
      <Navbar.Brand href="/">
        <Translation value="common.pilart" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Allieve" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/students">
              <Translation value="navbar.studentsList" />
            </NavDropdown.Item>
            <NavDropdown.Item href="/subscription/student">
              <Translation value="navbar.studentsSubscription" />
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Insegnanti" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/teachers">
              <Translation value="navbar.teachersList" />
            </NavDropdown.Item>
            <NavDropdown.Item href="/subscription/teacher">
              <Translation value="navbar.teachersSubscription" />
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/receipts">
            <Translation value="navbar.receiptsList" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
);

export default NavBar;
