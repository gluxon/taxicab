import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: id => `/api/utilities/${id}`,
  fetchOpts: { credentials: 'include' },
  requestAction: id => {
    if (!Number.isInteger(id)) throw new TypeError('Expected id to be an integer.')
    return ({ type: 'REQUEST_UTILITY', id })
  },
  receiveAction: utility =>
    ({ type: 'RECEIVE_UTILITY', utility }),
  receiveErrorAction: id =>
    ({ type: 'RECEIVE_UTILITY_ERROR', id })
})
