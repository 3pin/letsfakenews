import axios from "axios";
const apiEndPoint = "/write/feedback"

/* this is how these actions are called in React-components...
import * as actionsNews from "./creatingNews"
actionsNews.updateStory("This is a new story I am writing")
*/

export const updateFeedback = (feedback) => dispatch => {
  dispatch({
    type: "updateFeedback",
    payload: feedback
  })
}

export function submitStarted(feedback) {
  return function (dispatch) {
    axios.post(apiEndPoint, feedback)
      .then((response) => {
        dispatch({
          type: "submitEnded",
          payload: null
        })
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: error
        })
      })
  }
}
