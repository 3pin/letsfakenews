import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import Users from './components/Users'
import Contact from './components/Contact'

const routing = (<Router>
  <div>
    <Route path="/" component={App}/>
    <Route path="/users" component={Users}/>
    <Route path="/contact" component={Contact}/>
  </div>
</Router>)

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(routing, document.getElementById('root'))
