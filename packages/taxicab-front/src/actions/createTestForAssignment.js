import { notification } from 'antd'
import { standardFetchAction, createFormDataFromObject } from 'utils'

export default standardFetchAction({
  url: id => `/api/assignments/${id}/tests`,
  parseResponse: false,
  fetchOpts: (_, fieldValues) => ({
    method: 'POST',
    body: createFormDataFromObject(fieldValues),
    credentials: 'include'
  }),
  receiveAction: (_, fieldValues) => {
    notification['success']({
      message: 'Success',
      description: <span>Test <strong>{fieldValues.name}</strong> has been created.</span>
    })
    return { type: 'CREATE_TEST_FOR_ASSIGNMENT' }
  },
  receiveErrorAction: (_, id, fieldValues) => {
    notification['error']({
      message: 'Uh-oh',
      description: <span>There was a problem creating test <strong>{fieldValues.name}</strong></span>
    })
    return { type: 'CREATE_TEST_FOR_ASSIGNMENT_ERROR' }
  }
})
