import { notification } from 'antd'
import { standardFetchAction } from 'utils'

export default standardFetchAction({
  url: utility => `/api/utilities/${utility.id}`,
  fetchOpts: { method: 'DELETE', credentials: 'include' },
  parseResponse: false,
  receiveAction: utility => {
    notification['success']({
      message: 'Success',
      description: <span>Successfully deleted utility <strong>{utility.name}</strong></span>
    })
    return ({ type: 'DELETE_UTILITY', id: utility.id })
  },
  receiveErrorAction: (_, utility) => {
    notification['error']({
      message: 'Error',
      description: <span>There was an error deleting utility <strong>{utility.name}</strong></span>
    })
    return { type: 'DELETE_UTILITY_ERROR', id: utility.id }
  }
})
