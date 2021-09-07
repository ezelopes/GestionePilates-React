const moment = require('moment');

const isValidDate = (d) => {
    return d instanceof Date;
}
  
const getFormattedDate = (date) => {
    const convertedDate = moment(date).format('YYYY-MM-DD')
    const timestamp = moment(convertedDate, 'YYYY-MM-DD').unix()

    if(!isNaN(timestamp)) 
        return convertedDate

    return null
}

module.exports = {
    isValidDate,
    getFormattedDate,
}