function getCreditCardFromTag(tag) {
  if (tag.split(':').length == 2) {
    return tag.split(':')[-1]
  }
  else {
    return tag
  }
}
