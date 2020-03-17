// REACT JS
import '../node_modules/react/cjs/react.production.min.js'
import '../node_modules/react-dom/cjs/react-dom.production.min.js'
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js'
// styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './minimum.css'
import registerServiceWorker from './registerServiceWorker'

import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter
} from 'react-router-dom'
import {
  Provider
} from 'react-redux'
import store from './app/store'
import Routes from './app/pages'

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>)

ReactDOM.render(<App />, document.getElementById('react'))
registerServiceWorker()
