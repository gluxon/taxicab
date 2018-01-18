module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
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
