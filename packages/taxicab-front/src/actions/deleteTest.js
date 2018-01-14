import { notification } from 'antd'
import { standardFetchAction } from 'utils'

export default standardFetchAction({
  url: test => `/api/tests/${test.id}`,
  fetchOpts: { method: 'DELETE', credentials: 'include' },
  parseResponse: false,
  receiveAction: test => {
    notification['success']({
      message: 'Success',
      description: <span>Successfully deleted test <strong>{test.name}</strong></span>
    })
    return ({ type: 'DELETE_TEST', id: test.id })
  },
  receiveErrorAction: (_, test) => {
    notification['error']({
      message: 'Error',
      description: <span>There was an error deleting test <strong>{test.name}</strong></span>
    })
    return { type: 'DELETE_TEST_ERROR', id: test.id }
  }
})
