const reverseDate = date => {
  // date dd-mm-yyyy to yyyy-mm-dd
  const dateSplit = date.split('-');
  const day = dateSplit[0];
  const month = dateSplit[1];
  const year = dateSplit[2];

  const dateFormatted = `${year}-${month}-${day}`;

  return dateFormatted;
};

module.exports = reverseDate;
