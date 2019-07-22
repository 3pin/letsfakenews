// REACT JS
import '../node_modules/react/cjs/react.production.min.js';
import '../node_modules/react-dom/cjs/react-dom.production.min.js';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
// styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './minimum.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter
} from 'react-router-dom';

import Routes from './app/routes';

const App = () => (
  <HashRouter>
    <Routes/>
  </HashRouter>);

ReactDOM.render(<App/>, document.getElementById('react'));
