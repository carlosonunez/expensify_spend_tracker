function getExpensifySheet() {
  var expensesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Expensify Data")
  if (expensesSheet === null) {
    console.log("Creating 'Expensify Data' spreadsheet")
    var expensesSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Expensify Data")
  }
  return expensesSheet
}

function showExpensifyDataToast() {
  message = "Fetching Expensify data. This may take a few minutes."
  SpreadsheetApp.getActiveSpreadsheet().toast(message, 'Refreshing...', 240);
}

function clearExpensifyDataToast() {
  SpreadsheetApp.getActiveSpreadsheet().toast("Expensify data received!", "All done!", 1);
}

function clearExpensifySheet() {
  var range = getExpensifySheet().getRange('A1:E99999')
  range.clearContent()
}

function writeHeader() {
  var headers = [
    [ 'Date Incurred', 'Merchant', 'Category', 'Card', 'Amount' ]
  ]
  var range = getExpensifySheet().getRange('A1:E1')
  range.setValues(headers)
  range.setFontWeight("bold")
}

function addExpense(expense, row) {
  var range = getExpensifySheet().getRange(`A${row+2}:E${row+2}`)
  var array = [[
    expense.dateIncurred,
    expense.merchant,
    expense.category,
    getCreditCardFromTag(expense.tags),
    expense.amountUSD
  ]]
  range.setValues(array)
}

function deleteSheet1IfPresent() {
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet1Sheet = activeSheet.getSheetByName('Sheet1')
  if ( sheet1Sheet != null ) {
    console.log("Sheet1 found; deleting.")
    sheet1Sheet.deleteSheet()
  }
}

function sortByDate() {
  getExpensifySheet().setFrozenRows(1)
  getExpensifySheet().sort(1)
}

function onOpen() {
  showExpensifyDataToast()
  clearExpensifySheet()
  deleteSheet1IfPresent()
  writeHeader()
  getExpensesFromExpensify("2016-01-01").forEach(addExpense)
  sortByDate()
  clearExpensifyDataToast()
}
