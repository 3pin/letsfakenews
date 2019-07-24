import { combineReducers } from "redux";

import newsReducer from "./newsReducer"
import feedbackReducer from "./feedbackReducer"

export default combineReducers({newsReducer, feedbackReducer})
