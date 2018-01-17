import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: id => `/api/assignments/${id}/submissions`,
  fetchOpts: { credentials: 'include' },
  requestAction: id => {
    if (!Number.isInteger(id)) throw new TypeError('Expected id to be an integer.')
    return ({ type: 'REQUEST_SUBMISSIONS_FOR_ASSIGNMENT', id })
  },
  receiveAction: (submissions, id) =>
    ({ type: 'RECEIVE_SUBMISSIONS_FOR_ASSIGNMENT', submissions, id }),
  receiveErrorAction: id =>
    ({ type: 'RECEIVE_SUBMISSIONS_FOR_ASSIGNMENT_ERROR', id })
})
