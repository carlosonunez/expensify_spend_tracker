function runExpensifyFunction(jobJson, jobType = "get") {
  var userId = getProperty("expensify_api_username")
  var secret = getProperty("expensify_api_secret_key")
  var url = getProperty("expensify_integrations_url")
  var jobDescription = generateRequestJobDescription(jobType,
    userId, secret, jobJson)
  var options = {
    'method': 'POST',
    'payload': "requestJobDescription="+JSON.stringify(jobDescription)
  }
  var response = UrlFetchApp.fetch(url, options)
  if (response.getResponseCode() != 200) {
    return showError("Expensify API call failed: " + response.getContentText())
  }
  return response.getContentText()
}

function generateRequestJobDescription(jobType, userId, secret, input = {}, output = {}) {
  var jobDescription = {
    "type": jobType,
    "credentials": {
      "partnerUserID": userId,
      "partnerUserSecret": secret
    },
    "inputSettings": input,
    "outputSettings": output,
  };
  return jobDescription;
}

function tellExpensifyToSayHi() {
  return "Your Expensify scripts say 'Hi!'";
}
