/* eslint-env jest */
const infer = require('..')

test('name inference works for code with one function', () => {
  const code = /* scheme */`
  (define (add a b)
    (+ a b)
  `

  const names = infer(code)
  const add = names.next().value
  expect(add).toBe('add')
})
