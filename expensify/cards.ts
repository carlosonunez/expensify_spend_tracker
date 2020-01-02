function getCreditCardFromTag(tag) {
  if (isV1Tag(tag) {
    return tag.split(':').slice(-1)[0]
  }
  else {
    return tag
  }
}

function isV1Tag(tag) {
  if (tag.toLowerCase().match(/^[a-z]+:[a-z]+:[a-z]+ [0-9]+$/) != null) {
    return true
  }
}
