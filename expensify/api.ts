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
