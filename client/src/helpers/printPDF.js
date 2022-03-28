import { toast } from 'react-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { getTranslation } from '../components/common/Translation/helpers';

import toastConfig from './toast.config';

import { getMonthFromId, isAdult, isMembershipFee } from '../commondata';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReceiptTemplateAdult = require('../pdfTemplates/ReceiptTemplateAdult');
const ReceiptTemplateUnderAge = require('../pdfTemplates/ReceiptTemplateUnderAge');

const MembershipFeeTemplateAdult = require('../pdfTemplates/MembershipFeeTemplateAdult');
const MembershipFeeTemplateUnderAge = require('../pdfTemplates/MembershipFeeTemplateUnderAge');
const AmountPaidSummaryTemplate = require('../pdfTemplates/AmountPaidSummaryTemplate');

const MembershipFeeSummaryTemplate = require('../pdfTemplates/MembershipFeeSummaryTemplate');

const StudentsDataTemplate = require('../pdfTemplates/StudentsDataTemplate');
const StudentsDataGreenPassTemplate = require('../pdfTemplates/StudentsDataGreenPassTemplate');
const StudentsExpiringCourseTemplate = require('../pdfTemplates/StudentsExpiringCourseTemplate');
const RegistrationFormTemplate = require('../pdfTemplates/RegistrationFormTemplate');

