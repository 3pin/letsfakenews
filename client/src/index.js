// REACT JS
import '../node_modules/react/cjs/react.production.min';
import '../node_modules/react-dom/cjs/react-dom.production.min';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min';
// styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from 'react-router-dom';
import {
  Provider,
} from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import registerServiceWorker from './registerServiceWorker';
import store from './app/store';
import Routes from './app/pages';

const App = () => (
  <Provider store={store}>
    <CookiesProvider>
      <Router>
        <Routes />
      </Router>
    </CookiesProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('react'));

registerServiceWorker();
