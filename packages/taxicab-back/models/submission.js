module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('submission', {
    code: DataTypes.TEXT,
    passed: DataTypes.BOOLEAN,
    overallFeedback: DataTypes.TEXT
  })

  Submission.associate = models => {
    Submission.belongsTo(models.assignment)
    Submission.belongsTo(models.user)
    Submission.hasMany(models.feedback, { onDelete: 'CASCADE' })
    Submission.hasMany(models.result, { onDelete: 'CASCADE' })
  }

  return Submission
}
