import React from 'react';
// import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <a href="/" class="navbar-brand"> PilArt </a>

    <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown"> Allieva </a>
            <div class="dropdown-menu">
                <a href="/paginaallieve" class="dropdown-item"> Lista Allieve </a>
                <a href="/iscrizioneallieve" class="dropdown-item"> Iscrizione Allieva </a>
                <a href="/modificaeliminaallieva" class="dropdown-item"> Modifica/Elimina Allieva </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown"> Insegnanti </a>
            <div class="dropdown-menu">
                <a href="/paginainsegnanti" class="dropdown-item"> Lista Insegnanti </a>
                <a href="/iscrizioneinsegnanti" class="dropdown-item"> Iscrizione Insegnanti </a>
                <a href="/modificaeliminainsegnante" class="dropdown-item"> Modifica/Elimina Insegnanti </a>
            </div>
          </li>
          <li class="nav-item">
              <a href="/paginaricevute" class="nav-link"> Ricevute </a>
          </li>
          <li class="nav-item">
              <a href="/paginacorsi" class="nav-link"> Corsi </a>
          </li>
        </ul>
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Admin</a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="#"class="dropdown-item">Logout</a>
                </div>
            </li>
        </ul>
    </div>
  </nav>
  // <nav>
  //   <ul>
  //     <li>
  //       <Link to="/"> HomePage </Link>
  //     </li>
  //     <li>
  //       <Link to="/paginaallieve"> Allieve </Link>
  //     </li>
  //     <li>
  //       <Link to="/paginaricevute"> Ricevute </Link>
  //     </li>
  //     <li>
  //       <Link to="/iscrizioneallieve"> Iscrizione Allieve </Link>
  //     </li>
  //     <li>
  //       <Link to="/modificaeliminaallieva"> Modifica/Elimina Allieve </Link>
  //     </li>
  //     <li>
  //       <Link to="/paginainsegnanti"> Insegnanti </Link>
  //     </li>
  //     <li>
  //       <Link to="/paginacorsi"> Corsi </Link>
  //     </li>
  //   </ul>
  // </nav>
);

export default NavBar;
