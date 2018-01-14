const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const uploadsDir = path.join(__dirname, '../uploads')

const rename = promisify(fs.rename)
const unlink = promisify(fs.unlink)
const mkdirp = promisify(require('mkdirp'))

module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('assignment', {
    name: DataTypes.STRING,
    description: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    solution: DataTypes.TEXT,
    template: DataTypes.TEXT
  })

  Assignment.associate = models => {
    Assignment.belongsTo(models.class)
    Assignment.hasMany(models.test, { onDelete: 'CASCADE' })
  }

  Assignment.prototype.descriptionFilePath = function () {
    return path.join(uploadsDir, `${this.id}.pdf`)
  }

  Assignment.prototype.setupDescriptionFile = async function (from) {
    await mkdirp(uploadsDir)
    await rename(from, this.descriptionFilePath())
    this.description = true
  }

  Assignment.prototype.replaceDescriptionFile = async function (from) {
    if (this.description) {
      await unlink(this.descriptionFilePath())
    }
    await this.setupDescriptionFile(from)
  }

  Assignment.hook('beforeDestroy', 'deleteDescription', async assignment => {
    if (assignment.description) {
      await unlink(assignment.descriptionFilePath())
    }
  })

  return Assignment
}
