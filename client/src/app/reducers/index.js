import { combineReducers } from 'redux';

import newsReducer from './newsReducer';
import feedbackReducer from './feedbackReducer';
import isLoggedIn from './isLoggedInReducer';

export default combineReducers({ newsReducer, feedbackReducer, isLoggedIn });
