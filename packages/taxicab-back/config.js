// The below requires are normally ran as a part of the server startup, but are
// necessary when running through the sequelize CLI.
module.exports = {
  'development': {
    'username': process.env.DB_USER || 'root',
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME || 'taxicab',
    'host': process.env.DB_HOST,
    'dialect': 'mysql',
    // Only log on warnings and errors
    'logging': false,
    'operatorsAliases': false
  },
  'production': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'dialect': 'mysql',
    // Only log on warnings and errors
    'logging': false,
    'operatorsAliases': false
  }
}
