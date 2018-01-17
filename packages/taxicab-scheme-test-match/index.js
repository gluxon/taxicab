const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const scheme = require('taxicab-scheme-runner')
const tmp = require('tmp')
const writeFile = promisify(fs.writeFile)

const createTempFile = () =>
  new Promise((resolve, reject) => {
    tmp.file((err, path, fd, cleanup) => {
      if (err) return reject(err)
      resolve([path, fd, cleanup])
    })
  })

const genericTesterPath = path.join(__dirname, 'genericTester.scm')

module.exports = async args => {
  const {
    studentCode,
    referenceCode,
    utilitiesCode,
    functionName,
    functionArguments,
    assertion
  } = args

  // Writing all of our code to a file allows plt-r5rs to generate smarter
  // errors. It can point out which line an exception occurred on.
  //
  // Not sure if there's a way to specify a file descriptor in plt-r5rs. If so,
  // we would be able to do IPC without writing to the file system.

  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "_+" }] */
  const [studentFile, _, cleanupStudentFile] = await createTempFile()
  await writeFile(studentFile, studentCode)

  const [referenceFile, __, cleanupSolutionFile] = await createTempFile()
  await writeFile(referenceFile, referenceCode)

  let utilitiesFile, ___, cleanupUtilitiesFile
  if (utilitiesCode) {
    [utilitiesFile, ___, cleanupUtilitiesFile] = await createTempFile()
    await writeFile(utilitiesFile, utilitiesCode)
  }

  const stdin = [
    `"${studentFile}"`,
    `"${referenceFile}"`,
    utilitiesCode ? `"${utilitiesFile}"` : '""',
    functionName,
    `(list ${functionArguments})`,
    `(lambda (student reference) ${assertion})`
  ].join('\n')

  const output = await scheme.file(genericTesterPath, stdin)

  cleanupStudentFile()
  cleanupSolutionFile()
  if (utilitiesCode) cleanupUtilitiesFile()

  // The genericTester.scm file outputs the result of assertion as the last
  // line of stdout. Take this out and move it to a separate property.

  let { stdout, stderr } = output
  let exitStatus = false

  const stdoutLines = output.stdout.split('\n')

  if (stdoutLines.length >= 2) {
    exitStatus = stdoutLines.pop() === '#t'
    // Remove the extra newline genericTester inserted to isolate the pseudo
    // exit status
    const lastLine = stdoutLines[stdoutLines.length - 1]
    if (lastLine === '') {
      stdoutLines.pop()
    }
    stdout = stdoutLines.join('\n')
  }

  // Replace our temporary file paths with something more human readable.
  stderr = stderr
    .replace(studentFile, 'studentSubmission.scm')
    .replace(referenceFile, 'referenceFile.scm')
    .replace(genericTesterPath, 'genericTester.scm')

  if (utilitiesFile) {
    stderr = stderr.replace(utilitiesFile, 'utilitiesFile.scm')
  }

  // Because we take #t or #f from stdout, if there was an exception that
  // prevented genericTest from finishing, stdout will have its last line
  // removed.
  //
  // The user should be warned of this on the frontend somewhere.

  return { stdout, stderr, exitStatus }
}
