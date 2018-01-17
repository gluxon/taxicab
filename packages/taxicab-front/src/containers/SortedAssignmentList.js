import { connect } from 'react-redux'
import { fetchAssignments } from 'actions'
import { getAssignmentsByDueDate } from 'selectors'
import AssignmentList from 'components/AssignmentList'

const mapStateToProps = state => ({
  isFetching: state.assignments.isFetchingAll,
  hadErrorFetching: state.assignments.hadErrorFetchingAll,
  assignments: getAssignmentsByDueDate(state)
})

const mapDispatchToProps = dispatch => ({
  fetchAssignments: () => dispatch(fetchAssignments())
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList)
