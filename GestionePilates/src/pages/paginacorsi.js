import React from 'react';

function CorsiPage(props) {
  return (
    <>
      <h1> Corsi Page </h1>
      <input style={{marginLeft: '3em';}} type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
    </>
  );
}

export default CorsiPage;
