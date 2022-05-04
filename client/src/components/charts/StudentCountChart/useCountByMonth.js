/* eslint-disable no-param-reassign */
import { useMemo } from 'react';
import { getMonthsBetweenDates } from '../../../helpers/dates';

const useCountByMonth = (receiptsWithStudentInfo, selectedYear) =>
  useMemo(
    () =>
      receiptsWithStudentInfo.reduce(
        (accumulator, receipt) => {
          const courseStartDate = new Date(receipt.CourseStartDate);
          const courseEndDate = new Date(receipt.CourseEndDate);

          const res = getMonthsBetweenDates(courseStartDate, courseEndDate);

          // Academic year goes from September until August. The selected year would start counting from september,
          // so from January an extra year needs to be added.
          res.forEach(({ month, year }) => {
            if (month === 0 && year === selectedYear + 1) {
              accumulator.january += 1;
            }
            if (month === 1 && year === selectedYear + 1) {
              accumulator.february += 1;
            }
            if (month === 2 && year === selectedYear + 1) {
              accumulator.march += 1;
            }
            if (month === 3 && year === selectedYear + 1) {
              accumulator.april += 1;
            }
            if (month === 4 && year === selectedYear + 1) {
              accumulator.may += 1;
            }
            if (month === 5 && year === selectedYear + 1) {
              accumulator.june += 1;
            }
            if (month === 6 && year === selectedYear + 1) {
              accumulator.july += 1;
            }
            if (month === 7 && year === selectedYear + 1) {
              accumulator.august += 1;
            }
            if (month === 8 && year === selectedYear) {
              accumulator.september += 1;
            }
            if (month === 9 && year === selectedYear) {
              accumulator.october += 1;
            }
            if (month === 10 && year === selectedYear) {
              accumulator.november += 1;
            }
            if (month === 11 && year === selectedYear) {
              accumulator.december += 1;
            }
          });

          return accumulator;
        },
        {
          january: 0,
          february: 0,
          march: 0,
          april: 0,
          may: 0,
          june: 0,
          july: 0,
          august: 0,
          september: 0,
          october: 0,
          november: 0,
          december: 0,
        }
      ),
    [receiptsWithStudentInfo, selectedYear]
  );

export default useCountByMonth;
