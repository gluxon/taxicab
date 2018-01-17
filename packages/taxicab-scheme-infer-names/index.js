// A simple utility for inferring the name of functions defined in Scheme code

module.exports = function * (code) {
  const functionName = module.exports.matchExp

  let name = null
  while ((name = functionName.exec(code)) !== null) {
    yield name[1]
  }
}

module.exports.matchExp = /\(define \((.*?)[\s|)]/g
