import React from 'react';
import Logo from '../images/PILATES_LOGO.png'
/**
  semantic ui graphs per mostrare quante allieve e insegnanti
  divise per corso (e disicplina). Eta media, 
*/
const HomePage = () => {
  return (
    <div className="homepage">
      <img src={Logo} alt='Pilates Logo' style={{ maxWidth: '50%', marginTop: '3em' }}
      />
    </div>
  );
}

export default HomePage;
