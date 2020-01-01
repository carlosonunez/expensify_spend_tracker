// This function can take several minutes to run given the # of expenses in
// each report.
function getExpensifyReportsFileName(startDate, limit = 0) {
  var job = {
    "type": "combinedReportData",
    "reportState": "APPROVED,REIMBURSED,SUBMITTED,ARCHIVED",
    "filters": { "startDate": startDate }
  }
  if (limit > 0) {
    job.filters.limit = limit
  }
  var outputs = {
    "fileExtension": "json",
    "fileBasename": "trackingSpreadsheetDump"
  }
  var template = `
<#-- See this page for more info on how this works: -->
<#-- https://integrations.expensify.com/Integration-Server/doc/export_report_template.html -->
date,merchant,category,card,amount
<#list reports as report>
  <#list report.transactionList as expense>
    \${expense.created},<#t>
    \${expense.merchant},<#t>
    \${expense.category},<#t>
    \${expense.tag},<#t>
    \${expense.amount}<#lt>
  </#list>
</#list>
  `.trim()
  var additionalOptions = {
    "template": encodeURI(template)
  }
  console.log("Generating expense report; please hang on.")
  if (limit > 0) {
    console.log(`Note that we are only fetching ${limit} expenses.`)
  }
  return runExpensifyFunction(job, "file", outputs, true, {}, template)
}
