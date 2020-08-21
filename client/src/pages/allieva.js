import NotFoundPage from './notfoundpage';
import ListaRicevute from '../components/lista_ricevute';
import FormCreaRicevuta from '../components/form_crea_ricevuta';

const React = require('react');
const { useState, useEffect } = require('react');
const { Button } = require('react-mdl');
const { Link } = require('react-router-dom');
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const pdfTemplateModuloIscrizione = require('../pdfTemplates/pdf-template-modulo-iscrizione');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-balham.css');


function Allieva({ match }) {
  const CodiceFiscale = match.params.codicefiscale;
  const [allievaInfo, setAllievaInfo] = useState({});
  const [allievaRicevute, setAllievaRicevute] = useState([]);

  const stampaModuloIscrizione = async () => {
    try {
      const documentDefinition = await pdfTemplateModuloIscrizione.default(allievaInfo);
      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const getSingleAllievaResult = await fetch(`/api/allieva/getSingleAllieva/${CodiceFiscale}`);
      const info = await getSingleAllievaResult.json();
      setAllievaInfo(info[0]);

      const getRicevuteOfAllievaResult = await fetch(`/api/ricevuta/getRicevuteOfAllieva/${CodiceFiscale}`);
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

        <Button raised ripple id="buttonStampaRicevute" onClick={stampaModuloIscrizione} style={{ marginTop: '2em' }}>
          SCARICA MODULO ISCRIZIONE
        </Button>

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
        <FormCreaRicevuta CodiceFiscale={CodiceFiscale} AllievaID={allievaInfo.AllievaID} />
      </div>
    </>
  );
}

export default Allieva;
