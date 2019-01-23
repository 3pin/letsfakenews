
if (!!window.EventSource) {
  console.log("Your browser supports SSE");
  const sse = new EventSource("/sse");
  // Handler for all events
  sse.onmessage = (event) => {
    //console.log(event);
  };
  sse.addEventListener('message', event => {
    const obj = JSON.parse(event.data);
    location.reload(obj);
  });
} else {
  console.log("Your browser doesn't support SSE");
}
