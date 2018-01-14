import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: id => `/api/tests/${id}`,
  fetchOpts: { credentials: 'include' },
  requestAction: id => {
    if (!Number.isInteger(id)) throw new TypeError('Expected id to be an integer.')
    return ({ type: 'REQUEST_TEST', id })
  },
  receiveAction: test =>
    ({ type: 'RECEIVE_TEST', test }),
  receiveErrorAction: id =>
    ({ type: 'RECEIVE_TEST_ERROR', id })
})
