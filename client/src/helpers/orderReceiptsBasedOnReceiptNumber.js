const orderReceiptsBasedOnReceiptNumber = (receipts) => {
    const orderedReceipts = receipts.sort((a, b) => {
    if (a.ReceiptNumber === '') {
        return -1
    }

    const receiptA = a.ReceiptNumber.split('/');
    const receiptB = b.ReceiptNumber.split('/');

    const receiptNumberA = parseInt(receiptA[0], 10) || 0
    const receiptNumberB = parseInt(receiptB[0], 10) || 0

    const receiptYearA = parseInt(receiptA[1], 10) || 0
    const receiptYearB = parseInt(receiptB[1], 10) || 0

    return receiptYearA - receiptYearB || receiptNumberA - receiptNumberB
    })

    return orderedReceipts
}

module.exports = orderReceiptsBasedOnReceiptNumber;
