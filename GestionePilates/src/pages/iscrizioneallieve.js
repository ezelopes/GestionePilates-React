import React from 'react'; // useEffect, useState
import FormCreaAllieva from '../components/form_crea_allieva';

function IscrizioneAllieve() {
  return (
    <>
      <div className="allieva-body">
        <h3>ISCRIZIONE</h3>
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
