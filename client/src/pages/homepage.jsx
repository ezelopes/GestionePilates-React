import React from 'react';
import Logo from '../images/PILATES_LOGO.png';

import '../styles/home-page.css';

/**
 * TODO:
  Semantic ui graphs to show how many students and teachers - group by course and disicplines. Average age, etc
*/
const HomePage = () => (
  <div className="homepage">
    <img src={Logo} alt="Pilates Logo" />
  </div>
);

export default HomePage;
