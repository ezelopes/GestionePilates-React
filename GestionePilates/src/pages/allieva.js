import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-mdl';

function Allieva({ match }) {
  const codicefiscale = match.params.codicefiscale;

  const [allievaInfo, setAllievaInfo] = useState({ codicefiscale, nome: '', cognome: '' });

  return (
    <div className="paginaallieve-body">
      <h1> Hey {allievaInfo.codicefiscale} </h1>
      <Link to="/paginaallieve">
        <Button raised ripple style={{ marginLeft: '2em', marginTop: '2em' }}>
          Go Back
        </Button>
      </Link>
    </div>
  );
}

export default Allieva;
