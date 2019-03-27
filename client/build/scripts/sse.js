if (window.EventSource !== undefined) {
  const sse = new EventSource("/settings/sse");
  console.log("Your browser has requested to connect to SSE");
  // Handler for all events
  sse.onmessage = (event) => {
    if (mode === 'development') {
      console.log(event);
    }
  };
  sse.addEventListener('startup', event => {
    let obj = event.data;
    if (mode === 'development') {
      console.log(obj)
    }
  });
  sse.addEventListener('admin', event => {
    let obj = JSON.parse(event.data);
    if (mode === 'development') {
      console.log(obj)
    }
  });
  sse.addEventListener('story', event => {
    let story = JSON.parse(event.data);
    if (mode === 'development') {
      console.log(story);
    }
    var rowCount = $('table#stories >tbody >tr').length + 1;
    makerow(story, rowCount);
  });
  sse.addEventListener('feedback', event => {
    let feedback = JSON.parse(event.data);
    if (mode === 'development') {
      console.log(feedback);
    }
    var rowCount = $('table#feedback >tbody >tr').length + 1;
    makerow(feedback, rowCount);
  });
  sse.addEventListener('error', function(e) {
    if (e.readyState === EventSource.CLOSED) {
      console.log('error...');
      console.log(e);
      // Connection was closed.
    }
  }, false);
}
