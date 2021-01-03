function getCreditCardFromTag(tag) {
  if (tag === undefined) {
    return "NO_CARD"
  }
  if (isV1Tag(tag) {
    return tag.split(':').slice(-1)[0].trim()
  }
  if (isAltV1Tag(tag) {
    return tag.split(':').slice(-1)[0].trim()
  }
  else if (isV2Tag(tag) {
    return tag.split(':').slice(-1)[0].trim()
  }
  else if (isAltV2Tag(tag)) {
    return tag.split(':').slice(-1)[0].trim()
  }
  else {
    return "NO_CARD"
  }
}

function isV1Tag(tag) {
  if (tag.toLowerCase().match(/^[a-z]+:[a-z]+: [a-z]+ [0-9]+$/) != null) {
    return true
  }
}

function isAltV1Tag(tag) {
  if (tag.toLowerCase().match(/^[a-z]+:[a-z]+\\: [a-z]+ [0-9]+$/) != null) {
    return true
  }
}

function isV2Tag(tag) {
  if (tag.toLowerCase().match(/^[a-z]+: [a-z]+ [0-9]+$/) != null {
    return true
  }
}

function isAltV2Tag(tag) {
  if (tag.toLowerCase().match(/^\w+\\: \w+ \d+$/) != null {
    return true
  }
}
