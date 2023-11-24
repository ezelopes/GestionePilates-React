// Create one payment for subscription
// (subscriptionId, memberId, paymentNumber, paymentDate, paymentMethod, paymentType, amountPaid, isShadow)
// TODO: Check if paymentNumber already exists! -> Make it unique in the DB?
const makePaymentForSubscription = async (
  subscriptionId,
  memberId,
  paymentNumber,
  paymentDate,
  paymentMethod,
  paymentType,
  amountPaid,
  isShadow
) => {};

// Update payment by ID
const updatePaymentById = (paymentId, payment) => {};

// Delete payment by ID and subscription ID -> `subscription_payment` -> if it's the last one delete the payment from the table.
