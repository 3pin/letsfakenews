//import 'bootstrap-without-jquery';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './minimum.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter
} from 'react-router-dom';

import Routes from './app/pages/index';

const App = () => (<HashRouter>
  <Routes/>
</HashRouter>);

ReactDOM.render(<App/>, document.getElementById('react'));
