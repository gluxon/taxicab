import { createReducer } from 'utils'

const reducers = {}
const initialState = {
  isFetchingForAssignmentIds: new Set(),
  hadErrorFetchingForAssignmentIds: new Set(),
  items: {}
}

/*
 * Multiple
 */

reducers['REQUEST_SUBMISSIONS_FOR_ASSIGNMENT'] = (state, action) => ({
  ...state,
  isFetchingForAssignmentIds: new Set([...state.isFetchingForAssignmentIds, action.id])
})

reducers['RECEIVE_SUBMISSIONS_FOR_ASSIGNMENT_ERROR'] = (state, action) => ({
  ...state,
  isFetchingForAssignmentIds: new Set([...state.isFetchingForAssignmentIds]
    .filter(x => x !== action.id)),
  hadErrorFetchingForAssignmentIds: new Set([
    ...state.hadErrorFetchingForAssignmentIds,
    action.id
  ])
})

reducers['RECEIVE_SUBMISSIONS_FOR_ASSIGNMENT'] = (state, action) => ({
  ...state,
  isFetchingForAssignmentIds: new Set([...state.isFetchingForAssignmentIds]
    .filter(x => x !== action.id)),
  hadErrorFetchingForAssignmentIds: new Set([...state.hadErrorFetchingForAssignmentIds]
    .filter(x => x !== action.id)),
  items: action.submissions.reduce((acc, x) =>
    ({ ...acc, [x.id]: x }), state.items)
})

/*
 * Single
 */

reducers['RECEIVE_SUBMISSION'] = (state, action) => ({
  ...state,
  items: {
    ...state.items,
    [action.submission.id]: action.submission
  }
})

/*
 * Results
 */

reducers['RECEIVE_RESULTS_FOR_SUBMISSION'] = (state, action) => ({
  ...state,
  items: Object.values(state.items).reduce((acc, submission) => ({
    ...acc,
    [submission.id]: {
      ...submission,
      results: new Set([
        ...(submission.results || []),
        ...action.results
          .filter(result => result.submissionId === submission.id)
          .map(result => result.id)
      ]),
      // These same values should have been calculated on the backend for this
      // submission since results have been returned, but we'll save a network
      // request and just update them here.
      status: 'finished',
      total: action.results
        .map(result => result.test.points)
        .reduce((acc, points) => acc + points),
      earned: action.results
        .map(result => result.passed ? result.test.points : 0)
        .reduce((acc, points) => acc + points)
    }
  }), {})
})

export default createReducer(initialState, reducers)
