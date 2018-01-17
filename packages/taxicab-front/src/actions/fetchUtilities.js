import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: '/api/utilities',
  fetchOpts: { credentials: 'include' },
  requestAction: () =>
    ({ type: 'REQUEST_UTILITIES' }),
  receiveAction: utilities =>
    ({ type: 'RECEIVE_UTILITIES', utilities }),
  receiveErrorAction: () =>
    ({ type: 'RECEIVE_UTILITIES_ERROR' })
})
