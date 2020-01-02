function getExpensifySheet() {
  var expensesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Expensify Data")
  if (expensesSheet === null) {
    console.log("Creating 'Expensify Data' spreadsheet")
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    ss.insertSheet("Expensify Data")
  }
}

function clearExpensifySheet() {
  var range = getExpensifySheet().getRange('A1:E99999')
  range.clearContent()
}

function writeHeader() {
  var headers = [ 'Date Incurred', 'Merchant', 'Category', 'Card', 'Amount' ]
  var range = getExpensifySheet().getRange('A1:E1')
  range.setValues(headers)
  range.setFontWeight("bold")
}

function addExpense(expense, row) {
  var range = getExpensifySheet().getRange(`A${row}:E${row}`)
  var array = [
    expense.dateIncurred,
    expense.merchant,
    expense.category,
    getCreditCardData(expense.tags),
    expense.amountUSD
  ]
  range.setValues(array)
}

