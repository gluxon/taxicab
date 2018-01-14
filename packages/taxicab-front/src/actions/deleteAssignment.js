import { notification } from 'antd'
import { standardFetchAction } from 'utils'

export default standardFetchAction({
  url: id => `/api/assignments/${id}`,
  parseResponse: false,
  fetchOpts: {
    method: 'DELETE',
    credentials: 'include'
  },
  receiveAction: id => {
    notification['success']({
      message: 'Success',
      description: `The assignment has been deleted.`
    })
    return { type: 'DELETE_ASSIGNMENT' }
  },
  receiveErrorAction: (_, id) => {
    notification['error']({
      message: 'Uh-oh',
      description: `There was a problem deleting the assignment. Please try again later.`
    })
    return { type: 'DELETE_ASSIGNMENT_ERROR' }
  }
})
