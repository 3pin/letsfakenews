const initialState = {
  story: "",
  title: "",
  submitting: false
}
const newsReducer = (state = initialState, action) => {
  switch (action.type) {
  case "UPDATE_STORY":
    {
      return { ...state,
        story: action.payload
      };
    }
  case "UPDATE_TITLE":
    {
      return { ...state,
        title: action.payload
      };
    }
  case "SUBMIT_STARTED":
    {
      return { ...state,
        submitting: true
      };
    }
  case "SUBMIT_ENDED":
    {
      return { ...state,
        story: "",
        title: "",
        submitting: false
      }
    }
  default:
    {
      return state
    }
  }
  //return state
}
export default newsReducer
