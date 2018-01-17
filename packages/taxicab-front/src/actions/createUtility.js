import { notification } from 'antd'
import { standardFetchAction, createFormDataFromObject } from 'utils'

export default standardFetchAction({
  url: id => `/api/utilities`,
  parseResponse: false,
  fetchOpts: fieldValues => ({
    method: 'POST',
    body: createFormDataFromObject(fieldValues),
    credentials: 'include'
  }),
  receiveAction: fieldValues => {
    notification['success']({
      message: 'Success',
      description: <span>Utility <strong>{fieldValues.name}</strong> has been created.</span>
    })
    return { type: 'CREATE_UTILITY' }
  },
  receiveErrorAction: (_, fieldValues) => {
    notification['error']({
      message: 'Uh-oh',
      description: <span>There was a problem creating utility <strong>{fieldValues.name}</strong></span>
    })
    return { type: 'CREATE_UTILITY_ERROR' }
  }
})
