import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers"
import logger from "redux-logger";  //middleware... pretty logging
import thunk from "redux-thunk";  //middleware... pretty logging

//middlwares
let middleware;
if (process.env.NODE_ENV !== 'production') {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}

//store
export default createStore(reducer, middleware);

/*
//action listeners
store.subscribe(() => {
  console.log('store changed: ' + store.getState());
})
//action creators
store.dispatch({type: "updateStory", payload: "Leon"})
*/
