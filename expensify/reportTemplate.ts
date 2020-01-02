function getExpensifyTemplate() {
  return `
<#-- See this page for more info on how this works: -->
<#-- https://integrations.expensify.com/Integration-Server/doc/export_report_template.html -->
[<#t>
<#list reports as report>
  <#list report.transactionList as expense>
  {"dateIncurred":"\${expense.inserted}",<#t>
    <#if expense.modifiedMerchant != "">
    "merchant":"\${expense.modifiedMerchant}",
    <#else>
    "merchant":"\${expense.merchant}",
    </#if>
    "category":"\${expense.category}",<#t>
    "tags":"\${expense.tag}",<#t>
    <#if expense.convertedAmount != 0>
    "amountUSD":\${expense.convertedAmount / 100}},
    <#elseif expense.modifiedAmount != 0>
    "amountUSD": \${expense.modifiedAmount / 100}},
    <#elseif expense.amount != 0>
    "amountUSD": \${expense.amount / 100}},
    </#if>
  </#list>
</#list>
]<#t>
  `.trim()
}
