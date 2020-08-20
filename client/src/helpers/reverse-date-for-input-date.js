const reverseDate = date => {
  // date dd-mm-yyyy to yyyy-mm-dd
  const dateSplit = date.split('-');
  const day = dateSplit[0];
  const month = dateSplit[1];
  const year = dateSplit[2];

  if (day && month && year) return `${year}-${month}-${day}`;
  else return '1900-01-01';
};

module.exports = reverseDate;
