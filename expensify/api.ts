function runExpensifyFunction(jobJson, jobType = "get", outputSettings = {},
  onReceive = false, onFinish = {}, template = "", additionalParams = {}) {
  var userId = getProperty("expensify_api_username")
  var secret = getProperty("expensify_api_secret_key")
  var url = getProperty("expensify_integrations_url")
  var jobDescription = generateRequestJobDescription(jobType,
    userId, secret, jobJson, outputSettings, onReceive, onFinish, additionalParams)
  var payload = `requestJobDescription=${JSON.stringify(jobDescription)}`
  if (template != "") {
    payload = `${payload}&template=${encodeURI(template)}`
  }
  var options = { 'method': 'POST','payload': payload }
  console.log("POST to " + url + ", options: " + JSON.stringify(options))
  var response = UrlFetchApp.fetch(url, options)
  if (response.getResponseCode() != 200) {
    return showError("Expensify API call failed: " + response.getContentText())
  }
  return response.getContentText()
}

function generateRequestJobDescription(jobType, userId, secret,
  input = {}, output = {}, onReceive = false, onFinish = {},
  additionalParams = {}) {
  var jobDescription = {
    "type": jobType,
    "credentials": {
      "partnerUserID": userId,
      "partnerUserSecret": secret
    },
    "inputSettings": input,
    "outputSettings": output,
    "onFinish": onFinish
  };
  if (onReceive) {
    jobDescription.onReceive = { "immediateResponse":["returnRandomFileName"] }
  }
  for (const property in additionalParams) {
    jobDescription[property] = additionalParams[property]
  }
  return jobDescription;
}

function tellExpensifyToSayHi() {
  return "Your Expensify scripts say 'Hi!'";
}