const printSelectedReceipts = async (selectedReceipts) => {
  try {
    if (selectedReceipts.length === 0) {
      return toast.error(getTranslation('toast.error.noReceiptsSelected'), toastConfig);
    }

    const finalDocumentDefinition = {
      info: { author: 'Roxana Carro', subject: 'Ricevute', title: 'Ricevute Multiple' },
      pageMargins: [40, 5, 40, 0],
      content: [],
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, data] of selectedReceipts.entries()) {
      let documentDefinition;

      const studentInfo = {
        IsAdult: data.IsAdult,
        TaxCode: data.TaxCode,
        Name: data.Name,
        Surname: data.Surname,
        City: data.City,
        Address: data.Address,
        MobilePhone: data.MobilePhone,
        Email: data.Email,
        RegistrationDate: data.RegistrationDate,
        CertificateExpirationDate: data.CertificateExpirationDate,
        DOB: data.DOB,
        BirthPlace: data.BirthPlace,
        Discipline: data.Discipline,
        Course: data.Course,
        School: data.School,
        ParentName: data.ParentName,
        ParentSurname: data.ParentSurname,
        ParentTaxCode: data.ParentTaxCode,
      };

      const receiptInfo = {
        ReceiptNumber: data.ReceiptNumber,
        AmountPaid: data.AmountPaid,
        PaymentMethod: data.PaymentMethod,
        ReceiptType: data.ReceiptType,
        ReceiptDate: data.ReceiptDate,
        CourseStartDate: data.CourseStartDate,
        CourseEndDate: data.CourseEndDate,
      };

      if (isAdult(studentInfo.IsAdult) && !isMembershipFee(receiptInfo.ReceiptType)) {
        // eslint-disable-next-line no-await-in-loop
        documentDefinition = await ReceiptTemplateAdult.default(studentInfo, receiptInfo);
      } else if (isAdult(studentInfo.IsAdult) && isMembershipFee(receiptInfo.ReceiptType)) {
        // eslint-disable-next-line no-await-in-loop
        documentDefinition = await MembershipFeeTemplateAdult.default(studentInfo, receiptInfo);
      } else if (!isAdult(studentInfo.IsAdult) && !isMembershipFee(receiptInfo.ReceiptType)) {
        // eslint-disable-next-line no-await-in-loop
        documentDefinition = await ReceiptTemplateUnderAge.default(studentInfo, receiptInfo);
      } else if (!isAdult(studentInfo.IsAdult) && isMembershipFee(receiptInfo.ReceiptType)) {
        // eslint-disable-next-line no-await-in-loop
        documentDefinition = await MembershipFeeTemplateUnderAge.default(studentInfo, receiptInfo);
      }

      if (index % 2 === 1) {
        documentDefinition.content[documentDefinition.content.length - 1].pageBreak = 'after';
        documentDefinition.content[documentDefinition.content.length - 1].canvas = [];
      }
      Array.prototype.push.apply(finalDocumentDefinition.content, documentDefinition.content);
    }

    pdfMake.createPdf(finalDocumentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printStudentReceipt = async (selectedReceipt, studentInfo) => {
  try {
    if (!selectedReceipt) {
      return toast.error(getTranslation('toast.error.noReceiptSelected'), toastConfig);
    }

    let documentDefinition;

    if (isAdult(studentInfo.IsAdult) && !isMembershipFee(selectedReceipt.ReceiptType)) {
      documentDefinition = await ReceiptTemplateAdult.default(studentInfo, selectedReceipt);
    } else if (isAdult(studentInfo.IsAdult) && isMembershipFee(selectedReceipt.ReceiptType)) {
      documentDefinition = await MembershipFeeTemplateAdult.default(studentInfo, selectedReceipt);
    } else if (!isAdult(studentInfo.IsAdult) && !isMembershipFee(selectedReceipt.ReceiptType)) {
      documentDefinition = await ReceiptTemplateUnderAge.default(studentInfo, selectedReceipt);
    } else if (!isAdult(studentInfo.IsAdult) && isMembershipFee(selectedReceipt.ReceiptType)) {
      documentDefinition = await MembershipFeeTemplateUnderAge.default(studentInfo, selectedReceipt);
    }

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printMembershipFeeSummaryTemplate = async (studentMembershipFeeList, fromData, toDate) => {
  try {
    if (studentMembershipFeeList.length < 1) {
      return toast.error(getTranslation('toast.error.noMembershipFeeFound'), toastConfig);
    }
    const documentDefinition = await MembershipFeeSummaryTemplate.default(studentMembershipFeeList, fromData, toDate);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printReceiptsDetails = async (filteredReceipts, filteredAmountPaid, filteredPaymentMethod, fromDate, toDate) => {
  try {
    const documentDefinition = await AmountPaidSummaryTemplate.default(
      filteredReceipts,
      filteredAmountPaid,
      filteredPaymentMethod,
      fromDate,
      toDate
    );
    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

// TODO: AT THE MOMENT IT PRINTS ALL RECEIPTS, THIS FUNCTION NEEDS TO ACCEPT A FILTER FOR YEAR(S) TOO.
const printExpiringStudents = async (studentsReceiptsList, selectedYear = 2022) => {
  try {
    if (studentsReceiptsList.length < 1) {
      return toast.error(getTranslation('toast.error.noStudentFound'), toastConfig);
    }

    const studentsReceiptsListOrdered = studentsReceiptsList.sort((a, b) => {
      // If course date is the same, order by student name ASC
      if (a.CourseEndDate === b.CourseEndDate) {
        return a.Name.toUpperCase() > b.Name.toUpperCase() ? 1 : -1;
      }

      return new Date(a.CourseEndDate) - new Date(b.CourseEndDate);
    });

    const studentsReceiptsListByMonth = studentsReceiptsListOrdered
      .filter((receipt) => new Date(receipt.CourseEndDate).getFullYear() === selectedYear)
      .reduce((accumulator, receipt) => {
        if (isMembershipFee(receipt.ReceiptType) || !receipt.CourseEndDate) {
          return accumulator;
        }

        const monthId = parseInt(receipt.CourseEndDate.split('-')[1], 10) - 1;

        const { month } = getMonthFromId(monthId);

        if (!accumulator[month]) {
          // eslint-disable-next-line no-param-reassign
          accumulator[month] = [];
        }

        accumulator[month].push(receipt);

        return accumulator;
      }, {});

    const documentDefinition = await StudentsExpiringCourseTemplate.default(studentsReceiptsListByMonth);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printRegistrationForm = async (studentInfo) => {
  try {
    const documentDefinition = await RegistrationFormTemplate.default(studentInfo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printSelectedStudents = async (selectedStudents) => {
  try {
    if (selectedStudents.length === 0) {
      return toast.error(getTranslation('toast.error.noStudentsSelected'), toastConfig);
    }
    const documentDefinition = await StudentsDataTemplate.default(selectedStudents);

    pdfMake.createPdf(documentDefinition).open();
    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (err) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printStudentsBasedOnRegistrationDate = async (students, selectedMonth, selectedYearGreenPass) => {
  try {
    const studentsWithExpiringGreenPass = students.filter(({ RegistrationDate, GreenPassExpirationDate, IsAdult }) => {
      if (RegistrationDate) {
        const RegistrationDateFormatted = new Date(RegistrationDate);

        return (
          RegistrationDateFormatted.getMonth() === selectedMonth &&
          RegistrationDateFormatted.getFullYear() === selectedYearGreenPass &&
          isAdult(IsAdult) &&
          !!GreenPassExpirationDate
        );
      }

      return false;
    });

    const { month } = getMonthFromId(selectedMonth);

    if (studentsWithExpiringGreenPass.length > 0) {
      const documentDefinition = await StudentsDataTemplate.default(
        studentsWithExpiringGreenPass,
        month.toUpperCase(),
        selectedYearGreenPass
      );

      pdfMake.createPdf(documentDefinition).open();
      return toast.success(getTranslation('toast.success.general'), toastConfig);
    }

    return toast.error(`Nessuna Allieva Maggiorenne iscritta nel ${month} ${selectedYearGreenPass}`, toastConfig);
  } catch (err) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printStudentsWithExpiringGreenPass = async (students, selectedMonth, selectedYearGreenPass) => {
  try {
    const studentsWithExpiringGreenPass = students.filter(({ GreenPassExpirationDate }) => {
      if (GreenPassExpirationDate) {
        const GreenPassExpirationDateFormatted = new Date(GreenPassExpirationDate);
        return (
          GreenPassExpirationDateFormatted.getMonth() === selectedMonth &&
          GreenPassExpirationDateFormatted.getFullYear() === selectedYearGreenPass
        );
      }

      return false;
    });

    const { month } = getMonthFromId(selectedMonth);

    if (studentsWithExpiringGreenPass.length > 0) {
      const documentDefinition = await StudentsDataGreenPassTemplate.default(
        studentsWithExpiringGreenPass,
        month.toUpperCase(),
        selectedYearGreenPass
      );

      pdfMake.createPdf(documentDefinition).open();
      return toast.success(getTranslation('toast.success.general'), toastConfig);
    }

    return toast.error(`Nessuna allieva con Scadenza Green Pass nel ${month} ${selectedYearGreenPass}`, toastConfig);
  } catch (err) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printTeacherRegistrationForm = async (teacherInfo) => {
  try {
    const documentDefinition = await RegistrationFormTemplate.default(teacherInfo);
    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

export {
  printSelectedReceipts,
  printStudentReceipt,
  printMembershipFeeSummaryTemplate,
  printReceiptsDetails,
  printExpiringStudents,
  printRegistrationForm,
  printSelectedStudents,
  printStudentsBasedOnRegistrationDate,
  printStudentsWithExpiringGreenPass,
  printTeacherRegistrationForm,
};
