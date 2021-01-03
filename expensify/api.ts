function fetchExpenses(start_date = "2016-01-01", end_date, limit = 0) {
  var apiKey = getProperty("expensify_api_key")
  var url = getProperty("expensify_api_url") + "?start_date=" + start_date + "&end_date=" + end_date + "&types=open,processing,archived"
  var options = {
    "method": "GET",
    "headers": {
      "X-API-Key": apiKey
    }
  }
  Logger.log("Getting receipts from " + url)
  var response = UrlFetchApp.fetch(url, options)
  if (response.getResponseCode() != 200) {
    return showError("Expensify API call failed: " + response.getContentText())
  }
  var data = JSON.parse(response)
  var expenses = JSON.parse(data.message)
  Logger.log(expenses.length + " receipts found.")
  var valid_expenses = []
  expenses.forEach(expense => {
    if isValidExpense(expense) {
      valid_expenses.push(expense)
    }
    else {
      Logger.log("Skipping receipt w/o a report: " + expense.receiptID + " -> " + expense.merchant)
    }
  })
  return valid_expenses
}

function isValidExpense(expense) {
  result = expense.reportName != "NOT_FOUND" &&
    expense.merchant != "(none)" &&
    expense.reportName.indexOf("Contino") == -1
  return result
}
