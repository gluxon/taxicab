module.exports = (sequelize, DataTypes) => {
  const options = { name: { plural: 'feedback' } }

  const Feedback = sequelize.define('feedback', {
    start: DataTypes.INTEGER,
    end: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, options)

  Feedback.associate = models => {
    Feedback.belongsTo(models.submission)
    Feedback.belongsTo(models.user)
  }

  return Feedback
}
