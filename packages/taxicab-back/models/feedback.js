module.exports = (sequelize, DataTypes) => {
  const options = { name: { plural: 'feedback' } }

  const Feedback = sequelize.define('feedback', {
    start: { type: DataTypes.INTEGER, allowNull: false },
    end: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: false }
  }, options)

  Feedback.associate = models => {
    Feedback.belongsTo(models.submission)
    Feedback.belongsTo(models.user)
  }

  return Feedback
}
