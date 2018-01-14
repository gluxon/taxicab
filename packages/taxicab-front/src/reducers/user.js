import cookie from 'cookie'
import { createReducer } from 'utils'

const cookies = cookie.parse(document.cookie)

const reducers = {}
const initialState = {
  netid: cookies['user.sig'] && cookies['user']
    ? cookies['user']
    : null
}

export default createReducer(initialState, reducers)
