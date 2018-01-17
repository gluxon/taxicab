import { connect } from 'react-redux'
import { fetchSubmissionsForAssignment } from 'actions'
import Submissions from 'components/Submissions'

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.submissions.isFetchingForAssignmentIds
    .has(ownProps.assignmentId),
  hadErrorFetching: state.submissions.hadErrorFetchingForAssignmentIds
      .has(ownProps.assignmentId),
  selectedSubmission: state.ui.selectedSubmission
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSubmissions: () => dispatch(fetchSubmissionsForAssignment(ownProps.assignmentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Submissions)
