module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('test', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM('match', 'assert', 'bash'),
    points: DataTypes.INTEGER,
    function: DataTypes.STRING,
    arguments: DataTypes.STRING,
    code: DataTypes.TEXT
  })

  Test.associate = models => {
    Test.belongsTo(models.assignment)
    Test.hasMany(models.result, { onDelete: 'CASCADE' })
  }

  return Test
}
