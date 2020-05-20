import axios from 'axios';

/*
export const loginSuccess = () => ({
  type: 'LOGIN_SUCCESS',
  payload: null,
});
*/

// async action follows backend-validation
export const submit = (data, room, history) => {
  let request = axios.post('/settings/authenticate', {
    data,
  }, {
    params: {
      room,
    },
  });
  return (dispatch) => {
    const onSuccess = (response) => {
      console.log(response);
      console.log('onSuccess, prior to dispatch');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: null,
      });
      history.push('/admin');
      return response;
    };
    const onError = (error) => {
      console.log(error);
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'WRONG_USERNAME') {
        obj.desc = 'Incorrect Username (for current room).';
        obj.linkto = '/login';
        // window.alert('Try again... make sure to include NOUNS in your story');
      } else if (error.response.data.message === 'WRONG_PASSWORD') {
        obj.desc = 'Incorrect Password (for current Room).';
        obj.linkto = '/login';
        // window.alert("Try again... couldn't find images to match your story");
      } else if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
        // window.alert('Your story could not be validated: reregister your room ID with the app');
      } else {
        // window.alert("Thanks for your fake news")
        // history.push('/write/thankyou');
      }
      dispatch({
        type: 'ERROR',
        payload: obj,
      });
      history.push('/error');
      return error;
    };
    request.then(onSuccess, onError);
  };
};

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
  payload: null,
});
