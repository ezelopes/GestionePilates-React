import { toast } from 'react-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import toastConfig from './toast.config';

import { ages, receiptType } from '../commondata/commondata';

import 'react-toastify/dist/ReactToastify.css';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReceiptTemplateAdult = require('../pdfTemplates/ReceiptTemplateAdult');
const ReceiptTemplateUnderAge = require('../pdfTemplates/ReceiptTemplateUnderAge');

const MembershipFeeTemplateAdult = require('../pdfTemplates/MembershipFeeTemplateAdult');
const MembershipFeeTemplateUnderAge = require('../pdfTemplates/MembershipFeeTemplateUnderAge');

const MembershipFeeSummaryTemplate = require('../pdfTemplates/MembershipFeeSummaryTemplate');

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

const printMembershipFeeSummaryTemplate = async (studentReceiptsList, fromData, toDate) => {
  const documentDefinition = await MembershipFeeSummaryTemplate.default(studentReceiptsList, fromData, toDate);

  pdfMake.createPdf(documentDefinition).open();
};

// eslint-disable-next-line import/prefer-default-export
export { printSelectedReceipts, printMembershipFeeSummaryTemplate };
