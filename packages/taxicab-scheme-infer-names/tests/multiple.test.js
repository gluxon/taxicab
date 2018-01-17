/* eslint-env jest */
const infer = require('..')

test('name inference works for code with multiple functions', () => {
  const code = /* scheme */`
  (define (add a b)
    (+ a b)
  (define (sub a b)
    (- a b)
  (define (mult a b)
    (+ a b)
  `

  const [add, sub, mult] = [...infer(code)]
  expect(add).toBe('add')
  expect(sub).toBe('sub')
  expect(mult).toBe('mult')
})
