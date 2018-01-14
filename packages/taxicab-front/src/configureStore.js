import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import history from './history'
import * as reducers from './reducers'

export default function configureStore (initialState) {
  const store = createStore(
    combineReducers({ ...reducers, routing: routerReducer }),
    initialState,
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  )

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

// https://github.com/zalmoxisus/redux-devtools-extension/issues/124#issuecomment-221972997
// eslint-disable-next-line
Set.prototype.toJSON = function () {
  return [...this]
}
