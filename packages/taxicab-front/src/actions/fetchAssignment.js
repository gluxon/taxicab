import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: id => `/api/assignments/${id}`,
  fetchOpts: { credentials: 'include' },
  requestAction: id => {
    if (!Number.isInteger(id)) throw new TypeError('Expected id to be an integer.')
    return ({ type: 'REQUEST_ASSIGNMENT', id })
  },
  receiveAction: assignment =>
    ({ type: 'RECEIVE_ASSIGNMENT', assignment }),
  receiveErrorAction: (_, id) =>
    ({ type: 'RECEIVE_ASSIGNMENT_ERROR', id })
})
