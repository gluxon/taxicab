import { mapValues } from 'lodash'
import { createReducer } from 'utils'

const reducers = {}
const initialState = {
  isFetchingAll: false,
  hadErrorFetchingAll: false,
  lastUpdatedAll: null,
  isFetchingIds: new Set(),
  hadErrorFetchingIds: new Set(),
  lastUpdatedById: new Set(),
  items: {}
}

/*
 * Multiple
 */

reducers['REQUEST_ASSIGNMENTS'] = (state, action) =>
  ({ ...state, isFetchingAll: true })

reducers['RECEIVE_ASSIGNMENTS_ERROR'] = (state, action) =>
  ({ ...state, isFetchingAll: false, hadErrorFetchingAll: true })

reducers['RECEIVE_ASSIGNMENTS'] = (state, action) => ({
  ...state,
  isFetchingAll: false,
  hadErrorFetchingAll: false,
  lastUpdatedAll: Date.now(),
  items: action.assignments.reduce((acc, el) =>
    ({ ...acc, [el.id]: el }), {})
})

/*
 * Single
 */

reducers['REQUEST_ASSIGNMENT'] = (state, action) => ({
  ...state,
  isFetchingIds: new Set([...state.isFetchingIds, action.id])
})

reducers['RECEIVE_ASSIGNMENT_ERROR'] = (state, action) => ({
  ...state,
  isFetchingIds: new Set([...state.isFetchingIds]
    .filter(id => id !== action.id)),
  hadErrorFetchingIds: new Set([...state.hadErrorFetchingIds, action.id])
})

reducers['RECEIVE_ASSIGNMENT'] = (state, action) => ({
  ...state,
  isFetchingIds: new Set([...state.isFetchingIds]
    .filter(id => id !== action.assignment.id)),
  hadErrorFetchingIds: new Set([...state.hadErrorFetchingIds]
    .filter(id => id !== action.assignment.id)),
  lastUpdatedById: {
    ...state.lastUpdatedById,
    [action.assignment.id]: Date.now()
  },
  items: {
    ...state.items,
    [action.assignment.id]: action.assignment
  }
})

/*
 * Tests
 */

// Create an array of tests each assignment has for quick test lookup
reducers['RECEIVE_TESTS_FOR_ASSIGNMENT'] = (state, action) => ({
  ...state,
  items: Object.values(state.items).reduce((acc, assignment) => ({
    ...acc,
    [assignment.id]: {
      ...assignment,
      tests: new Set([
        ...(assignment.tests || []),
        ...action.tests
          .filter(test => test.assignmentId === assignment.id)
          .map(test => test.id)
      ])
    }
  }), {})
})

reducers['RECEIVE_TEST'] = (state, action) => ({
  ...state,
  items: Object.values(state.items).reduce((acc, assignment) => ({
    ...acc,
    [assignment.id]: {
      ...assignment,
      tests: action.test.assignmentId === assignment.id
        ? new Set([...(assignment.tests || []), action.test.id])
        : assignment.tests
    }
  }), {})
})

reducers['DELETE_TEST'] = (state, action) => ({
  ...state,
  items: mapValues(state.items, assignment =>
    assignment.tests && assignment.tests.has(action.id)
      ? { ...assignment, tests: new Set([...assignment.tests].filter(x => x !== action.id)) }
      : assignment)
})

/*
 * Submissions
 */

reducers['RECEIVE_SUBMISSIONS_FOR_ASSIGNMENT'] = (state, action) => ({
  ...state,
  items: Object.values(state.items).reduce((acc, assignment) => ({
    ...acc,
    [assignment.id]: {
      ...assignment,
      submissions: new Set([
        ...(assignment.submissions || []),
        ...action.submissions
          .filter(submission => submission.assignmentId === assignment.id)
          .map(submission => submission.id)
      ])
    }
  }), {})
})

reducers['RECEIVE_SUBMISSION'] = (state, action) => ({
  ...state,
  items: Object.values(state.items).reduce((acc, assignment) => ({
    ...acc,
    [assignment.id]: {
      ...assignment,
      submissions: action.submission.assignmentId === assignment.id
        ? new Set([...(assignment.submissions || []), action.submission.id])
        : assignment.submissions
    }
  }), {})
})

export default createReducer(initialState, reducers)
