import axios from 'axios'

export const submitStarted = () => {
  return {
    type: 'SUBMIT_STARTED',
    payload: null
  }
}

export const submit = (feedback, history) => {
  return function (dispatch) {
    axios.post('/write/feedback', {
      feedback: feedback
    }).then((response) => {
      dispatch({
        type: 'SUBMIT_ENDED',
        payload: null
      })
    }).then(() => {
      history.push('/write/thankyou')
    })
      .catch((error) => {
        dispatch({
          type: 'error',
          payload: error
        })
      })
  }
}
