/* eslint-env jest */
const scheme = require('..')

test('evaling multiple files with loadEval', async () => {
  const load1 = /* scheme */`
    (define (add a b)
      (+ a b))
    "noisy"
  `

  const load2 = /* scheme */`
    (define (subtract a b)
      (- a (add b 0)))
    "noisy"
  `

  const code = /* scheme */`
    (subtract (add 1 5) 2)
  `

  const output = await scheme.loadEval(load1, load2, code)
  expect(output.stdout.trim()).toBe('4')
})
