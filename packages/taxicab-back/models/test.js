module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('test', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('match', 'assert', 'bash'),
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    function: DataTypes.STRING,
    arguments: DataTypes.STRING,
    code: DataTypes.TEXT,
    expected: DataTypes.TEXT
  })

  Test.associate = models => {
    Test.belongsTo(models.assignment)
    Test.hasMany(models.result, { onDelete: 'CASCADE' })
  }

  return Test
}
