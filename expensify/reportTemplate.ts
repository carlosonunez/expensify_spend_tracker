function getExpensifyTemplate() {
  return `
<#-- See this page for more info on how this works: -->
<#-- https://integrations.expensify.com/Integration-Server/doc/export_report_template.html -->
[<#t>
<#list reports as report>
  <#-- double ampersands doesn't seem to work when using take_while. -->
  <#if (report.reportName?contains("Unaccounted") ||
        report.policyName != "Carlos Nunez" ||
        report.reportName?contains("Lifion"))>
    <#continue>
  </#if>
  <#assign reportName = report.reportName>
  <#if addHeader == true>
   {"dateIncurred":"none",<#t>
    "merchant":"none",<#t>
    "category":"none",<#t>
    "amountUSD":"none",<#t>
    "tags":"none",<#t>
    "expenseReport":"header_break",<#t>
    "reimbursed":"none",<#t>
    "budgeted":"none"},<#t>
  </#if>
  <#list report.transactionList?take_while(expense ->
    (expense.amount != 0 || expense.convertedAmount != 0 || expense.modifiedAmount != 0))
  as expense>
    <#if (expense.reimbursable || expense.billable)>
      <#continue>
    </#if>
    {"dateIncurred":"\${expense.inserted}",<#t>
      <#if expense.modifiedMerchant != "">
      "merchant":"\${expense.modifiedMerchant}",<#t>
      <#else>
      "merchant":"\${expense.merchant}",<#t>
      </#if>
      "category":"\${expense.category}",<#t>
      "tags":"\${expense.tag}",<#t>
      <#if expense.convertedAmount != 0>
      "amountUSD":\${expense.convertedAmount / 100},<#t>
      <#elseif expense.modifiedAmount != 0>
      "amountUSD": \${expense.modifiedAmount / 100},<#t>
      <#else>
      "amountUSD": \${expense.amount / 100},<#t>
      </#if>
      "expenseReport": "\${reportName}",<#t>
      "reimbursed": "\${expense.reimbursable?string}",<#t>
      "budgeted": "\${reportName?contains('Budgeted')?string}"},<#t>
  </#list>
</#list>
]<#t>
  `.trim()
}
