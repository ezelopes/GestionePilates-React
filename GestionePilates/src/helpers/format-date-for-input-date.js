const formatDate = (date, reversed) => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  let dateFormatted = '';
  if (reversed) {
    dateFormatted = `${year}-${month}-${day}`;
  } else {
    dateFormatted = `${day}-${month}-${year}`;
  }

  return dateFormatted;
};

module.exports = formatDate;
