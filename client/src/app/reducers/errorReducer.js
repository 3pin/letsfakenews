const initialState = {
  desc: null,
  linkto: null,
};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR':
    {
      console.log('ERROR REPORTED');
      return {
        ...state,
        desc: action.payload.desc,
        linkto: action.payload.linkto,
      };
    }
    default:
    {
      return state;
    }
  }
  // return state
};
export default errorReducer;
