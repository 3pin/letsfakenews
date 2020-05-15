import axios from 'axios';
// change BUTTON-UI to reflect submission-status-started
export const submitStarted = () => ({
  type: 'SUBMIT_STARTED_FEEDBACK',
  payload: null,
});
// async action follows backend-validation
export const submit = (feedback, room, history) => {
  // console.log(feedback, room);
  let request = axios.post('/write/feedback', {
    feedback,
  }, {
    params: {
      room,
    },
  });
  return (dispatch) => {
    const onSuccess = (response) => {
      // console.log(response);
      dispatch({
        type: 'SUBMIT_ENDED_FEEDBACK',
        payload: null,
      });
      history.push('/write/thankyou');
      return response;
    };
    const onError = (error) => {
      dispatch({
        type: 'SUBMIT_FEEDBACK_FAILED',
        payload: error.response.data.msg,
      });
      return error;
    };
    request.then(onSuccess, onError);
  };
};
