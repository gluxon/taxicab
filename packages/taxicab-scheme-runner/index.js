const fs = require('fs')
const { spawn } = require('child_process')
const { promisify } = require('util')
const tmp = require('tmp')

const writeFile = promisify(fs.writeFile)
const createTempFile = () =>
  new Promise((resolve, reject) => {
    tmp.file((err, path, fd, cleanup) => {
      if (err) return reject(err)
      resolve([path, fd, cleanup])
    })
  })

exports.eval = async (code, stdin) => {
  const [codeFile, _, cleanup] = await createTempFile()
  await writeFile(codeFile, code)
  const output = await exports.file(codeFile, stdin)
  cleanup()
  return output
}

exports.file = async (file, stdin) => {
  const pltr5rs = spawn('plt-r5rs', [file])

  if (stdin) {
    pltr5rs.stdin.end(stdin)
  }

  let stdout = ''
  pltr5rs.stdout.on('data', data => { stdout += data.toString() })

  let stderr = ''
  pltr5rs.stderr.on('data', data => { stderr += data.toString() })

  await Promise.all([
    new Promise((resolve, reject) => {
      pltr5rs.stdout.on('error', reject)
      pltr5rs.stdout.on('end', resolve)
    }),
    new Promise((resolve, reject) => {
      pltr5rs.stderr.on('error', reject)
      pltr5rs.stderr.on('end', resolve)
    })
  ])

  return { stdout, stderr }
}
