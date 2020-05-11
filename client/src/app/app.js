import React from 'react';
import {
  Provider,
} from 'react-redux';
import {
  HashRouter as Router,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import Routes from './pages';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider>
        <Router>
          <Routes />
        </Router>
      </CookiesProvider>
    </PersistGate>
  </Provider>
);

export default App;
