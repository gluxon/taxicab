/* eslint-env jest */

const schemeTestMatch = require('..')

test('file substitutions', async () => {
  const output = await schemeTestMatch({
    studentCode: `(define (cube x) (* x x x)`,
    referenceCode: '(define (cube x) (* x x x))',
    utilitiesCode: '(define (hi x) (* x x))',
    functionName: 'cube',
    functionArguments: '5',
    assertion: '(= student reference (* 5 (hi 5)))'
  })

  expect(output.stderr.startsWith('studentSubmission.scm')).toBe(true)
})
