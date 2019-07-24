import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers"
import logger from "redux-logger";  //middleware... pretty logging
import thunk from "redux-thunk";  //middleware... pretty logging

//middlwares
const middleware = applyMiddleware(thunk, logger);

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
