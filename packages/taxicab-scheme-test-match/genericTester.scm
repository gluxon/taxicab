; Generic scheme function output comparison
; Created by Robert McCartney and Brandon Cheng

(define (testEntry)
  ; Begin by reading input from stdin. Everything read here has to be a valid
  ; Scheme expression by itself so it can be properly eval'ed later. This means
  ; files should be strings, test arguments should be a list, etc...

  ; student-file and reference-file should be strings.
  ; Ex: "/home/schemer/reference.scm"
  (define student-file (read (current-input-port)))
  (define reference-file (read (current-input-port)))
  (define utilities-file (read (current-input-port)))
  (define test-function (read (current-input-port)))
  ; test-arguments should be a list
  ; Ex: (list 1 2 3)
  (define test-arguments (read (current-input-port)))
  ; test-assertion should be a lambda.
  ; Ex: (lambda (student reference) (< (abs (- student reference)) 0.0001))
  ;
  ; This is required since student-out and reference-out are not defined in the
  ; eval interaction-environment. We work around that by calling the
  ; test-assertion lambda in our environment and passing those variables.
  (define test-assertion (read (current-input-port)))

  (load student-file)
  (define student-out
    (apply (eval test-function (interaction-environment))
           (eval test-arguments (interaction-environment))))

  ; Load our reference file and grab the answer. This happens after the student
  ; file is loaded to prevent their submission from using functions defined in
  ; the reference file.
  (load reference-file)
  (define reference-out
    (apply (eval test-function (interaction-environment))
           (eval test-arguments (interaction-environment))))

  ; The utilities file should contain functions used in the test-assertion
  (if (not (equal? utilities-file ""))
    (load utilities-file))

  ; Eval the lambda that was passed as test-assertion and give it a name
  (define pass (eval test-assertion (interaction-environment)))

  ; Ensure only #t or #f is the last line
  ; It would be better if we could return the test result as a POSIX exit
  ; status, but it doesn't seem like plt-r5rs is capable of that.
  (newline)
  (display (pass student-out reference-out)))

(testEntry)
