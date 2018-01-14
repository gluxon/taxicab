import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from 'App'
import 'index.css'

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
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
