import { omit } from 'lodash'
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

reducers['REQUEST_TESTS_FOR_ASSIGNMENT'] = (state, action) => ({
  ...state,
  isFetchingForAssignmentIds: new Set([...state.isFetchingForAssignmentIds, action.id])
})

reducers['RECEIVE_TESTS_FOR_ASSIGNMENT_ERROR'] = (state, action) => ({
  ...state,
  isFetchingForAssignmentIds: new Set([...state.isFetchingForAssignmentIds]
    .filter(x => x !== action.id)),
  hadErrorFetchingForAssignmentIds: new Set([
    ...state.hadErrorFetchingForAssignmentIds,
    action.id
  ])
})

reducers['RECEIVE_TESTS_FOR_ASSIGNMENT'] = (state, action) => ({
  ...state,
  isFetchingForAssignmentIds: new Set([...state.isFetchingForAssignmentIds]
    .filter(x => x !== action.id)),
  hadErrorFetchingForAssignmentIds: new Set([...state.hadErrorFetchingForAssignmentIds]
    .filter(x => x !== action.id)),
  items: action.tests.reduce((acc, x) =>
    ({ ...acc, [x.id]: x }), state.items)
})

/*
 * Single
 */

reducers['RECEIVE_TEST'] = (state, action) => ({
  ...state,
  items: {
    ...state.items,
    [action.test.id]: action.test
  }
})

reducers['DELETE_TEST'] = (state, action) => ({
  ...state,
  items: omit(state.items, [action.id])
})

export default createReducer(initialState, reducers)
