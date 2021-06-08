import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';


const NavBar = () => (
  <>
    <Navbar bg="dark" variant="dark" expanded="false" style={{ fontSize: '1.2rem', height: '5rem' }}>
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
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>
  </>
  // <nav className="navbar navbar-expand-md navbar-light bg-light">
  //   <a href="/" className="navbar-brand"> PilArt </a>

  //   <div id="navbarCollapse" className="collapse navbar-collapse">
  //       <ul className="nav navbar-nav">
  //         <li className="nav-item dropdown">
  //           <a href="/#" className="nav-link dropdown-toggle" data-toggle="dropdown"> Allieva </a>
  //           <div className="dropdown-menu">
  //               <a href="/paginaallieve" className="dropdown-item"> Lista Allieve </a>
  //               <a href="/iscrizioneallieve" className="dropdown-item"> Iscrizione Allieva </a>
  //               {/* <a href="/modificaeliminaallieva" className="dropdown-item"> Modifica/Elimina Allieva </a> */}
  //           </div>
  //         </li>
  //         <li className="nav-item dropdown">
  //           <a href="/#" className="nav-link dropdown-toggle" data-toggle="dropdown"> Insegnanti </a>
  //           <div className="dropdown-menu">
  //               <a href="/paginainsegnanti" className="dropdown-item"> Lista Insegnanti </a>
  //               <a href="/iscrizioneinsegnanti" className="dropdown-item"> Iscrizione Insegnanti </a>
  //               {/* <a href="/modificaeliminainsegnante" className="dropdown-item"> Modifica/Elimina Insegnanti </a> */}
  //           </div>
  //         </li>
  //         <li className="nav-item">
  //             <a href="/paginaricevute" className="nav-link"> Ricevute </a>
  //         </li>
  //       </ul>
  //   </div>
  // </nav>
);

export default NavBar;
