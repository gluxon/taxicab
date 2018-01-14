var fs = require('fs')
var path = require('path')
var basename = path.basename(module.filename)
var controllers = {}

fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js')
  .forEach(file => {
    controllers[file.replace(/\.[^/.]+$/, '')] = require(path.join(__dirname, file))
  })

module.exports = controllers
