module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    netid: { type: DataTypes.STRING, unique: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: DataTypes.ENUM('Instructor', 'TA', 'Student')
  })

  User.associate = models =>
    User.belongsTo(models.class)

  return User
}
