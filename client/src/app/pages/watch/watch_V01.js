import React from 'react';

export default class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.apiGet = this.apiGet.bind(this);
    this.state = {
      timings: {
        popupStart: 6.2,
        popupEnd: 11.3,
        popup_duration: null,
        imagesStart: 17.6,
        imagesEnd: 41.1,
        image_duration: null
      },
      data: {
        // object to hold data fetched from database
        data: {},
        // array to stores a time-marker per image-URL
        markers: [],
        // array to store the image-URLS
        urls: [],
        // array index for currently-displayed image from url-array
        url_index: 0
      },
      // video object defined on startup
      vid: document.getElementById("videoPlayer")
    }
  }
  apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  handleFullscreen() {
    document.activeElement.blur();
    console.log('boom');
    this.state.vid.play();
    let i = document.getElementById('videoContainer');
    // go full-screen with cross-browser support
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen()
    }
  }
  onloadedMetadata() {
    console.log('onloadedMetadata')
  }
  componentDidMount() {
    console.log('componentDidMount')
    /* calculate timings */
    this.setState.timings({popup_duration: this.state.timings.popupEnd - this.state.timings.popupStart});
    this.setState.timings({image_duration: this.state.timings.imagesEnd - this.state.timings.imagesStart})
    /* load database into this.state */
    /*
    this.apiGet(this.props.apiHello).then(res => this.setState({
      feedback: res.feedback
    })).catch(err => console.log(err));
    */
  }
  render() {
    console.log(this.state.timings);
    //const tHeaders = ['Command','Action']
    return (<div>
      <div id="button_div">
        <p>
          <button id="btnFullscreen" onClick={this.handleFullscreen.bind(this)} type="button">PLAY FULLSCREEN</button>
        </p>
      </div>
      <div id="videoContainer">
        <video id="videoPlayer" preload="metadata" autoPlay={true} controls> video not supported
          <source src="https://res.cloudinary.com/hi58qepi6/video/upload/v1548956607/aljazeera-desktop.mp4">
          </source>
        </video>
        <div id="popup_title" style={{display:"none"}}>
          <p id="popup_title_text">Default popup-title text... </p>
        </div>
        <div id="image_frame" style={{display:"none"}}>
          <img id="image" alt="" style={{display:"none"}}/>
        </div>
        <div id="scroller" className="scroll-left" style={{display:"none"}}>
          <p id="scroller_text">Default scrolling story text... </p>
        </div>
      </div>
    </div>)
  }
}
