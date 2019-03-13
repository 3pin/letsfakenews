import React from 'react';
import ReactPlayer from 'react-player';

// func to calc timing-durations
const diff = (start, end) => {
  return parseFloat((end - start).toFixed(1))
}
// function process-multimedia-metadata
const metadata = (data, image_duration, imagesStart) => {
  // load imge_URLS
  let image_locations = data.urls;
  let urls = []
  for (var url in image_locations) {
    urls.push(image_locations[url]);
  }
  // calculate multimedia metadata
  let pic_duration = Math.round(image_duration / urls.length);
  let markers = []
  for (let i = 1; i <= urls.length; i++) {
    markers.push(Math.round(imagesStart + pic_duration * i));
  }
  return {
    urls: urls,
    markers: markers
  }
}

export default class Watch extends React.Component {
  constructor(props) {
    super(props);
    //
    this.apiGet = this.apiGet.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnded = this.onEnded.bind(this);
    //
    this.state = {
      mode: "",
      //timings
      popupStart: 6.2,
      popupEnd: 11.3,
      imagesStart: 17.6,
      imagesEnd: 41.1,
      // story data
      title: "",
      story: "",
      urls: [],
      markers: [],
      // array index for currently-displayed image from url-array
      url_index: 0,
      // interface elements visibility
      popup_title: {
        visibility: 'hidden'
      },
      image_frame: {
        visibility: 'hidden'
      },
      image: {
        visibility: 'hidden'
      },
      scroller: {
        visibility: 'hidden'
      },
      playing: false,
      controls: true,
      progressInterval: 500,
      url: "https://res.cloudinary.com/hi58qepi6/video/upload/v1548956607/aljazeera-desktop.mp4"
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
    console.log('button fullscreen pressed');
    if (this.state.playing === false) {
      this.setState({
        playing: true
      });
    } else {
      this.setState({
        playing: false
      });
    }
    let i = this.container;
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
  onReady() {
    /* load new story into this.state */
    this.apiGet('/watch/request_new_story')
      .then((res) => this.setState({
        title: res.data.title.toUpperCase(),
        story: res.data.story,
        urls: metadata(res.data, this.state.image_duration, this.state.imagesStart).urls,
        markers: metadata(res.data, this.state.image_duration, this.state.imagesStart).markers
      }))
      .then(() => console.log(this.state))
      .catch(err => console.log(err))
  }
  onProgress(e) {
    /* change url-image according to markers... */
    let currentSec = e.playedSeconds;
    if (currentSec >= this.state.markers[this.state.url_index]) {
      //console.log('marker passed');
      this.setState({
        url_index: this.state.url_index + 1
      });
      //console.log(this.state.urls[this.state.url_index]);
    }
    /* change interface according to markers */
    if (currentSec >= this.state.popupStart && currentSec <= this.state.popupEnd) {
      //console.log('popup & title should be visible');
      this.setState({
        popup_title: {
          visibility: 'visible'
        }
      });
    } else if (currentSec >= this.state.imagesStart && currentSec <= this.state.imagesEnd) {
      //console.log('images & scroller should be visible');
      this.setState({
        popup_title: {
          visibility: 'hidden'
        },
        image_frame: {
          visibility: 'visible'
        },
        image: {
          visibility: 'visible'
        },
        scroller: {
          visibility: 'visible'
        }
      });
    } else {
      this.setState({
        popup_title: {
          visibility: 'hidden'
        },
        image_frame: {
          visibility: 'hidden'
        },
        image: {
          visibility: 'hidden'
        },
        scroller: {
          visibility: 'hidden'
        }
      });
    }
  }
  onEnded() {
    this.player.seekTo(0);
  }
  componentWillMount() {
    console.log('componentWillMount');
    /* calculate durations */
    this.setState({
      popup_duration: diff(this.state.popupStart, this.state.popupEnd),
      image_duration: diff(this.state.imagesStart, this.state.imagesEnd)
    });
  }
  componentDidMount() {
    console.log('componentDidMount');
    //this.player.seekTo(0);
  }
  render() {
    return (<div>
      <div id="button_div">
        <p>
          <button id="btnFullscreen" onClick={this.handleFullscreen.bind(this)} type="button">TOGGLE PLAY/FULLSCREEN</button>
        </p>
      </div>
        <div id="outerContainer" ref={outerContainer => { this.outerContainer=outerContainer }} className="media">
          <div id="videoContainer" ref={container => { this.container=container }} className="media-player">
            <ReactPlayer
            id="videoPlayer"
            className='react-player'
            width='100%'
            height='100%'
            ref={player => { this.player=player }}
            controls={this.state.controls}
            progressInterval = {this.state.progressInterval}
            playing={this.state.playing}
            onReady={this.onReady.bind(this)}
            onProgress={this.onProgress.bind(this)}
            onEnded={this.onEnded.bind(this)}
            url={this.state.url}
            />
            <div id="popup_title" style={this.state.popup_title}>
              <h1 id="popup_title_text">{this.state.title}</h1>
            </div>
            <div id="image_frame" style={this.state.image_frame}>
              <img id="image" alt="" src={this.state.urls[this.state.url_index]} style={this.state.image}/>
            </div>
            <div id="scroller" className="scroll-left" style={this.state.scroller}>
              <h1 id="scroller_text">{this.state.story}</h1>
            </div>
          </div>
        </div>

    </div>)
  }
}
