function getExpensesFromExpensify(startDate, limit = 0) {
  var expenseReportName = getExpensifyReportsFileName(startDate, limit)
  console.log("Filename generated: " + expenseReportName)
  var additionalParameters = {
    "fileName": expenseReportName
  }
  return JSON.parse(runExpensifyFunction({}, "download", {}, false,
    {}, "", additionalParameters).replace(/},]$/gi, '}]').replace("\\\:",":"))
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
  var template = `
<#-- See this page for more info on how this works: -->
<#-- https://integrations.expensify.com/Integration-Server/doc/export_report_template.html -->
[<#t>
<#list reports as report>
  <#list report.transactionList?take_while(expense -> expense.amount != 0) as expense>
  {"dateIncurred":"\${expense.created}",<#t>
    "merchant":"\${expense.merchant}",<#t>
    "category":"\${expense.category}",<#t>
    "tags":"\${expense.tag}",<#t>
    "amountUSD":\${expense.amount / 100}},<#t>
  </#list>
</#list>
]<#t>
  `.trim()
  console.log("Generating expense report; please hang on.")
  if (limit > 0) {
    console.log(`Note that we are only fetching ${limit} expenses.`)
  }
  return runExpensifyFunction(job, "file", outputs, true, {}, template)
}
