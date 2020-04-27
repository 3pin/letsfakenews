const initialState = {
  feedback: '',
  submitting: false,
};
const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_STARTED':
    {
      return {
        ...state,
        submitting: true,
      };
    }
    case 'SUBMIT_ENDED':
    {
      return {
        ...state,
        submitting: false,
      };
    }
    default:
    {
      return state;
    }
  }
  // return state
};
export default feedbackReducer;
