function deleteSheet1IfPresent() {
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet1Sheet = activeSheet.getSheetByName('Sheet1')
  if ( sheet1Sheet != null ) {
    console.log("Sheet1 found; deleting.")
    sheet1Sheet.deleteSheet()
  }
}

function onOpen() {
  showExpensifyDataToast()
  clearExpensifySheet()
  deleteSheet1IfPresent()
  writeHeader()
  getExpensesFromExpensify("2016-01-01").forEach(addExpense)
  sortExpensesByDate()
  clearExpensifyDataToast()
}
