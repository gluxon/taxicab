/* eslint-env jest */

const schemeTestMatch = require('..')

test('cube output exit status', async () => {
  const output = await schemeTestMatch({
    studentCode: `
      (display "hello\n")
      (define (cube x) (* x x x))
      (display (cube 5))
    `,
    referenceCode: '(define (cube x) (* x x x))',
    utilitiesCode: '(define (hi x) (* x x))',
    functionName: 'cube',
    functionArguments: '5',
    assertion: '(= student reference (* 5 (hi 5)))'
  })

  expect(output.stdout).toBe('hello\n125')
})
