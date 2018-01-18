import { notification } from 'antd'
import cookie from 'cookie'
import { standardFetchAction, createFormDataFromObject } from 'utils'

export default standardFetchAction({
  url: id => `/api/assignments`,
  parseResponse: false,
  fetchOpts: fieldValues => ({
    method: 'POST',
    body: createFormDataFromObject(fieldValues),
    credentials: 'include',
    headers: {
      'X-CSRF-Token': cookie.parse(document.cookie)['csrf-token']
    }
  }),
  receiveAction: fieldValues => {
    notification['success']({
      message: 'Success',
      description: <span>Assignment <strong>{fieldValues.name}</strong> has been created.</span>
    })
    return { type: 'CREATE_ASSIGNMENT' }
  },
  receiveErrorAction: (_, fieldValues) => {
    notification['error']({
      message: 'Uh-oh',
      description: <span>There was a problem creating assignment <strong>{fieldValues.name}</strong></span>
    })
    return { type: 'CREATE_ASSIGNMENT_ERROR' }
  }
})
