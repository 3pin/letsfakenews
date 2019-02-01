if (!!window.EventSource) {
  //
  console.log("Your browser supports SSE");
  //
  const sse = new EventSource("/sse");
  // Handler for all events
  sse.onmessage = (event) => {
    //console.log(event);
  };
  sse.addEventListener('startup', event => {
    let obj1 = event.data;
    console.log(obj1)
  });
  sse.addEventListener('test', event => {
    let obj2 = JSON.parse(event.data);
    console.log(obj2)
  });
  sse.addEventListener('update', event => {
    /* security feature to listen to only trusted locations...
    if (event.origin != "http://localhost:5000") {
      alert("Origin was not from trusted local source");
      return;
    } */
    let obj3 = JSON.parse(event.data);
    console.log(obj3)
    location.reload(obj3);
  });
  sse.addEventListener('error', function(e) {
    if (e.readyState == EventSource.CLOSED) {
      console.log(e);
      // Connection was closed.
    }
  }, false);

}
