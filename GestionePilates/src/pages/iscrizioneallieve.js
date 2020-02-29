import React, { useEffect } from 'react'; // useState,
// import { Link } from 'react-router-dom';
// import { Button } from 'react-mdl';
import FormCreaAllieva from '../components/form_crea_allieva';

function IscrizioneAllieve() {
  // const CodiceFiscale = match.params.codicefiscale;
  // const [allievaInfo, setAllievaInfo] = useState({});
  // const [allievaRicevute, setAllievaRicevute] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const getSingleAllievaResult = await fetch(`/api/getSingleAllieva/${CodiceFiscale}`);
      // const info = await getSingleAllievaResult.json();
      // setAllievaInfo(info[0]);
      // const getRicevuteOfAllievaResult = await fetch(`/api/getRicevuteOfAllieva/${CodiceFiscale}`);
      // const ricevute = await getRicevuteOfAllievaResult.json();
      // setAllievaRicevute(ricevute);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="allieva-body">
        <h2>ISCRIZIONE</h2>
        <FormCreaAllieva />
      </div>
      {/* <Link to="/">
        <Button raised ripple style={{ marginLeft: '5em', marginTop: '2em' }}>
          Home
        </Button>
      </Link> */}
    </>
  );
}

export default IscrizioneAllieve;
