import {
  applyMiddleware,
  createStore,
} from 'redux';
import logger from 'redux-logger'; // middleware... pretty logging
import thunk from 'redux-thunk'; // middleware... pretty logging
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
// either setup for browser-storage or browserTAB-storage
import storageSession from 'redux-persist/lib/storage/session';
// import storageSession from 'redux-persist/lib/storage/';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  stateReconciler: autoMergeLevel1,
};
const persistedReducer = persistReducer(persistConfig, reducer);

// logging middlware
let middleware;
if (process.env.NODE_ENV === 'development') {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export {
  persistor,
  store,
};
