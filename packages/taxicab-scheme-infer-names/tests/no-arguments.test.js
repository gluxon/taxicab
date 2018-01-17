/* eslint-env jest */
const infer = require('..')

test('name inference works for code with one function', () => {
  const code = /* scheme */`
  (define (hi)
    "hi")
  `

  const names = infer(code)
  const hi = names.next().value
  expect(hi).toBe('hi')
})
