import { connect } from 'react-redux'
import { fetchAssignments } from 'actions'
import { fetchAssignmentsByDueDate } from 'selectors'
import AssignmentList from 'components/AssignmentList'

const mapStateToProps = state => ({
  isFetching: state.assignments.isFetchingAll,
  hadErrorFetching: state.assignments.hadErrorFetchingAll,
  assignments: fetchAssignmentsByDueDate(state)
})

const mapDispatchToProps = dispatch => ({
  fetchAssignments: () => dispatch(fetchAssignments())
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList)
