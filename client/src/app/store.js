import {
  applyMiddleware,
  createStore,
} from 'redux';
import logger from 'redux-logger'; // middleware... pretty logging
import thunk from 'redux-thunk'; // middleware... pretty logging
// import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

// middlware
let middleware;
if (process.env.NODE_ENV === 'development') {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}

const store = createStore(reducer, middleware);
export default store;
// export default createStore(reducer, middleware);
// export default createStore(reducer, composeWithDevTools());
