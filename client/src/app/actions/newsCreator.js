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
    const onSuccess = (response) => {
      console.log(response);
      console.log('onSuccess, prior to dispatch');
      dispatch({
        type: 'SUBMIT_ENDED_NEWS',
        payload: null,
      });
      history.push('/write/thankyou');
      return response;
    };
    const onError = (error) => {
      console.log(error);
      console.log(error.response.data.message);
      dispatch({
        type: 'SUBMIT_NEWS_FAILED',
        payload: error.response.data.msg,
      });
      const obj = {};
      if (error.response.data.message === 'NO_NOUNS') {
        obj.desc = 'That news was not accepted because the title & story must include NOUNS.';
        obj.linkto = '/write/story';
        // window.alert('Try again... make sure to include NOUNS in your story');
      } else if (error.response.data.message === 'NO_URLS') {
        obj.desc = "That didn't work because we couldn't find any images to match your story.";
        obj.linkto = '/write/story';
        // window.alert("Try again... couldn't find images to match your story");
      } else if (error.response.data.message === 'STORY_WORDCOUNT') {
        obj.desc = 'Your story could not be validated: ensure it contains more than 1 word.';
        obj.linkto = '/write/story';
        // window.alert('Your story could not be validated: reregister your room ID with the app');
      } else if (error.response.data.message === 'STORY_NONWORD') {
        obj.desc = 'Your story could not be validated: it contains at least 1 non-english dictionary word.';
        obj.linkto = '/write/story';
        // window.alert('Your story could not be validated: reregister your room ID with the app');
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
