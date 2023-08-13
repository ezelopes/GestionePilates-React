import { isMembershipFee } from '../commondata';

const hasMembershipFeeForSelectedSolarYear = (year, receipts) => {
  const existingMembershipFeeYears = receipts
    .filter(({ ReceiptType, IncludeMembershipFee }) => isMembershipFee(ReceiptType) || IncludeMembershipFee)
    .map(({ ReceiptDate }) => new Date(ReceiptDate).getFullYear());

  return existingMembershipFeeYears.includes(year);
};

export default hasMembershipFeeForSelectedSolarYear;
