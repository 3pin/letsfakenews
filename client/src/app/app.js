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

/*
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
//
store.subscribe(() => {
  loadState();
});
//
store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  });
});
*/

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
