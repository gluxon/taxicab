module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('result', {
    passed: { type: DataTypes.BOOLEAN, allowNull: false },
    stdout: DataTypes.TEXT,
    stderr: DataTypes.TEXT,
    functionOutput: DataTypes.TEXT
  })

  Result.associate = models => {
    Result.belongsTo(models.submission, { onDelete: 'CASCADE' })
    Result.belongsTo(models.test, { onDelete: 'CASCADE' })
  }

  return Result
}
