import {
  applyMiddleware,
  createStore,
} from 'redux';
import logger from 'redux-logger'; // middleware... pretty logging
import thunk from 'redux-thunk'; // middleware... pretty logging
// import { composeWithDevTools } from 'redux-devtools-extension';
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
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
export { persistor, store };
