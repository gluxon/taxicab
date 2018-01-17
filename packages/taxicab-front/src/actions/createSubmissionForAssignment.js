import { notification } from 'antd'
import { standardFetchAction, createFormDataFromObject } from 'utils'

export default standardFetchAction({
  url: id => `/api/assignments/${id}/submissions`,
  parseResponse: false,
  fetchOpts: (_, fieldValues) => ({
    method: 'POST',
    body: createFormDataFromObject(fieldValues),
    credentials: 'include'
  }),
  requestAction: (id, fieldValues) =>
    ({ type: 'REQUEST_CREATE_SUBMISSION_FOR_ASSIGNMENT', id, fieldValues }),
  receiveAction: id =>
    ({ type: 'RECEIVE_CREATE_SUBMISSION_FOR_ASSIGNMENT', id }),
  receiveErrorAction: () => {
    notification['error']({
      message: 'Uh-oh',
      description: 'There was a problem creating your submission. Please Try again later.'
    })
    return { type: 'RECEIVE_CREATE_SUBMISSION_FOR_ASSIGNMENT_ERROR' }
  }
})
