const scheme = require('taxicab-scheme-runner')
const schemeTestMatch = require('taxicab-scheme-test-match')

module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('submission', {
    code: DataTypes.TEXT,
    overallFeedback: DataTypes.TEXT
  })

  Submission.associate = models => {
    Submission.belongsTo(models.assignment)
    Submission.belongsTo(models.user)
    Submission.hasMany(models.feedback, { onDelete: 'CASCADE' })
    Submission.hasMany(models.result, { onDelete: 'CASCADE' })
  }

  Submission.prototype.execute = async function () {
    const { test: Test, result: Result } = sequelize.models
    const assignment = await this.getAssignment({ include: [Test] })

    const tests = await assignment.getTests()

    await Promise.all(tests.map(async test => {
      const output = await schemeTestMatch({
        studentCode: this.code,
        referenceCode: assignment.solution,
        utilitiesCode: '(define (square x) (* x x))',
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
  }

  return Submission
}
