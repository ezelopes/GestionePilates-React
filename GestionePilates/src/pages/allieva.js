import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-mdl';
import NotFoundPage from './notfoundpage';
import ListaRicevute from '../components/lista_ricevute';
import FormCreaRicevuta from '../components/form_crea_ricevuta';

function Allieva({ match }) {
  const CodiceFiscale = match.params.codicefiscale;
  const [allievaInfo, setAllievaInfo] = useState({});
  const [allievaRicevute, setAllievaRicevute] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const getSingleAllievaResult = await fetch(`/api/getSingleAllieva/${CodiceFiscale}`);
      const info = await getSingleAllievaResult.json();
      setAllievaInfo(info[0]);

      const getRicevuteOfAllievaResult = await fetch(`/api/getRicevuteOfAllieva/${CodiceFiscale}`);
      const ricevute = await getRicevuteOfAllievaResult.json();
      setAllievaRicevute(ricevute);
    };
    fetchData();
  }, []);

  if (!allievaInfo) return <NotFoundPage />;

  return (
    <>
      <div className="allieva-body">
        <h2>
          {allievaInfo.Nome} {allievaInfo.Cognome}
        </h2>
        <ListaRicevute ricevute={allievaRicevute} />
        <FormCreaRicevuta CodiceFiscale={CodiceFiscale} />
      </div>
      <Link to="/paginaallieve">
        <Button raised ripple style={{ marginLeft: '5em', marginTop: '2em' }}>
          Indietro
        </Button>
      </Link>
      <Link to="/modificaeliminaallieva">
        <Button raised ripple style={{ marginLeft: '5em', marginTop: '2em' }}>
          Modifica / Elimina
        </Button>
      </Link>
    </>
  );
}

export default Allieva;
