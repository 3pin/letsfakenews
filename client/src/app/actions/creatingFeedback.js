import axios from 'axios';

export const submitStarted = () => ({
  type: 'SUBMIT_STARTED',
  payload: null,
});

export const submit = (feedback, history) => function (dispatch) {
  axios.post('/write/feedback', {
    feedback,
  }).then(() => {
    dispatch({
      type: 'SUBMIT_ENDED',
      payload: null,
    });
  }).then(() => {
    history.push('/write/thankyou');
  })
    .catch((error) => {
      dispatch({
        type: 'error',
        payload: error,
      });
    });
};
