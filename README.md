# Taxicab

<img src="packages/taxicab-front/src/assets/taxicab+smoke.svg" style="width: 200px;"/>

Taxicab is an automated grading suite for Scheme courses.

> I remember once going to see him (Ramanujan) when he was lying ill at Putney. I had ridden in taxi-cab No. 1729, and remarked that the number seemed to be rather a dull one, and that I hoped it was not an unfavourable omen. "No", he replied, "it is a very interesting number; it is the smallest number expressible as the sum of two (positive) cubes in two different ways." - G.H. Hardy

## Setup

Install Node.js, MySQL, and Racket.

```sh
$ npm install
$ npx lerna bootstrap
```

The Racket plt-r5rs executable will be used primarily. Since it has the ability
to read arbitrary files, sandboxing it is strongly recommended. A sample
AppArmor profile is provided below.

```
#include <tunables/global>

/usr/bin/plt-r5rs {
  #include <abstractions/base>

  /usr/bin/plt-r5rs r,
  /usr/bin/racket rix,
  /etc/racket/** r,
  /usr/share/racket/** r,
  /tmp/* r,

  /var/www/taxicab/packages/taxicab-scheme-test-match/genericTester.scm r,
}
```
