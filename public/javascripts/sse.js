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
    let obj1 = event.data;
    if (mode == 'development') {
      console.log(obj1)
    }
  });
  sse.addEventListener('test', event => {
    let obj2 = JSON.parse(event.data);
    if (mode == 'development') {
      console.log(obj2)
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
      console.log(e);
      // Connection was closed.
    }
  }, false);

}
