import { connect } from 'react-redux'
import { selectSubmission, resetSelectedSubmission } from 'actions'
import { makeGetSortedAssignmentSubmissions } from 'selectors'
import SubmissionsTable from 'components/SubmissionsTable'

const makeMapStateToProps = () => {
  const getSortedAssignmentSubmissions = makeGetSortedAssignmentSubmissions()
  return (state, ownProps) => ({
    isFetching: state.submissions.isFetchingForAssignmentIds
      .has(ownProps.assignmentId),
    hadErrorFetching: state.submissions.hadErrorFetchingForAssignmentIds
        .has(ownProps.assignmentId),
    submissions: getSortedAssignmentSubmissions(state, ownProps.assignmentId),
    selectedSubmission: state.ui.selectedSubmission
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectSubmission: id => dispatch(selectSubmission(id)),
  resetSelectedSubmission: () => dispatch(resetSelectedSubmission())
})

export default connect(makeMapStateToProps, mapDispatchToProps)(SubmissionsTable)
