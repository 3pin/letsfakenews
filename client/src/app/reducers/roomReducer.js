const initialState = {
  room: '',
  submitting: false,
};
const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_STARTED_ROOM':
    {
      return {
        ...state,
        submitting: true,
      };
    }
    case 'SUBMIT_SUCCESS_ROOM':
    {
      return {
        ...state,
        room: action.payload,
        submitting: false,
      };
    }
    case 'SUBMIT_FAIL_ROOM':
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
export default roomReducer;
