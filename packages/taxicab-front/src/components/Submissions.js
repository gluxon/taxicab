import React from 'react'
import SubmissionCreator from 'components/SubmissionCreator'

export default class Submissions extends React.Component {
  render () {
    return <SubmissionCreator assignmentId={this.props.assignmentId} />
  }
}
