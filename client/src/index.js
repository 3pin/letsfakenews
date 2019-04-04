import './minimum.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter
} from 'react-router-dom';

import Routes from './app/pages/routes';

const App = () => (<HashRouter>
  <Routes/>
</HashRouter>);

ReactDOM.render(<App/>, document.getElementById('react'));
