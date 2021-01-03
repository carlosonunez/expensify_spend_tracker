function getExpenseYear(dateString) {
  // not the right way to do it, but the "right" way was failing me.
  return dateString.split('-')[0]
}

function getExpensifySheetHeaders() {
  return [[ 'Date Incurred',
            'Year',
            'Merchant',
            'Category',
            'Card',
            'Amount',
            'Expense Report',
            'Reimbursed?',
            'Budgeted?',
            'Receipt ID']]
}

function getExpensifySheetStartingColumn() {
  return "A"
}

function getExpensifySheetEndingColumn() {
  var numberOfHeaders = getExpensifySheetHeaders()[0].length - 1
  return String.fromCharCode(65 + numberOfHeaders)
}

function generateExpensifySheetRange(start, end) {
  return `${getExpensifySheetStartingColumn()}${start}:${getExpensifySheetEndingColumn()}${end}`
}

function getExpensifySheet() {
  var expensesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Expensify Data")
  if (expensesSheet === null) {
    Logger.log("Creating 'Expensify Data' spreadsheet")
    var expensesSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Expensify Data")
  }
  return expensesSheet
}


function showExpensifyDataToast() {
  message = "Fetching expense data from Expensify. This may take a few minutes."
  SpreadsheetApp.getActiveSpreadsheet().toast(message, 'Refreshing...', 240);
}

function clearExpensifyDataToast() {
  SpreadsheetApp.getActiveSpreadsheet().toast("Expensify data received!", "All done!", 1);
}

function clearExpensifySheet() {
  var range = getExpensifySheet().getRange(generateExpensifySheetRange(1,99999))
  range.clearContent()
}

function addExpense(expense, row) {
  var rangeString = generateExpensifySheetRange(row+2, row+2)
  var range = getExpensifySheet().getRange(rangeString)
  var tag = getCreditCardFromTag(expense.tag)
  if tag == "NO_CARD" {
    Logger.log("Expense " + expense.receiptID + " -> " + expense.merchant + " doesn't have a card!")
  }
  var array = [[
    expense.created,
    getExpenseYear(expense.created),
    expense.merchant,
    expense.category,
    getCreditCardFromTag(expense.tag),
    parseFloat(expense.amount_dollars),
    expense.reportName,
    expense.reimbursable,
    expense.budgeted,
    parseInt(expense.receiptID)
  ]]
  range.setValues(array)
}


function writeHeader() {
  var headers = getExpensifySheetHeaders()
  var range = getExpensifySheet().getRange(generateExpensifySheetRange(1,1))
  range.setValues(headers)
  range.setFontWeight("bold")
}

function sortExpensesByDate() {
  getExpensifySheet().setFrozenRows(1)
  getExpensifySheet().sort(1)
}

