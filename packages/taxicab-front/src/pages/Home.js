import React from 'react'

export default class Home extends React.PureComponent {
  render () {
    document.title = 'Taxicab'
    return <div>
      <h1>Welcome!</h1>
      <p>Taxicab is an automated grading suite for Scheme courses. It enables instant grading feedback to students.</p>
    </div>
  }
}
