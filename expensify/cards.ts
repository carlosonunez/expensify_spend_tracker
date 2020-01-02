function getCreditCardFromTag(tag) {
  if (isV1Tag(tag) {
    return tag.split(':').slice(-1)[0]
  }
  else if (isV2Tag(tag) {
    return tag.split(':').slice(-1)[0]
  }
  else {
    return "NO_CARD"
  }
}

function isV1Tag(tag) {
  if (tag.toLowerCase().match(/^[a-z]+:[a-z]+:[a-z]+ [0-9]+$/) != null) {
    return true
  }
}

function isV2Tag(tag) {
  if (tag.toLowerCase().match(/^[a-z]+:[a-z]+ [0-9]+$/) != null {
    return true
  }
}
