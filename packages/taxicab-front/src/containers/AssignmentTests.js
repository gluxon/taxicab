import { connect } from 'react-redux'
import {
  deleteTest,
  fetchTest,
  fetchTestsForAssignment,
  createTestForAssignment,
  updateTest
} from 'actions'
import TestTable from 'components/TestTable'

const mapStateToProps = (state, ownProps) => {
  const assignmentTests = state.assignments.items[ownProps.assignmentId].tests
  return {
    isFetching: state.tests.isFetchingForAssignmentIds
      .has(ownProps.assignmentId),
    hadErrorFetching: state.tests.hadErrorFetchingForAssignmentIds
      .has(ownProps.assignmentId),
    tests: assignmentTests
      ? [...assignmentTests].map(testId => state.tests.items[testId])
      : []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTests: () => dispatch(fetchTestsForAssignment(ownProps.assignmentId)),
  fetchTest: id => dispatch(fetchTest(id)),
  deleteTest: test => dispatch(deleteTest(test)),
  createTestForAssignment: fieldValues =>
    dispatch(createTestForAssignment(ownProps.assignmentId, fieldValues)),
  updateTest: (id, fieldValues) => dispatch(updateTest(id, fieldValues))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestTable)
