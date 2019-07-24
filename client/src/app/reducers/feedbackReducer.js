const initialState = {
  feedback: "",
  submitting: false
}
const feedbackReducer = (state=initialState, action) => {
  switch(action.type) {
    case "updateFeedback": {
      state = {...state, feedback: action.payload};
      break;
    }
    case "submitStarted": {
      state = {...state, submitting: true};
      break;
    }
    case "submitEnded": {
      state = {...state, submitting: false, feedback: ""};
      break;
    }
    default: {
      state = {...state}
    }
  }
  return state;
};
export default feedbackReducer
