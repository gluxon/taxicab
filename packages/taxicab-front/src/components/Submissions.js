import React from 'react'
import AssignmentSubmissionCreator from 'containers/AssignmentSubmissionCreator'
import AssignmentSubmissionsTable from 'containers/AssignmentSubmissionsTable'
import SelectedSubmissionSourceViewer from 'containers/SelectedSubmissionSourceViewer'
import SelectedSubmissionResults from 'containers/SelectedSubmissionResults'

export default class Submissions extends React.Component {
  componentWillMount () {
    this.props.fetchSubmissions()
  }

  render () {
    const { assignmentId, selectedSubmission } = this.props
    return <div>
      <AssignmentSubmissionCreator assignmentId={assignmentId} />
      <AssignmentSubmissionsTable assignmentId={assignmentId} />
      { selectedSubmission && <SelectedSubmissionResults /> }
      { selectedSubmission && <SelectedSubmissionSourceViewer /> }
    </div>
  }
}
