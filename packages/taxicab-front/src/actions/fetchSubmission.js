import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: id => `/api/submissions/${id}`,
  fetchOpts: { credentials: 'include' },
  requestAction: id => {
    if (!Number.isInteger(id)) throw new TypeError('Expected id to be an integer.')
    return ({ type: 'REQUEST_SUBMISSION', id })
  },
  receiveAction: submission =>
    ({ type: 'RECEIVE_SUBMISSION', submission }),
  receiveErrorAction: (_, id) =>
    ({ type: 'RECEIVE_SUBMISSION_ERROR', id })
})
