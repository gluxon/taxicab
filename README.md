# Taxicab

Taxicab is an automated grading suite for Scheme courses.

> I remember once going to see him (Ramanujan) when he was lying ill at Putney. I had ridden in taxi-cab No. 1729, and remarked that the number seemed to be rather a dull one, and that I hoped it was not an unfavourable omen. "No", he replied, "it is a very interesting number; it is the smallest number expressible as the sum of two (positive) cubes in two different ways." - G.H. Hardy

## Setup

```sh
$ npm install
$ npx lerna bootstrap
```

## Features
* Log in with NetID
* Class enrollment with password
* Create assignments
* Test modes:
  * Match solution
  * Custom assertions
  * Bash script

## User Interface

### Header
* Sign-out
* Switch between classes
  * Store currently viewed class as users.class_id

### Sidebar
* Assignments
* Grades

### Pages
* Login
  * Simple page with the logo and a login button
* Assignments
  * Show a list of all assignments for the current course
  * Clicking on an assignment brings you to a page with the download button
