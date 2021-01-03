var REPORTING_START_DATE = "2017-01-01"

function deleteSheet1IfPresent() {
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet1Sheet = activeSheet.getSheetByName('Sheet1')
  if ( sheet1Sheet != null ) {
    Logger.log("Sheet1 found; deleting.")
    SpreadsheetApp.getActive().deleteSheet(sheet1Sheet);
  }
}

function onOpen() {
  today = (new Date()).toISOString().substring(0,10)

  showExpensifyDataToast()
  clearExpensifySheet()
  deleteSheet1IfPresent()
  writeHeader()
  fetchExpenses(REPORTING_START_DATE, today).forEach(addExpense)
  sortExpensesByDate()
  clearExpensifyDataToast()
}
