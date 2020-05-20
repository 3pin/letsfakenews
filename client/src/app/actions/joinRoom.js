import axios from 'axios';

export const submitStarted = () => ({
  type: 'SUBMIT_STARTED_ROOM',
  payload: null,
});

export const submit = (room, history) => {
  const request = axios.get('/settings/room', {
    params: {
      room,
    },
  });
  return (dispatch) => {
    const onSuccess = (response) => {
      console.log(response.data.message);
      dispatch({
        type: 'SUBMIT_SUCCESS_ROOM',
        payload: room,
      });
      history.push('/role');
      /*else {
        dispatch({
          type: 'SUBMIT_FAIL_ROOM',
          payload: null,
        });
        alert('That room does not exist');
        history.push('/room');
      }
      return response;
      */
    };
    const onError = (error) => {
      console.log(error.response.data.message);
      dispatch({
        type: 'SUBMIT_FAIL_ROOM',
        payload: '',
      });
      // history.push('/room');
      // alert('That room does not exist');
      const obj = {
        desc: 'That room does not exist',
        linkto: '/room',
      };
      dispatch({
        type: 'ERROR',
        payload: obj,
      });
      return error;
    };
    request.then(onSuccess, onError);
  };
};
