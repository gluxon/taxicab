/* eslint-env jest */

const scheme = require('..')

test('whitespace should appear differently', async () => {
  const oneNewline = await scheme.eval(`"\n"`)
  const noNewline = await scheme.eval(`""`)

  expect(oneNewline.stdout).not.toBe(noNewline.stdout)
})
