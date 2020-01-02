function getCreditCardFromTag(tag) {
  return tag.split(':').slice(-1)[0]
}
