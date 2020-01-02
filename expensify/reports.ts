/*
 * I realize that there are large performance gains to be had by moving
 * this logic into the Freemarker template that generates this JSON.
 * However, (a) Freeform is complicated, and
 * (b) the Expensify API is a bit fickle wrt rendering these templates.
 * */
function fixExpensifyExpenses(expenses) {
  return expenses.replace(/\"\"texas rangers\" Sportservice/ig, '"Texas Rangers Sportservice"')
    .replace(/\"\"texas rangers\"\"/ig, '"Texas Rangers"')
    .replace(/pet supplies \"plus\"/ig, 'Pet Supplies Plus')
    .replace('"Texas Rangers Sportservice""', '"Texas Rangers Sportservice"')
    .replace(/\\\:/g, ':')
    .replace(/},]$/gi, '}]')
}

function getExpensesFromExpensify(startDate, limit = 0, debug = false) {
  var expenseReportName = getExpensifyReportsFileName(startDate, limit)
  console.log("Filename generated: " + expenseReportName)
  var additionalParameters = {
    "fileName": expenseReportName
  }
  var expenses = runExpensifyFunction({}, "download", {}, false,
    {}, "", additionalParameters)
  var fixedExpenses = fixExpensifyExpenses(expenses)
  if (debug) {
    console.log("Returning raw JSON for inspection.")
    return fixedExpenses
  }
  return JSON.parse(fixedExpenses)
}

// This function can take several minutes to run given the # of expenses in
// each report.
function getExpensifyReportsFileName(startDate, limit = 0) {
  var job = {
    "type": "combinedReportData",
    "reportState": "APPROVED,REIMBURSED,SUBMITTED,ARCHIVED",
    "filters": { "startDate": startDate }
  }
  if (limit > 0) {
    job.limit = limit
  }
  var outputs = {
    "fileExtension": "json",
    "fileBasename": "trackingSpreadsheetDump"
  }
  console.log("Generating expense report; please hang on.")
  if (limit > 0) {
    console.log(`Note that we are only fetching ${limit} expenses.`)
  }
  return runExpensifyFunction(job, "file", outputs, true, {}, getExpensifyTemplate())
}
