import axios from 'axios';

export const submitStarted = () => ({
  type: 'SUBMIT_STARTED_ROOM',
  payload: null,
});

export const submit = (room, history) => function (dispatch) {
  axios.post('/room', {
    room,
  }).then((res) => {
    console.log(res.data);
    if (res.data) {
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
  }).catch((error) => {
    dispatch({
      type: 'error',
      payload: error,
    });
  });
};
