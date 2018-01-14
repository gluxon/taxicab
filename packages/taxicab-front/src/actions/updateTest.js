import { notification } from 'antd'
import { standardFetchAction, createFormDataFromObject } from 'utils'

export default standardFetchAction({
  url: id => `/api/tests/${id}`,
  parseResponse: false,
  fetchOpts: (_, fieldValues) => ({
    method: 'PUT',
    body: createFormDataFromObject(fieldValues),
    credentials: 'include'
  }),
  receiveAction: (_, fieldValues) => {
    notification['success']({
      message: 'Success',
      description: <span>Test <strong>{fieldValues.name}</strong> has been updated.</span>
    })
    return { type: 'UPDATE_TEST' }
  },
  receiveErrorAction: (_, __, fieldValues) => {
    notification['error']({
      message: 'Uh-oh',
      description: <span>There was a problem updating test <strong>{fieldValues.name}</strong></span>
    })
    return { type: 'UPDATE_TEST_ERROR' }
  }
})
