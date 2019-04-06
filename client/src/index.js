//import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
//import '../node_modules/bootstrap-without-jquery/dist/bootstrap-without-jquery.min.js'
//import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
//import './maximum.css';
import './minimum.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter
} from 'react-router-dom';

import Routes from './app/routes';

const App = () => (<HashRouter>
  <Routes/>
</HashRouter>);

ReactDOM.render(<App/>, document.getElementById('react'));
