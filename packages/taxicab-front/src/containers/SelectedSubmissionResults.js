import { connect } from 'react-redux'
import { fetchResultsForSubmission } from 'actions'
import { makeGetSortedSubmissionResults } from 'selectors'
import Results from 'components/Results'

const makeMapStateToProps = () => {
  const getSortedSubmissionResults = makeGetSortedSubmissionResults()
  return state => ({
    isFetching: state.results.isFetchingForSubmissionIds.has(state.ui.selectedSubmission),
    selectedSubmission: state.ui.selectedSubmission,
    results: getSortedSubmissionResults(state, state.ui.selectedSubmission)
  })
}

const mapDispatchToProps = (dispatch) => ({
  fetchResultsForSubmission: id => dispatch(fetchResultsForSubmission(id))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  fetchResults: () => dispatchProps
    .fetchResultsForSubmission(stateProps.selectedSubmission)
})

export default connect(makeMapStateToProps, mapDispatchToProps, mergeProps)(Results)
