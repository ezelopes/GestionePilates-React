import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => (
  <>
    <Navbar bg="dark" variant="dark" expanded="false" className="navbar">
      <Navbar.Brand href="/"> PilArt </Navbar.Brand>
      <Nav className="mr-auto">
        <NavDropdown title="Allieve" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/paginaallieve"> Lista Allieve </NavDropdown.Item>
          <NavDropdown.Item href="/iscrizioneallieve"> Iscrizione Allieva </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Insegnanti" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/paginainsegnanti"> Lista Insegnanti </NavDropdown.Item>
          <NavDropdown.Item href="/iscrizioneinsegnanti"> Iscrizione Insegnante </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/paginaricevute"> Ricevute </Nav.Link>
      </Nav>
    </Navbar>
  </>
);

export default NavBar;
