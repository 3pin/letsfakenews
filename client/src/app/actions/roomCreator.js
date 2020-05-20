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
    };
    const onError = (error) => {
      console.log(error.response.data.message);
      dispatch({
        type: 'SUBMIT_FAIL_ROOM',
        payload: '-',
      });
      // history.push('/room');
      // alert('That room does not exist');
      const obj = {};
      if (error.response.data.message === 'INCORRECT_ROOM') {
        obj.desc = 'Incorrect Room (that room does not exist).';
        obj.linkto = '/room';
        // window.alert('Try again... make sure to include NOUNS in your story');
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
