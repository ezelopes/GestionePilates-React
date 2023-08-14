import { defaultAmounts, paymentMethods, receiptTypes } from '../commondata';
import { formatDate } from './dates';

const RECEIPT_TYPE_FIELDS = receiptTypes.map(({ type }) => ({ value: type, label: type }));

const today = formatDate(new Date(), true);

/**
 * Creates a receipt object with default values
 *
 * @param {object} receipt Receipt object.
 *
 * @returns {Receipt} receipt object.
 */
export const receiptFactory = (receipt = {}) => ({
  ReceiptID: receipt?.ReceiptID || null,
  ReceiptNumber: receipt?.ReceiptNumber || '',
  ReceiptType: receipt?.ReceiptType || RECEIPT_TYPE_FIELDS[0].value,
  PaymentMethod: receipt?.PaymentMethod || paymentMethods[0].value,
  AmountPaid: receipt?.AmountPaid || defaultAmounts[0].value,
  ReceiptDate: receipt?.ReceiptDate || today,
  CourseStartDate: receipt?.CourseStartDate || today,
  CourseEndDate: receipt?.CourseEndDate || today,
  RegistrationDate: receipt?.RegistrationDate || false,
  IncludeMembershipFee: receipt?.IncludeMembershipFee || false,
});
