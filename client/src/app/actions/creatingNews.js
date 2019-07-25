import axios from "axios";
const apiEndpoint = "?";

/* this is how these actions are called in React-components...
import * as actionsNews from "./creatingNews"
actionsNews.updateStory("This is a new story I am writing")
*/

/*
export const updateStory = (story) => dispatch => {
  dispatch({
    type: "updateStory",
    payload: story
  })
}
*/

export const updateStory = (story) => {
  return {
    type: "UPDATE_STORY",
    payload: story,
  }
}

export const updateTitle = (title) => {
  return {
    type: "UPDATE_TITLE",
    payload: title,
  }
}

export const submitStart = (story, title) => {
  return function (dispatch) {
    axios.post(apiEndpoint, {
      story: story,
      title: title
    }).then((response) => {
        dispatch({
          type: "SUBMIT_ENDED",
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
