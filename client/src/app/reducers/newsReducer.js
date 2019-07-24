const initialState = {
  story: "",
  title: "",
  submitting: false
}
const newsReducer = (state = initialState, action) => {
  switch (action.type) {
  case "updateStory":
    {
      return { ...state,
        story: action.payload
      };
    }
  case "updateTitle":
    {
      return { ...state,
        title: action.payload
      };
    }
  case "submitStarted":
    {
      return { ...state,
        submitting: true
      };
    }
  case "submitEnded":
    {
      return { ...state,
        submitting: false,
        story: "",
        title: ""
      }
    }
  }
  return state
}
export default newsReducer
