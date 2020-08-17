import NotFoundPage from './notfoundpage';
import ListaRicevute from '../components/lista_ricevute';
import FormCreaRicevuta from '../components/form_crea_ricevuta';

const React = require('react');
const { useState, useEffect } = require('react');
const { Button } = require('react-mdl');
const { Link } = require('react-router-dom');
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const pdfTemplateModuloIscrizione = require('../helpers/pdf-template-modulo-iscrizione-old');

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

        <Button raised ripple id="buttonStampaRicevute" onClick={stampaModuloIscrizione} style={{ marginTop: '2em' }}>
          SCARICA MODULO ISCRIZIONE
        </Button>

        {/* <PDFDownloadLink
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
        </PDFDownloadLink> */}

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
