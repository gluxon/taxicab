module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('result', {
    passed: { type: DataTypes.BOOLEAN, allowNull: false },
    stdout: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    stderr: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    functionOutput: DataTypes.TEXT
  })

  Result.associate = models => {
    Result.belongsTo(models.submission, { onDelete: 'CASCADE' })
    Result.belongsTo(models.test, { onDelete: 'CASCADE' })
  }

  return Result
}
