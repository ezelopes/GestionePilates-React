const getMonthsBetweenDates = (fromDate, toDate) => {
  const fromYear = fromDate.getFullYear();
  const fromMonth = fromDate.getMonth();
  const toYear = toDate.getFullYear();
  const toMonth = toDate.getMonth();
  const months = [];

  for (let year = fromYear; year <= toYear; year += 1) {
    let month = year === fromYear ? fromMonth : 0;
    const monthLimit = year === toYear ? toMonth : 11;

    for (; month <= monthLimit; month += 1) {
      months.push({ year, month });
    }
  }

  return months;
};

const isDateBetweenTwoDates = (fromDate, toDate, givenDate) =>
  new Date(givenDate) >= new Date(fromDate) && new Date(givenDate) <= new Date(toDate);

const validateCourseBetweenTwoDates = (fromDate, toDate, CourseStartDate, CourseEndDate) =>
  new Date(CourseStartDate) >= new Date(fromDate) && new Date(CourseEndDate) <= new Date(toDate);

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

export { isDateBetweenTwoDates, validateCourseBetweenTwoDates, formatDate, getMonthsBetweenDates };
