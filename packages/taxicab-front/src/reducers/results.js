import { createReducer } from 'utils'

const reducers = {}
const initialState = {
  isFetchingForSubmissionIds: new Set(),
  hadErrorFetchingForSubmissionIds: new Set(),
  items: {}
}

/*
 * Multiple
 */

reducers['REQUEST_RESULTS_FOR_SUBMISSION'] = (state, action) => ({
  ...state,
  isFetchingForSubmissionIds: new Set([...state.isFetchingForSubmissionIds, action.id])
})

reducers['RECEIVE_RESULTS_FOR_SUBMISSION_ERROR'] = (state, action) => ({
  ...state,
  isFetchingForSubmissionIds: new Set([...state.isFetchingForSubmissionIds]
    .filter(x => x !== action.id)),
  hadErrorFetchingForSubmissionIds: new Set([
    ...state.hadErrorFetchingForSubmissionIds,
    action.id
  ])
})

reducers['RECEIVE_RESULTS_FOR_SUBMISSION'] = (state, action) => ({
  ...state,
  isFetchingForSubmissionIds: new Set([...state.isFetchingForSubmissionIds]
    .filter(x => x !== action.id)),
  hadErrorFetchingForSubmissionIds: new Set([...state.hadErrorFetchingForSubmissionIds]
    .filter(x => x !== action.id)),
  items: action.results.reduce((acc, x) =>
    ({ ...acc, [x.id]: x }), state.items)
})

export default createReducer(initialState, reducers)
