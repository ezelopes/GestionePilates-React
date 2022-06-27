/* eslint-disable no-param-reassign */
import { useMemo } from 'react';
import { courses, isDanceCourse, isFitnessCourse, isMembershipFee } from '../../../commondata';
import { academicYearEnd, academicYearStart, isDateBetweenTwoDates } from '../../../helpers/dates';

const useAmountPaidPerCourse = (receipts, selectedYear) =>
  useMemo(() => {
    let fitnessTotal = 0;
    let danceCoursesTotal = 0;

    const defaultCourseAmount = courses
      .filter(({ course }) => course !== '')
      .reduce((json, { course }) => {
        json[course] = 0;

        return json;
      }, {});

    const amountPaidPerCourse = receipts.reduce((accumulator, receipt) => {
      if (isMembershipFee(receipt.ReceiptType)) {
        return accumulator;
      }

      if (isDateBetweenTwoDates(academicYearStart(selectedYear), academicYearEnd(selectedYear + 1), receipt.ReceiptDate)) {
        if (isFitnessCourse(receipt.Discipline)) {
          fitnessTotal += parseInt(receipt.AmountPaid, 10);

          return accumulator;
        }

        if (isDanceCourse(receipt.Discipline)) {
          if (receipt.Course) {
            accumulator[receipt.Course] += parseInt(receipt.AmountPaid, 10);
          }

          danceCoursesTotal += parseInt(receipt.AmountPaid, 10);

          return accumulator;
        }
      }

      return accumulator;
    }, defaultCourseAmount);

    return { amountPaidPerCourse, fitnessTotal, danceCoursesTotal };
  }, [receipts, selectedYear]);

export default useAmountPaidPerCourse;
