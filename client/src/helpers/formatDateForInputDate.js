const isValidDate = (d) => d instanceof Date;

const formatDate = (date, reversed) => {
  if (!isValidDate(date)) {
    return null;
  }

  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  if (reversed) {
    return `${year}-${month}-${day}`;
  }

  return `${day}-${month}-${year}`;
};

module.exports = formatDate;
