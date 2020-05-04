import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-mdl';
import { PDFDownloadLink } from '@react-pdf/renderer'
import NotFoundPage from './notfoundpage';
import ListaRicevute from '../components/lista_ricevute';
import FormCreaRicevuta from '../components/form_crea_ricevuta';
import ModuloIscrizione from '../helpers/pdf-template-modulo-iscrizione';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!allievaInfo) return <NotFoundPage />;

  return (
    <>
      <div className="page-body">
        <h2>
          {allievaInfo.Nome} {allievaInfo.Cognome}
        </h2>

        <PDFDownloadLink
          document={<ModuloIscrizione allievaInfo={allievaInfo} />}
          fileName={`Modulo_Iscrizione_${allievaInfo.Cognome}_${allievaInfo.Nome}`}
          style={{
            borderRadius: '2px',
            textDecoration: 'none',
            color: 'black',
            backgroundColor: '#f2f2f2',
            marginTop: '2em',
            padding: '0 16px',
            display: 'inline-block',
            cursor: 'pointer',
            lineHeight: '36px',
            verticalAlign: 'middle',
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "SCARICA MODULO ISCRIZIONE"
          }
        </PDFDownloadLink>

        <Link
          to={{
            pathname: '/modificaeliminaallieva',
            state: allievaInfo
          }}
        >
          <Button raised ripple style={{ marginLeft: '2em',  marginTop: '2em' }}>
            Modifica / Elimina
          </Button>
        </Link>
        <Link to="/paginaallieve">
          <Button raised ripple style={{ marginLeft: '2em', marginTop: '2em' }}>
            Indietro
          </Button>
        </Link>
        <ListaRicevute ricevute={allievaRicevute} allievaInfo={allievaInfo} />
        <FormCreaRicevuta CodiceFiscale={CodiceFiscale} />
      </div>
    </>
  );
}

export default Allieva;
