# taxicab-scheme-runner

```js
const scheme = require('taxicab-scheme-runner')

const eval = /* scheme */`
(define (add a b)
  (+ a b))
(add 1 2)
`
const file = '/home/schemelover/add.scm'

scheme.eval(eval).then(console.log) // returns { stdout: '3' }
scheme.file(file).then(console.log) // returns { stdout: '3' }
```
