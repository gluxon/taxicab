/* eslint-env jest */
const infer = require('..')

test('name inference works for code with no functions', () => {
  const code = /* scheme */`
  (define add (+ 1 1))
  `

  const names = [...infer(code)]
  expect(names.length).toBe(0)
})
