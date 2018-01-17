import { notification } from 'antd'
import { standardFetchAction, createFormDataFromObject } from 'utils'

export default standardFetchAction({
  url: id => `/api/utilities/${id}`,
  parseResponse: false,
  fetchOpts: (_, fieldValues) => ({
    method: 'PUT',
    body: createFormDataFromObject(fieldValues),
    credentials: 'include'
  }),
  receiveAction: (id, fieldValues) => {
    notification['success']({
      message: 'Success',
      description: <span><strong>{fieldValues.name}</strong> has been updated.</span>
    })
    return { type: 'UPDATE_UTILITY' }
  },
  receiveErrorAction: (_, __, fieldValues) => {
    notification['error']({
      message: 'Uh-oh',
      description: <span>There was a problem updating <strong>{fieldValues.name}</strong></span>
    })
    return { type: 'UPDATE_UTILITY_ERROR' }
  }
})
