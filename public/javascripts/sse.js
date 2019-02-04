if (!!window.EventSource) {
  //
  console.log("Your browser supports SSE");
  //
  const sse = new EventSource("/sse");
  // Handler for all events
  sse.onmessage = (event) => {
    if (mode == 'development') {
      console.log(event);
    }
  };
  sse.addEventListener('startup', event => {
    let obj = event.data;
    if (mode == 'development') {
      console.log(obj)
    }
  });
  sse.addEventListener('keep_alive', event => {
    let obj = JSON.parse(event.data);
    if (mode == 'development') {
      console.log(obj)
    }
  });
  sse.addEventListener('update', event => {
    /* security feature to listen to only trusted locations...
    if (event.origin != "http://localhost:5000") {
      alert("Origin was not from trusted local source");
      return;
    } */
    let story = JSON.parse(event.data);
    if (mode == 'development') {
      console.log(story);
    }
    //$("table#stories > tbody").html("");
    var rowCount = $('table#stories >tbody >tr').length + 1;
    makerow(story, rowCount);
  });
  sse.addEventListener('error', function(e) {
    if (e.readyState == EventSource.CLOSED) {
      console.log('error...');
      console.log(e);
      // Connection was closed.
    }
  }, false);

}
