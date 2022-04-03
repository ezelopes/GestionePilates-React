import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import Translation from '../Translation';

import './navbar.css';

const NavBar = () => (
  <>
    <Navbar bg="dark" variant="dark" expanded="false" className="navbar">
      <Navbar.Brand href="/">
        <Translation value="common.pilart" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <NavDropdown title="Allieve" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/paginaallieve">
            <Translation value="navbar.studentsList" />
          </NavDropdown.Item>
          <NavDropdown.Item href="/iscrizioneallieve">
            <Translation value="navbar.studentsSubscription" />
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Insegnanti" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/paginainsegnanti">
            <Translation value="navbar.teachersList" />
          </NavDropdown.Item>
          <NavDropdown.Item href="/iscrizioneinsegnanti">
            <Translation value="navbar.teachersSubscription" />
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/paginaricevute">
          <Translation value="navbar.receiptsList" />
        </Nav.Link>
      </Nav>
    </Navbar>
  </>
);

export default NavBar;
