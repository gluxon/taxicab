const scheme = require('taxicab-scheme-runner')
const schemeTestMatch = require('taxicab-scheme-test-match')

module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('submission', {
    status: {
      type: DataTypes.ENUM(['pending', 'running', 'finished', 'errored']),
      allowNull: false,
      defaultValue: 'Pending'
    },
    code: DataTypes.TEXT,
    overallFeedback: DataTypes.TEXT
  })

  Submission.associate = models => {
    Submission.belongsTo(models.assignment)
    Submission.belongsTo(models.user)
    Submission.hasMany(models.feedback, { onDelete: 'CASCADE' })
    Submission.hasMany(models.result, { onDelete: 'CASCADE' })
  }

  // There doesn't seem to be a has many through relationship, so we'll create
  // our own getTests method.
  Submission.prototype.getTests = async function () {
    return sequelize.models.test.findAll({
      where: { assignmentId: this.assignmentId }
    })
  }

  Submission.prototype.execute = async function () {
    const { test: Test, result: Result, utility: Utility } = sequelize.models

    this.status = 'running'
    await this.save()

    try {
      const assignment = await this.getAssignment({ include: [Test] })
      const tests = await assignment.getTests()
      const utilities = await Utility.findAll()
      const utilitiesCode = utilities
        .map(utilities => utilities.code)
        .join('\n\n')

      await Promise.all(tests.map(async test => {
        const output = await schemeTestMatch({
          studentCode: this.code,
          referenceCode: assignment.solution,
          utilitiesCode: utilitiesCode,
          functionName: test.function,
          functionArguments: test.arguments,
          assertion: test.code
        })

        const call = `(${test.function} ${test.arguments})`
        const { stdout: functionOutput } = await scheme.loadEval(this.code, call)

        await Result.create({
          passed: output.exitStatus,
          stdout: output.stdout,
          stderr: output.stderr,
          functionOutput: functionOutput.trim(),
          submissionId: this.id,
          testId: test.id
        })
      }))

      this.status = 'finished'
      await this.save()
    } catch (err) {
      this.status = 'errored'
      await this.save()
      throw err
    }
  }

  Submission.prototype.total = async function () {
    const tests = await this.getTests()
    return tests
      .map(test => test.points)
      .reduce((acc, points) => acc + points, 0)
  }

  Submission.prototype.earned = async function () {
    if (this.status !== 'finished') {
      return undefined
    }

    const tests = await this.getTests()
    const results = await this.getResults()
    return results
      .map(result => result.passed
        ? tests.find(test => test.id === result.testId).points
        : 0)
      .reduce((acc, points) => acc + points, 0)
  }

  return Submission
}
