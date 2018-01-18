module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    netid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('Instructor', 'TA', 'Student'),
      allowNull: false,
      defaultValue: 'Student'
    }
  })

  User.associate = models =>
    User.belongsTo(models.class)

  return User
}
