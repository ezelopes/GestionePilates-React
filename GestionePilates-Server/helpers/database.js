var mysql = require('mysql2/promise');
var pool = mysql.createPool('mysql://root@localhost/gestionepilates');

// function created for readability and for reducing code
function mappingAllieve(rows) {
  const allieve = rows.map(row => {
    return {
      CodiceFiscale: row.CodiceFiscale,
      //   Maggiorenne: row.Maggiorenne,
      Nome: row.Nome,
      Cognome: row.Cognome,
      Citta: row.Citta
    };
  });
  return allieve;
}

async function getAllieve() {
  const [rows, fields] = await pool.execute('SELECT * FROM allieva');
  const allieve = mappingAllieve(rows);

  console.log(allieve);
  return allieve;
}

module.exports = {
  getAllieve
};
