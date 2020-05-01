const initialState = {
  loggedIn: false,
  buttonText: 'Login',
};
const isLoggedIn = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    {
      console.log('LOGIN_SUCCESS');
      return {
        ...state,
        loggedIn: true,
        buttonText: 'Logout',
      };
    }
    case 'LOGOUT_SUCCESS':
    {
      console.log('LOGOUT_SUCCESS');
      return {
        ...state,
        loggedIn: false,
        buttonText: 'Login',
      };
    }
    default:
    {
      return state;
    }
  }
  // return state
};
export default isLoggedIn;
