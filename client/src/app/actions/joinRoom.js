import axios from 'axios';

export const submitStarted = () => ({
  type: 'SUBMIT_STARTED_ROOM',
  payload: null,
});

export const submit = (room, history) => {
  const request = axios.post('/room', {
    room,
  });
  return (dispatch) => {
    const onSuccess = (response) => {
      if (response.data) {
        dispatch({
          type: 'SUBMIT_SUCCESS_ROOM',
          payload: room,
        });
        history.push('/role');
      } else {
        dispatch({
          type: 'SUBMIT_FAIL_ROOM',
          payload: null,
        });
        alert('That room does not exist');
        history.push('/room');
      }
      return response;
    };
    const onError = (error) => {
      dispatch({
        type: 'SUBMIT_NEWS_FAILED',
        payload: error.response.data.msg,
      });
      return error;
    };
    request.then(onSuccess, onError);
  };
};
