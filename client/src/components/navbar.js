import React from 'react';

const NavBar = () => (
  <nav className="navbar navbar-expand-md navbar-light bg-light">
    <a href="/" className="navbar-brand"> PilArt </a>

    <div id="navbarCollapse" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className="nav-item dropdown">
            <a href="/#" className="nav-link dropdown-toggle" data-toggle="dropdown"> Allieva </a>
            <div className="dropdown-menu">
                <a href="/paginaallieve" className="dropdown-item"> Lista Allieve </a>
                <a href="/iscrizioneallieve" className="dropdown-item"> Iscrizione Allieva </a>
                <a href="/modificaeliminaallieva" className="dropdown-item"> Modifica/Elimina Allieva </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a href="/#" className="nav-link dropdown-toggle" data-toggle="dropdown"> Insegnanti </a>
            <div className="dropdown-menu">
                <a href="/paginainsegnanti" className="dropdown-item"> Lista Insegnanti </a>
                <a href="/iscrizioneinsegnanti" className="dropdown-item"> Iscrizione Insegnanti </a>
                <a href="/modificaeliminainsegnante" className="dropdown-item"> Modifica/Elimina Insegnanti </a>
            </div>
          </li>
          <li className="nav-item">
              <a href="/paginaricevute" className="nav-link"> Ricevute </a>
          </li>
        </ul>
    </div>
  </nav>
);

export default NavBar;
