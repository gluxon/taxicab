const infer = require('taxicab-scheme-infer-names')

module.exports = (sequelize, DataTypes) => {
  const Utility = sequelize.define('utility', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT,
    code: {
      type: DataTypes.TEXT,
      validate: {
        // Ensure we can infer a name from the code snippet
        is: {
          args: infer.matchExp,
          msg: 'Utility code does not contain a function.'
        }
      }
    }
  })

  Utility.hook('beforeValidate', utility => utility.setInferredName())

  Utility.prototype.setInferredName = function () {
    this.name = [...infer(this.code)][0]
    console.log(this)
  }

  return Utility
}
