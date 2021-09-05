const reverseDate = (date) => {
  // date dd-mm-yyyy to yyyy-mm-dd
  if (!date) { return '1900-01-01';}

  const dateSplit = date.split('-');
  const day = dateSplit[0];
  const month = dateSplit[1];
  const year = dateSplit[2];

  if (day && month && year) return `${year}-${month - 1}-${day}`;
  else return '1900-01-01';
};

module.exports = reverseDate;
