const formatDate = date => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  const dateFormatted = `${year}-${month}-${day}`;

  return dateFormatted;
};

module.exports = formatDate;
