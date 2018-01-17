import { connect } from 'react-redux'
import { createSubmissionForAssignment, fetchSubmission, selectSubmission } from 'actions'
import SubmissionCreator from 'components/SubmissionCreator'

const mapDispatchToProps = (dispatch, ownProps) => ({
  createSubmission: fieldValues =>
    dispatch(createSubmissionForAssignment(ownProps.assignmentId, fieldValues)),
  fetchSubmission: id => dispatch(fetchSubmission(id)),
  selectSubmission: id => dispatch(selectSubmission(id))
})

export default connect(null, mapDispatchToProps)(SubmissionCreator)
