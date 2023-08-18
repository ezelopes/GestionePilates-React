/* eslint-disable no-param-reassign */
import { useMemo } from 'react';
import { courses, isDanceCourse, isFitnessCourse, isMembershipFee } from '../../../commondata';
import { academicYearEnd, academicYearStart, isDateBetweenTwoDates } from '../../../helpers/dates';

const useAmountPaidPerCourse = (receipts, selectedYear) =>
  useMemo(() => {
    let fitnessTotal = 0;
    let danceCoursesTotal = 0;
    let unassignedDanceCoursesTotal = 0;

    const defaultCourseAmount = courses
      .filter(({ value }) => value !== '')
      .reduce((json, { label }) => {
        json[label] = {
          label,
          amount: 0,
        };

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
            accumulator[receipt.Course].amount += parseInt(receipt.AmountPaid, 10);
          } else {
            unassignedDanceCoursesTotal += parseInt(receipt.AmountPaid, 10);
          }

          danceCoursesTotal += parseInt(receipt.AmountPaid, 10);

          return accumulator;
        }
      }

      return accumulator;
    }, defaultCourseAmount);

    const amountPaidPerCourseSorted = Object.keys(amountPaidPerCourse)
      .map((key) => ({
        label: amountPaidPerCourse[key].label,
        amount: amountPaidPerCourse[key].amount,
      }))
      .sort((a, b) => b.amount - a.amount);

    return { amountPaidPerCourse: amountPaidPerCourseSorted, fitnessTotal, danceCoursesTotal, unassignedDanceCoursesTotal };
  }, [receipts, selectedYear]);

export default useAmountPaidPerCourse;
