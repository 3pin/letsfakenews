import axios from "axios";

export const updateStory = (story, history) => {
  history.push("/write/title");
  return {
    type: "UPDATE_STORY",
    payload: story,
  }
}

export const updateTitle = (title, history) => {
  history.push("/write/review");
  return {
    type: "UPDATE_TITLE",
    payload: title,
  }
}

export const submitStarted = () => {
  return {
    type: "SUBMIT_STARTED",
    payload: null,
  }
}

export const submit = (story, title, history) => {
  return function (dispatch) {
    let response;
    axios.post("/write/news", {
        story: story,
        title: title
      }).then((res) => {
        response = res.data;
        console.log(response)
        dispatch({
          type: "SUBMIT_ENDED",
          payload: null
        })
      }).then(() => {
        console.log(response)
        if (response === "NO_NOUNS") {
          window.alert("Try again... make sure to include NOUNS this time")
          history.push("/write/story");
        } else if (response === "NO_URLS") {
          window.alert("Try again... we couldn't find images for that story")
          history.push("/write/story");
        } else {
          //window.alert("Thanks for your fake news")
          history.push("/write/thankyou");
        }
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: error
        })
      })
  }
}
