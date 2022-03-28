const lettere = {
  numeri: [
    null,
    'Uno',
    'Due',
    'Tre',
    'Quattro',
    'Cinque',
    'Sei',
    'Sette',
    'Otto',
    'Nove',
    'Dieci',
    'Undici',
    'Dodici',
    'Tredici',
    'Quattordici',
    'Quindici',
    'Sedici',
    'Diciassette',
    'Diciotto',
    'Diciannove',
  ],
  decine: [null, null, 'Venti', 'Trenta', 'Quaranta', 'Cinquanta', 'Sessanta', 'Settanta', 'Ottanta', 'Novanta'],
  cento: 'Cento',
  multipli: [null, 'Mila', 'Milioni', 'Miliardi', 'Bilioni', 'Biliardi', 'Trilioni', 'Triliardi', 'Quadrilioni', 'Quadriliardi'],
  multipli1: [
    null,
    'Mille',
    'Milione',
    'Miliardo',
    'Bilione',
    'Biliardo',
    'Trilione',
    'Triliardo',
    'Quadrilione',
    'Quadriliardo',
  ],
  un: 'Un',
};

const formatNumber = (num, abbr) => {
  // Trimming
  let number = num.replace(/^\s+|\s+$/g, '');

  const abbrNum = abbr === true && number.length > 2 ? number.substr(number.length - 2, 2) : '';

  // If abbreviation is true, then the final result would look like -> CENTO / 80 instead of CENTOTTANTA
  if (abbr === true && number.length > 2) {
    number = `${number.substr(0, number.length - 2)}00`;
  }

  // If one digit, prepend two zeros. If two digits, prepend one zero.
  if (number.length % 3 === 1) {
    number = `00${number}`;
  } else if (number.length % 3 === 2) {
    number = `0${number}`;
  }

  return [number, abbrNum];
};

const convertNumberIntoWord = (num, abbr) => {
  if (Number.isNaN(num) === true) {
    return '00';
  }

  if (num.indexOf('.') >= 0 || num.indexOf(',') >= 0) {
    return '!!! Solo numeri interi !!!';
  }

  if (num === '0') {
    return 'ZERO';
  }

  if (num.replace(/^\s+|\s+$/g, '').length > lettere.multipli.length * 3) {
    return 'Number is too big!';
  }

  const [number, abbrNum] = formatNumber(num, abbr);

  let result = ''; // FINAL RESULT

  // Amount of thousands. If one it means thousands, if two it means millions, etc
  let mult3 = number.length / 3 - 1;

  let i = 0; // ITERATOR

  while (i < number.length) {
    let currentResult = '';

    const v = parseInt(number.substr(i, 3), 10);
    const n100 = parseInt(number.charAt(i), 10); // Value at the hundred position of the number
    const n10 = parseInt(number.substr(i + 1, 2), 10); // Value at the decade position of the number

    if (n100 > 0) {
      if (n100 === 1) {
        // If current decade is between 80 and 89, "cento" becomes "cent" (cent-ottanta)
        currentResult += n10 < 80 || n10 >= 90 ? lettere.cento : lettere.cento.slice(0, -1);
      } else {
        currentResult += lettere.numeri[n100] + lettere.cento;
      }
    }

    // If number is between 1 and 19, use those unique values from the array.
    if (n10 > 0 && n10 < 20) {
      currentResult += lettere.numeri[n10];
    }

    // If number is >= 20, concatenate digits with decades where possible.
    if (n10 >= 20) {
      const n20 = parseInt(number.charAt(i + 1), 10);
      const n2 = parseInt(number.charAt(i + 2), 10);

      // If digit is 1 ("uno"), then the decade value is abbreviated
      currentResult += n2 === 1 ? lettere.decine[n20].slice(0, -1) : lettere.decine[n20];

      if (n2 > 0) {
        currentResult += lettere.numeri[n2];
      }
    }

    // Only if number is >= 1000
    if (v > 0 && mult3 > 0) {
      if (v === 1) {
        // Singular -> Un milione, un miliardo etc.
        result += (mult3 === 1 ? '' : lettere.un) + lettere.multipli1[mult3];
      } else {
        // Plural -> Due milioni, due miliardi etc.
        result += currentResult + lettere.multipli[mult3];
      }
    } else {
      result += currentResult;
    }

    i += 3;
    mult3 -= 1;
  }

  return result + (abbrNum.length > 0 ? ` / ${abbrNum}` : '');
};

module.exports = convertNumberIntoWord;
