import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: id => `/api/submissions/${id}/results`,
  fetchOpts: { credentials: 'include' },
  requestAction: id => {
    if (!Number.isInteger(id)) throw new TypeError('Expected id to be an integer.')
    return ({ type: 'REQUEST_RESULTS_FOR_SUBMISSION', id })
  },
  receiveAction: (results, id) =>
    ({ type: 'RECEIVE_RESULTS_FOR_SUBMISSION', results, id }),
  receiveErrorAction: (_, id) =>
    ({ type: 'RECEIVE_RESULTS_FOR_SUBMISSION_ERROR', id })
})
