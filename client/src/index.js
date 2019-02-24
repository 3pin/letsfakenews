//import 'bootstrap-without-jquery';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Routes from './app/pages/index';

const App = () => (<BrowserRouter>
  <Routes/>
</BrowserRouter>);

ReactDOM.render(<App/>, document.getElementById('react'));
