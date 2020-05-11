import { combineReducers } from 'redux';

import newsReducer from './newsReducer';
import feedbackReducer from './feedbackReducer';
import loginReducer from './loginReducer';
import roomReducer from './roomReducer';

export default combineReducers({
  newsReducer, feedbackReducer, loginReducer, roomReducer,
});
