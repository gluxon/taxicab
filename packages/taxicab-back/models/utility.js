module.exports = (sequelize, DataTypes) => {
  const Utility = sequelize.define('utility', {
    name: DataTypes.STRING,
    code: DataTypes.TEXT
  })
  return Utility
}
