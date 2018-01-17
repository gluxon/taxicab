import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import App from 'App'
import configureStore from './configureStore'

import 'index.css'

const store = configureStore()

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

render(App)

if (module.hot) {
  module.hot.accept('App', () => render(App))
}
