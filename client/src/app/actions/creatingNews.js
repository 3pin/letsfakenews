import axios from 'axios';

export const updateStory = (story, history) => {
  history.push('/write/title');
  return {
    type: 'UPDATE_STORY',
    payload: story,
  };
};

export const updateTitle = (title, history) => {
  history.push('/write/review');
  return {
    type: 'UPDATE_TITLE',
    payload: title,
  };
};

export const submitStarted = () => ({
  type: 'SUBMIT_STARTED_NEWS',
  payload: null,
});

export const submit = (story, title, room, history) => function (dispatch) {
  let response;
  console.log(story, title, room);
  axios.post('/write/news', {
    story,
    title,
    room,
  }).then((res) => {
    response = res.data;
    dispatch({
      type: 'SUBMIT_ENDED_NEWS',
      payload: null,
    });
  }).then(() => {
    // console.log(response);
    if (response === 'NO_NOUNS') {
      window.alert('Try again... make sure to include NOUNS in your story');
      history.push('/write/story');
    } else if (response === 'NO_URLS') {
      window.alert("Try again... couldn't find images to match your story");
      history.push('/write/story');
    } else if (response === 'DB_ERROR') {
      window.alert('Your story could not be validated: reregister your room ID with the app');
      history.push('/room');
    } else {
      // window.alert("Thanks for your fake news")
      history.push('/write/thankyou');
    }
  })
    .catch((error) => {
      dispatch({
        type: 'error',
        payload: error,
      });
    });
};
