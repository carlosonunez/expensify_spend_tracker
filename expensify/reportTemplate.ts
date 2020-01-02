function getExpensifyTemplate() {
  return `
<#-- See this page for more info on how this works: -->
<#-- https://integrations.expensify.com/Integration-Server/doc/export_report_template.html -->
[<#t>
<#list reports?take_while(report ->
  (report.reportName != "Duplicates and Unaccounted For - 2017" ||
   report.reportName != "Duplicates and Unaccounted Fors - 2018" ||
   report.policyName == "Carlos Nunez")) as report>
  <#list report.transactionList?take_while(expense ->
    (expense.amount != 0 || expense.convertedAmount != 0 || expense.modifiedAmount != 0))
  as expense>
  {"dateIncurred":"\${expense.inserted}",<#t>
    <#if expense.modifiedMerchant != "">
    "merchant":"\${expense.modifiedMerchant}",<#t>
    <#else>
    "merchant":"\${expense.merchant}",<#t>
    </#if>
    "category":"\${expense.category}",<#t>
    "tags":"\${expense.tag}",<#t>
    <#if expense.convertedAmount != 0>
    "amountUSD":\${expense.convertedAmount / 100}},<#t>
    <#elseif expense.modifiedAmount != 0>
    "amountUSD": \${expense.modifiedAmount / 100}},<#t>
    <#else>
    "amountUSD": \${expense.amount / 100}},<#t>
    </#if>
  </#list>
</#list>
]<#t>
  `.trim()
}
