import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/"> HomePage </Link>
      </li>
      <li>
        <Link to="/paginaallieve"> Allieve </Link>
      </li>
      <li>
        <Link to="/paginaricevute"> Ricevute </Link>
      </li>
      <li>
        <Link to="/iscrizioneallieve"> Iscrizione Allieve </Link>
      </li>
      <li>
        <Link to="/modificaeliminaallieva"> Modifica/Elimina Allieve </Link>
      </li>
      <li>
        <Link to="/paginainsegnanti"> Insegnanti </Link>
      </li>
      <li>
        <Link to="/paginacorsi"> Corsi </Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
