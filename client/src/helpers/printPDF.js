import { toast } from 'react-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { formatDate, isDateBetweenTwoDates } from './dates';
import getBase64ImageFromURL from './getBase64ImageFromURL';

import { getTranslation } from '../components/common/Translation/helpers';

import toastConfig from '../commondata/toast.config';
import { getMonthFromId, isAdult, isDanceRecitalFee, isMembershipFee, isSubscriptionFee } from '../commondata';

import {
  ReceiptTemplateAdult,
  ReceiptTemplateUnderAge,
  DanceRecitalFeeTemplateAdult,
  DanceRecitalFeeTemplateUnderAge,
  MembershipFeeTemplateAdult,
  MembershipFeeTemplateUnderAge,
  AmountPaidSummaryTemplate,
  MembershipFeeSummaryTemplate,
  StudentsDataTemplate,
  StudentsDataGreenPassTemplate,
  StudentsExpiringCourseTemplate,
  RegistrationFormTemplate,
  RegistrationFormDanceOsioTemplate,
  RegistrationFormDanceStezzanoTemplate,
  RegistrationFormFitnessTemplate,
} from '../pdfTemplates';
import { getStudentsWithRegistrationReceipt, getTeachersWithRegistrationReceipt } from './apiCalls';
import { MembersRegisterTemplate } from '../pdfTemplates/MembersRegisterTemplate';
import { AssemblyBookTemplate } from '../pdfTemplates/AssemblyBookTemplate';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');
    const signature = await getBase64ImageFromURL('Signature.png');
    const stamp = await getBase64ImageFromURL('Stamp.png');

    selectedReceipts.map((receipt, index) => {
      let page;

      const studentInfo = {
        IsAdult: receipt.IsAdult,
        TaxCode: receipt.TaxCode,
        Name: receipt.Name,
        Surname: receipt.Surname,
        City: receipt.City,
        Address: receipt.Address,
        MobilePhone: receipt.MobilePhone,
        Email: receipt.Email,
        RegistrationDate: receipt.RegistrationDate,
        CertificateExpirationDate: receipt.CertificateExpirationDate,
        DOB: receipt.DOB,
        BirthPlace: receipt.BirthPlace,
        Discipline: receipt.Discipline,
        Course: receipt.Course,
        School: receipt.School,
        ParentName: receipt.ParentName,
        ParentSurname: receipt.ParentSurname,
        ParentTaxCode: receipt.ParentTaxCode,
      };

      const receiptInfo = {
        ReceiptNumber: receipt.ReceiptNumber,
        AmountPaid: receipt.AmountPaid,
        PaymentMethod: receipt.PaymentMethod,
        ReceiptType: receipt.ReceiptType,
        ReceiptDate: receipt.ReceiptDate,
        CourseStartDate: receipt.CourseStartDate,
        CourseEndDate: receipt.CourseEndDate,
      };

      const isStudentAdult = isAdult(studentInfo.IsAdult);

      if (isStudentAdult && isSubscriptionFee(receiptInfo.ReceiptType)) {
        page = ReceiptTemplateAdult(studentInfo, receiptInfo, labelLogo, signature, stamp);
      } else if (isStudentAdult && isMembershipFee(receiptInfo.ReceiptType)) {
        page = MembershipFeeTemplateAdult(studentInfo, receiptInfo, labelLogo, signature, stamp);
      } else if (isStudentAdult && isDanceRecitalFee(receiptInfo.ReceiptType)) {
        page = DanceRecitalFeeTemplateAdult(studentInfo, receiptInfo, labelLogo, signature, stamp);
      } else if (!isStudentAdult && isSubscriptionFee(receiptInfo.ReceiptType)) {
        page = ReceiptTemplateUnderAge(studentInfo, receiptInfo, labelLogo, signature, stamp);
      } else if (!isStudentAdult && isMembershipFee(receiptInfo.ReceiptType)) {
        page = MembershipFeeTemplateUnderAge(studentInfo, receiptInfo, labelLogo, signature, stamp);
      } else if (!isStudentAdult && isDanceRecitalFee(receiptInfo.ReceiptType)) {
        page = DanceRecitalFeeTemplateUnderAge(studentInfo, receiptInfo, labelLogo, signature, stamp);
      }

      if (index % 2 === 1) {
        page.content[page.content.length - 1].pageBreak = 'after';
        page.content[page.content.length - 1].canvas = [];
      }

      return Array.prototype.push.apply(finalDocumentDefinition.content, page.content);
    });

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

    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');
    const signature = await getBase64ImageFromURL('Signature.png');
    const stamp = await getBase64ImageFromURL('Stamp.png');

    let documentDefinition;

    const isStudentAdult = isAdult(studentInfo.IsAdult);

    if (isStudentAdult && isSubscriptionFee(selectedReceipt.ReceiptType)) {
      documentDefinition = ReceiptTemplateAdult(studentInfo, selectedReceipt, labelLogo, signature, stamp);
    } else if (isStudentAdult && isMembershipFee(selectedReceipt.ReceiptType)) {
      documentDefinition = MembershipFeeTemplateAdult(studentInfo, selectedReceipt, labelLogo, signature, stamp);
    } else if (isStudentAdult && isDanceRecitalFee(selectedReceipt.ReceiptType)) {
      documentDefinition = DanceRecitalFeeTemplateAdult(studentInfo, selectedReceipt, labelLogo, signature, stamp);
    } else if (!isStudentAdult && isSubscriptionFee(selectedReceipt.ReceiptType)) {
      documentDefinition = ReceiptTemplateUnderAge(studentInfo, selectedReceipt, labelLogo, signature, stamp);
    } else if (!isStudentAdult && isMembershipFee(selectedReceipt.ReceiptType)) {
      documentDefinition = MembershipFeeTemplateUnderAge(studentInfo, selectedReceipt, labelLogo, signature, stamp);
    } else if (!isStudentAdult && isDanceRecitalFee(selectedReceipt.ReceiptType)) {
      documentDefinition = DanceRecitalFeeTemplateUnderAge(studentInfo, selectedReceipt, labelLogo, signature, stamp);
    }

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printMembershipFeeSummaryTemplate = async (membershipFeeList, fromDate, toDate) => {
  try {
    if (membershipFeeList.length < 1) {
      return toast.error(getTranslation('toast.error.noMembershipFeeFound'), toastConfig);
    }

    const membershipFeeListFiltered = membershipFeeList.filter(({ ReceiptDate }) =>
      ReceiptDate
        ? isDateBetweenTwoDates(
            formatDate(new Date(fromDate), true),
            formatDate(new Date(toDate), true),
            formatDate(new Date(ReceiptDate), true)
          )
        : false
    );

    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');
    const documentDefinition = MembershipFeeSummaryTemplate(
      membershipFeeListFiltered,
      formatDate(new Date(fromDate), false),
      formatDate(new Date(toDate), false),
      labelLogo
    );

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printReceiptsDetails = async (filteredReceipts, filteredAmountPaid, filteredPaymentMethod, fromDate, toDate) => {
  try {
    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = AmountPaidSummaryTemplate(
      filteredReceipts,
      filteredAmountPaid,
      filteredPaymentMethod,
      fromDate,
      toDate,
      labelLogo
    );
    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printExpiringStudents = async (studentsReceiptsList, selectedYear) => {
  try {
    if (studentsReceiptsList.length < 1) {
      return toast.error(getTranslation('toast.error.noStudentFound'), toastConfig);
    }

    if (!selectedYear) {
      return toast.error(getTranslation('toast.error.noYearSelected'), toastConfig);
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

    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = StudentsExpiringCourseTemplate(studentsReceiptsListByMonth, labelLogo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printDanceRegistrationFormStezzano = async (studentInfo) => {
  try {
    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = RegistrationFormDanceStezzanoTemplate(studentInfo, labelLogo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printDanceRegistrationFormOsio = async (studentInfo) => {
  try {
    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = RegistrationFormDanceOsioTemplate(studentInfo, labelLogo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printFitnessRegistrationForm = async (studentInfo) => {
  try {
    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = RegistrationFormFitnessTemplate(studentInfo, labelLogo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printRegistrationForm = async (studentInfo) => {
  try {
    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = RegistrationFormTemplate(studentInfo, labelLogo);

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

    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = StudentsDataTemplate(selectedStudents, null, null, labelLogo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (err) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printStudentsBasedOnRegistrationDate = async (students, selectedMonth, selectedYear) => {
  try {
    const studentsWithinRange = students.filter(
      ({ RegistrationDate }) =>
        RegistrationDate &&
        new Date(RegistrationDate).getMonth() === selectedMonth &&
        new Date(RegistrationDate).getFullYear() === selectedYear
    );

    const { month } = getMonthFromId(selectedMonth);

    if (studentsWithinRange.length > 0) {
      const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

      const documentDefinition = StudentsDataTemplate(studentsWithinRange, month.toUpperCase(), selectedYear, labelLogo);

      pdfMake.createPdf(documentDefinition).open();

      return toast.success(getTranslation('toast.success.general'), toastConfig);
    }

    return toast.error(`Nessun allievo iscritto nel ${month} ${selectedYear}`, toastConfig);
  } catch (err) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

// Print name only in two/three columns (only one title at the top)
const printAssemblyBook = async (students, selectedMonth, selectedYear) => {
  try {
    // Only get students with registration date within range
    const studentsWithinRange = students.filter(
      ({ RegistrationDate }) =>
        RegistrationDate &&
        new Date(RegistrationDate).getMonth() === selectedMonth &&
        new Date(RegistrationDate).getFullYear() === selectedYear
    );

    const { month } = getMonthFromId(selectedMonth);

    if (studentsWithinRange.length > 0) {
      const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

      const documentDefinition = AssemblyBookTemplate(studentsWithinRange, month.toUpperCase(), selectedYear, labelLogo);

      pdfMake.createPdf(documentDefinition).open();

      return toast.success(getTranslation('toast.success.general'), toastConfig);
    }

    return toast.error(`Nessun allievo iscritto nel ${month} ${selectedYear}`, toastConfig);
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
      const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

      const documentDefinition = StudentsDataGreenPassTemplate(
        studentsWithExpiringGreenPass,
        month.toUpperCase(),
        selectedYearGreenPass,
        labelLogo
      );

      pdfMake.createPdf(documentDefinition).open();

      return toast.success(getTranslation('toast.success.general'), toastConfig);
    }

    return toast.error(`Nessun allievo con Scadenza Green Pass nel ${month} ${selectedYearGreenPass}`, toastConfig);
  } catch (err) {
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printTeacherRegistrationForm = async (teacherInfo) => {
  try {
    const labelLogo = await getBase64ImageFromURL('PILATES_LOGO.png');

    const documentDefinition = RegistrationFormTemplate(teacherInfo, labelLogo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success(getTranslation('toast.success.general'), toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(getTranslation('toast.error.general'), toastConfig);
  }
};

const printMembersRegister = async (year) => {
  try {
    const studentsWithRegistrationReceipt = await getStudentsWithRegistrationReceipt(year);

    const teachersWithRegistrationReceipt = await getTeachersWithRegistrationReceipt(year);

    if (!studentsWithRegistrationReceipt.length && !teachersWithRegistrationReceipt.length) {
      return toast.error(getTranslation('toast.error.noStudentFound'), toastConfig);
    }

    const documentDefinition = MembersRegisterTemplate(studentsWithRegistrationReceipt, teachersWithRegistrationReceipt, year);

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
  printDanceRegistrationFormStezzano,
  printDanceRegistrationFormOsio,
  printFitnessRegistrationForm,
  printSelectedStudents,
  printStudentsBasedOnRegistrationDate,
  printAssemblyBook,
  printStudentsWithExpiringGreenPass,
  printTeacherRegistrationForm,
  printMembersRegister,
};
