//import 'bootstrap-without-jquery';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './minimum.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Routes from './app/pages/index';

const App = () => (<BrowserRouter basename="/directory-name">
  <Routes/>
</BrowserRouter>);

ReactDOM.render(<App/>, document.getElementById('react'));
