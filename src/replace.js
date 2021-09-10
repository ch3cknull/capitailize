function capitalize (s) {
  return s.replace(/(\w+)/g, s => s[0].toUpperCase() + s.substr(1))
}

module.exports.capitalize = capitalize
