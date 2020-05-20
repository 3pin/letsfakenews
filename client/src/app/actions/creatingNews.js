import axios from 'axios';
// write story to store
export const updateStory = (story, history) => {
  history.push('/write/title');
  return {
    type: 'UPDATE_STORY',
    payload: story,
  };
};
// write title to store
export const updateTitle = (title, history) => {
  history.push('/write/review');
  return {
    type: 'UPDATE_TITLE',
    payload: title,
  };
};
// change BUTTON-UI to reflect submission-status-started
export const submitStarted = () => ({
  type: 'SUBMIT_STARTED_NEWS',
  payload: null,
});
// async action follows backend-validation
export const submit = (story, title, room, history) => {
  let request = axios.post('/write/news', {
    story,
    title,
  }, {
    params: {
      room,
    },
  });
  return (dispatch) => {
    const obj = {};
    const onSuccess = (response) => {
      dispatch({
        type: 'SUBMIT_ENDED_NEWS',
        payload: null,
      });
      // console.log(response.data);
      /*
      if (response.data === 'NO_NOUNS') {
        obj.desc = 'Try again... make sure to include NOUNS in your story';
        obj.linkto = '/write/story';
        window.alert('Try again... make sure to include NOUNS in your story');
        history.push('/write/story');
      } else if (response.data === 'NO_URLS') {
        obj.desc = "Try again... couldn't find images to match your story";
        obj.linkto = '/write/story';
        window.alert("Try again... couldn't find images to match your story");
        history.push('/write/story');
      } else if (response.data === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: reregister your room ID with the app';
        obj.linkto = '/room';
        window.alert('Your story could not be validated: reregister your room ID with the app');
        history.push('/room');
      } else {
        // window.alert("Thanks for your fake news")
        history.push('/write/thankyou');
      }
      */
      return response;
    };
    const onError = (error) => {
      console.log(error);
      console.log(error.response.data.message);
      dispatch({
        type: 'SUBMIT_NEWS_FAILED',
        payload: error.response.data.msg,
      });
      if (error.response.data.message === 'NO_NOUNS') {
        obj.desc = 'Try again... make sure to include NOUNS in your story';
        obj.linkto = '/write/story';
        // window.alert('Try again... make sure to include NOUNS in your story');
        history.push('/error');
      } else if (error.response.data.message === 'NO_URLS') {
        obj.desc = "Try again... couldn't find images to match your story";
        obj.linkto = '/write/story';
        // window.alert("Try again... couldn't find images to match your story");
        history.push('/error');
      } else if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: reregister your room ID with the app';
        obj.linkto = '/room';
        // window.alert('Your story could not be validated: reregister your room ID with the app');
        history.push('/error');
      } else {
        // window.alert("Thanks for your fake news")
        // history.push('/write/thankyou');
      }
      dispatch({
        type: 'ERROR',
        payload: obj,
      });
      return error;
    };
    request.then(onSuccess, onError);
  };
};
