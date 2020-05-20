const initialState = {
  feedback: '',
  submitting: false,
};
const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_STARTED_FEEDBACK':
    {
      console.log('SUBMIT_STARTED');
      return {
        ...state,
        submitting: true,
      };
    }
    case 'SUBMIT_ENDED_FEEDBACK':
    {
      console.log('SUBMIT_ENDED');
      return {
        ...state,
        submitting: false,
      };
    }
    case 'SUBMIT_FEEDBACK_FAILED':
    {
      console.log('SUBMIT_FEEDBACK_FAILED');
      return {
        ...state,
        submitting: false,
        error: action.payload,
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
