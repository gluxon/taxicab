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

reducers['REQUEST_UTILITIES'] = (state, action) =>
  ({ ...state, isFetchingAll: true })

reducers['RECEIVE_UTILITIES_ERROR'] = (state, action) =>
  ({ ...state, isFetchingAll: false, hadErrorFetchingAll: true })

reducers['RECEIVE_UTILITIES'] = (state, action) => ({
  ...state,
  isFetchingAll: false,
  hadErrorFetchingAll: false,
  lastUpdatedAll: Date.now(),
  items: action.utilities.reduce((acc, el) =>
    ({ ...acc, [el.id]: el }), {})
})

/*
 * Single
 */

reducers['REQUEST_UTILITY'] = (state, action) => ({
  ...state,
  isFetchingIds: new Set([...state.isFetchingIds, action.id])
})

reducers['RECEIVE_UTILITY_ERROR'] = (state, action) => ({
  ...state,
  isFetchingIds: new Set([...state.isFetchingIds]
    .filter(id => id !== action.id)),
  hadErrorFetchingIds: new Set([...state.hadErrorFetchingIds, action.id])
})

reducers['RECEIVE_UTILITY'] = (state, action) => ({
  ...state,
  isFetchingIds: new Set([...state.isFetchingIds]
    .filter(id => id !== action.utility.id)),
  hadErrorFetchingIds: new Set([...state.hadErrorFetchingIds]
    .filter(id => id !== action.utility.id)),
  lastUpdatedById: {
    ...state.lastUpdatedById,
    [action.utility.id]: Date.now()
  },
  items: {
    ...state.items,
    [action.utility.id]: action.utility
  }
})

reducers['UPDATE_UTILITY_NAME'] = (state, action) => ({
  ...state,
  items: {
    ...state.items,
    [action.id]: {
      ...state.items[action.id],
      name: action.name
    }
  }
})

export default createReducer(initialState, reducers)
