import axios from 'axios';

export const submitStarted = () => ({
  type: 'SUBMIT_STARTED_FEEDBACK',
  payload: null,
});

export const submit = (feedback, history) => function (dispatch) {
  axios.post('/write/feedback', {
    feedback,
  }).then(() => {
    dispatch({
      type: 'SUBMIT_ENDED_FEEDBACK',
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
