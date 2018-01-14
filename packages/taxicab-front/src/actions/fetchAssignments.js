import { standardFetchAction } from '../utils'

export default standardFetchAction({
  url: '/api/assignments',
  fetchOpts: { credentials: 'include' },
  requestAction: () =>
    ({ type: 'REQUEST_ASSIGNMENTS' }),
  receiveAction: assignments =>
    ({ type: 'RECEIVE_ASSIGNMENTS', assignments }),
  receiveErrorAction: () =>
    ({ type: 'RECEIVE_ASSIGNMENTS_ERROR' })
})
