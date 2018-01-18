/* eslint-env jest */

const schemeTestMatch = require('..')

test('no arguments', async () => {
  const output = await schemeTestMatch({
    studentCode: '(define (hello) "hello")',
    referenceCode: '(define (hello) "hello")',
    functionName: 'hello',
    functionArguments: null,
    assertion: '(eq? student reference)'
  })

  expect(output.exitStatus).toBeTruthy()
})
