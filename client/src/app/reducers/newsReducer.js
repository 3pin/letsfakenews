const initialState = {
  story: '',
  title: '',
  submitting: false,
  error: null,
};
const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STORY':
    {
      return {
        ...state,
        story: action.payload,
      };
    }
    case 'UPDATE_TITLE':
    {
      return {
        ...state,
        title: action.payload,
      };
    }
    case 'SUBMIT_STARTED_NEWS':
    {
      return {
        ...state,
        submitting: true,
      };
    }
    case 'SUBMIT_ENDED_NEWS':
    {
      return {
        ...state,
        story: '',
        title: '',
        submitting: false,
      };
    }
    case 'SUBMIT_NEWS_FAILED':
    {
      console.log('SUBMIT_NEWS_FAILED');
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
export default newsReducer;
