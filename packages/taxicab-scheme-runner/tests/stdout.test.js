/* eslint-env jest */
const scheme = require('..')

const code = /* scheme */`
(define (add a b)
  (+ a b))
(add 1 5)
`

test('eval output to stdout', async () => {
  const { stdout } = await scheme.eval(code)
  expect(stdout.trim()).toBe('6')
})

test('stderr when there are no syntax errors', async () => {
  const { stderr } = await scheme.eval(code)
  expect(stderr).toBe('')
})
