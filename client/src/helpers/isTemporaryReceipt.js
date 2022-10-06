const TEMPORARY_RECEIPT_REGEX = /^c/i;

const isTemporaryReceipt = (receiptNumber) => TEMPORARY_RECEIPT_REGEX.test(receiptNumber);

export default isTemporaryReceipt;
