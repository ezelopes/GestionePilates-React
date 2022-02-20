import { toast } from 'react-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import toastConfig from './toast.config';

import { ages, receiptType, getMonthFromId, months } from '../commondata';

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
      return toast.error('Seleziona Ricevute per Stamparle', toastConfig);
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

      if (studentInfo.IsAdult === ages[0].age && receiptInfo.ReceiptType === receiptType[0].type) {
        // eslint-disable-next-line no-await-in-loop
        documentDefinition = await ReceiptTemplateAdult.default(studentInfo, receiptInfo);
      } else if (studentInfo.IsAdult === ages[0].age && receiptInfo.ReceiptType === receiptType[1].type) {
        // eslint-disable-next-line no-await-in-loop
        documentDefinition = await MembershipFeeTemplateAdult.default(studentInfo, receiptInfo);
      } else if (studentInfo.IsAdult === ages[1].age && receiptInfo.ReceiptType === receiptType[0].type) {
        // eslint-disable-next-line no-await-in-loop
        documentDefinition = await ReceiptTemplateUnderAge.default(studentInfo, receiptInfo);
      } else if (studentInfo.IsAdult === ages[1].age && receiptInfo.ReceiptType === receiptType[1].type) {
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

    return toast.success('PDF Ricevute Creato Correttamente', toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(`Un errore se e' verificato nello stampare le ricevute`, toastConfig);
  }
};

const printStudentReceipt = async (selectedReceipt, studentInfo) => {
  try {
    if (!selectedReceipt) {
      return toast.error('Seleziona Ricevuta per Stamparla', toastConfig);
    }

    let documentDefinition;

    if (studentInfo.IsAdult === ages[0].age && selectedReceipt.ReceiptType === receiptType[0].type) {
      documentDefinition = await ReceiptTemplateAdult.default(studentInfo, selectedReceipt);
    } else if (studentInfo.IsAdult === ages[0].age && selectedReceipt.ReceiptType === receiptType[1].type) {
      documentDefinition = await MembershipFeeTemplateAdult.default(studentInfo, selectedReceipt);
    } else if (studentInfo.IsAdult === ages[1].age && selectedReceipt.ReceiptType === receiptType[0].type) {
      documentDefinition = await ReceiptTemplateUnderAge.default(studentInfo, selectedReceipt);
    } else if (studentInfo.IsAdult === ages[1].age && selectedReceipt.ReceiptType === receiptType[1].type) {
      documentDefinition = await MembershipFeeTemplateUnderAge.default(studentInfo, selectedReceipt);
    }

    pdfMake.createPdf(documentDefinition).open();

    return toast.success('PDF Ricevuta Creato Correttamente', toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(`Un errore se e' verificato nello stampare la ricevuta`, toastConfig);
  }
};

const printMembershipFeeSummaryTemplate = async (studentMembershipFeeList, fromData, toDate) => {
  try {
    if (studentMembershipFeeList.length < 1) {
      return toast.error('Nessuna Quota Associativa trovata nel periodo selezionato!', toastConfig);
    }
    const documentDefinition = await MembershipFeeSummaryTemplate.default(studentMembershipFeeList, fromData, toDate);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success('PDF Quote Associative Creato Correttamente', toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(`Un errore se e' verificato nello stampare le quote associative`, toastConfig);
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

    return toast.success('PDF Riepilogo Ricevute Creato Correttamente', toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(`Un errore se e' verificato nello stampare il riepilogo ricevute`, toastConfig);
  }
};

const printExpiringStudents = async (studentsReceiptsList) => {
  try {
    if (studentsReceiptsList.length < 1) {
      return toast.error('Lista vuota!', toastConfig);
    }

    const studentsReceiptsListOrdered = studentsReceiptsList.sort((a, b) => {
      if (a.CourseEndDate === b.CourseEndDate) {
        return a.Name.toUpperCase() > b.Name.toUpperCase() ? 1 : -1;
      }

      return new Date(a.CourseEndDate) - new Date(b.CourseEndDate);
    });

    const studentsReceiptsListByMonth = {};

    for (let i = 0; i < studentsReceiptsListOrdered.length; i += 1) {
      const receipt = studentsReceiptsListOrdered[i];
      const monthId = parseInt(receipt.CourseEndDate.split('-')[1], 10) - 1;

      const month = getMonthFromId(monthId);

      if (!studentsReceiptsListByMonth[month]) {
        studentsReceiptsListByMonth[month] = [];
      }
      studentsReceiptsListByMonth[month].push(receipt);
    }

    const documentDefinition = await StudentsExpiringCourseTemplate.default(studentsReceiptsListByMonth);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success('PDF Lista Allieve In Scadenza Creato Correttamente', toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(`Un errore se e' verificato nello stampare la lista di allieve in scadenza`, toastConfig);
  }
};

const printRegistrationForm = async (studentInfo) => {
  try {
    const documentDefinition = await RegistrationFormTemplate.default(studentInfo);

    pdfMake.createPdf(documentDefinition).open();

    return toast.success('PDF Creato Correttamente', toastConfig);
  } catch (error) {
    return toast.error(`Un errore se e' verificato nello stampare il modulo d'iscrizione`, toastConfig);
  }
};

const printSelectedStudents = async (selectedStudents) => {
  try {
    if (selectedStudents.length === 0) {
      return toast.error('Seleziona Allieve per Stamparle', toastConfig);
    }
    const documentDefinition = await StudentsDataTemplate.default(selectedStudents);

    pdfMake.createPdf(documentDefinition).open();
    return toast.success('PDF Allieve Creato Correttamente', toastConfig);
  } catch (err) {
    return toast.error('Si e` verificato un errore', toastConfig);
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
          IsAdult === ages[0].age &&
          !!GreenPassExpirationDate
        );
      }

      return false;
    });

    const { month } = months.find(({ id }) => id === selectedMonth);

    if (studentsWithExpiringGreenPass.length > 0) {
      const documentDefinition = await StudentsDataTemplate.default(
        studentsWithExpiringGreenPass,
        month.toUpperCase(),
        selectedYearGreenPass
      );

      pdfMake.createPdf(documentDefinition).open();
      return toast.success('PDF Creato Correttamente', toastConfig);
    }

    return toast.error(`Nessuna Allieva Maggiorenne iscritta nel ${month} ${selectedYearGreenPass}`, toastConfig);
  } catch (err) {
    return toast.error('Si e` verificato un errore nel creare il documento', toastConfig);
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

    const { month } = months.find(({ id }) => id === selectedMonth);

    if (studentsWithExpiringGreenPass.length > 0) {
      const documentDefinition = await StudentsDataGreenPassTemplate.default(
        studentsWithExpiringGreenPass,
        month.toUpperCase(),
        selectedYearGreenPass
      );

      pdfMake.createPdf(documentDefinition).open();
      return toast.success('PDF Creato Correttamente', toastConfig);
    }

    return toast.error(`Nessuna allieva con Scadenza Green Pass nel ${month} ${selectedYearGreenPass}`, toastConfig);
  } catch (err) {
    return toast.error('Si e` verificato un errore nel creare il documento', toastConfig);
  }
};

const printTeacherRegistrationForm = async (teacherInfo) => {
  try {
    const documentDefinition = await RegistrationFormTemplate.default(teacherInfo);
    pdfMake.createPdf(documentDefinition).open();

    return toast.success('Modulo Iscrizione Creato Correttamente', toastConfig);
  } catch (error) {
    console.error(error);
    return toast.error(`Un errore se e' verificato nello stampare il modulo d'iscrizione`, toastConfig);
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
