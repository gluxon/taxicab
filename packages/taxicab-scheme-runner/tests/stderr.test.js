/* eslint-env jest */
const scheme = require('..')

test('stderr when there are syntax errors', async () => {
  const code = /* scheme */`
  (define (add a b)
    (+ a b)
  `

  const { stderr } = await scheme.eval(code)
  expect(stderr.length).toBeGreaterThan(0)
})
