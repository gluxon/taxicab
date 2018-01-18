/* eslint-env jest */

const schemeTestMatch = require('..')

test('undefined arguments', async () => {
  const args = {
    referenceCode: '(define (cube x) (* x x x))',
    utilitiesCode: '(define (hi x) (* x x))',
    functionName: 'cube',
    functionArguments: '5',
    assertion: '(= student reference (* 5 (hi 5)))'
  }

  expect(schemeTestMatch(args)).rejects.toThrow()
})
