module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  })

  Class.associate = models => {
    Class.hasMany(models.assignment, { onDelete: 'CASCADE' })
    Class.hasMany(models.user)
  }

  return Class
}
