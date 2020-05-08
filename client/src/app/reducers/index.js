import { combineReducers } from 'redux';

import newsReducer from './newsReducer';
import feedbackReducer from './feedbackReducer';
import isLoggedIn from './isLoggedInReducer';
import roomReducer from './roomReducer';

export default combineReducers({
  newsReducer, feedbackReducer, isLoggedIn, roomReducer,
});
