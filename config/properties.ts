function setConfiguration(configJson) {
  try {
    PropertiesService.getScriptProperties().setProperties(configJson, false)
    return "Properties set."
  }
  catch(error) {
    Logger.log("ERROR: Unable to set properties -- " + error)
    return "Unable to set properties"
  }
}

function getProperty(key) {
  return PropertiesService.getScriptProperties().getProperty(key)
}
