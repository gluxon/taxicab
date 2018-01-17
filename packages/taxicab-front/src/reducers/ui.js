import { createReducer } from 'utils'

const reducers = {}
const initialState = {
  selectedSubmission: null
}

reducers['SELECT_SUBMISSION'] = (state, action) =>
  ({ ...state, selectedSubmission: action.id })

reducers['RESET_SELECTED_SUBMISSION'] = (state, action) =>
  ({ ...state, selectedSubmission: null })

export default createReducer(initialState, reducers)
