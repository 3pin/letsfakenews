const initialState = {
  story: "",
  title: "",
  submitting: false
}
const newsReducer = (state=initialState, action) => {
  switch(action.type) {
    case "updateStory": {
      state = {...state, story: action.payload};
      break;
    }
    case "updateTitle": {
      state = {...state, title: action.payload};
      break;
    }
    case "submitStarted": {
      state = {...state, submitting: true};
      break;
    }
    case "submitEnded": {
      state = {...state, submitting: false, story: "", title: ""};
      break;
    }
    default: {
      state = {...state}
    }
  }
  return state;
};
export default newsReducer
