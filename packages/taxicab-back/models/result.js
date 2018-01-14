module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('result', {
    grade: DataTypes.INTEGER,
    debug: DataTypes.TEXT
  })

  Result.associate = models => {
    Result.belongsTo(models.submission, { onDelete: 'CASCADE' })
    Result.belongsTo(models.test, { onDelete: 'CASCADE' })
  }

  return Result
}
