const moment = require('moment');

const isValidDate = (d) => {
  return d instanceof Date;
};

const getFormattedDate = (date) => {
  if (!date) return null;

  const convertedDate = moment(date, moment.ISO_8601).format('YYYY-MM-DD');
  const timestamp = moment(convertedDate, moment.ISO_8601).unix();

  if (!isNaN(timestamp)) return convertedDate;

  return null;
};

module.exports = {
  isValidDate,
  getFormattedDate,
};
