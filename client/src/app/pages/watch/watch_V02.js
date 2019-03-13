import React from 'react'
import {
  Media,
  Player,
  controls
} from 'react-media-player'
const {
  PlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen
} = controls

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
    this.apiGet = this.apiGet.bind(this);
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
      panel_title: {
        visibility: 'hidden'
      },
      scroller: {
        visibility: 'hidden'
      },
      playback:'Pause'
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
  onProgress() {
    console.log('video loading...');
  }
  onPlay() {
    console.log('video started')
  }
  onPause() {
    console.log('video paused')
  }
  onTimeUpdate(e) {
    //console.log(e.currentTime);
    /* change url-image according to markers... */
    if (e.currentTime >= this.state.markers[this.state.url_index]) {
      console.log('marker passed')
      this.setState({
        url_index: this.state.url_index + 1
      });
    }
    /* change interface according to markers */
    if (e.currentTime >= this.state.popupStart && e.currentTime <= this.state.popupEnd) {
      console.log('popup & title should be visible');
      this.setState({
        popup_title: {
          visibility: 'visible'
        }
      });
    } else if (e.currentTime >= this.state.imagesStart && e.currentTime <= this.state.imagesEnd) {
      console.log('images & scroller should be visible');
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
        panel_title: {
          visibility: 'hidden'
        },
        scroller: {
          visibility: 'hidden'
        }
      });
    }
  }
  onEnded() {
    console.log('videoEnded');
    /* load new story into this.state */
    this.apiGet('/watch/request_new_story')
      .then((res) => this.setState({
        title: res.data.title,
        story: res.data.story,
        urls: metadata(res.data, this.state.image_duration, this.state.imagesStart).urls,
        markers: metadata(res.data, this.state.image_duration, this.state.imagesStart).markers
      }))
      .then(() => console.log(this.state))
      .catch(err => console.log(err));
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
    this.video.seekTo('0');
    /* add video-onEnded listener */
    //this.videoElement.addEventListener("ended", this.onEnded.bind(this));
    /* load initial story into this.state */
    this.apiGet('/watch/request_new_story')
      .then((res) => this.setState({
        title: res.data.title,
        story: res.data.story,
        urls: metadata(res.data, this.state.image_duration, this.state.imagesStart).urls,
        markers: metadata(res.data, this.state.image_duration, this.state.imagesStart).markers,
        playback:'Play'
      })).then(() => console.log(this.state))
      .catch(err => console.log(err));
  }
  componentWillUnmount() {
    //this.videoElement.removeEventListener("ended", onEnded);
  }
  render() {
    return (<div>
      <div id="button_div">
        <p>
          <button id="btnFullscreen" onClick={this.handleFullscreen.bind(this)} type="button">PLAY FULLSCREEN</button>
        </p>
      </div>
      <Media>
        <div className="media">
        <div className="media-controls">
          <PlayPause />
          <CurrentTime />
          <Progress />
          <SeekBar />
          <Duration />
          <MuteUnmute />
          <Volume />
          <Fullscreen />
        </div>
          <div className="media-player">
            <Player ref={(el) => { this.video = el }} loop={true} autoPlay={false} onProgress={this.onProgress.bind(this)} onPlay={this.onPlay.bind(this)} onPause={this.onPause.bind(this)} onTimeUpdate={this.onTimeUpdate.bind(this)} src="https://res.cloudinary.com/hi58qepi6/video/upload/v1548956607/aljazeera-desktop.mp4"/>
          </div>
          <div id="popup_title" style={this.state.popup_title}>
            <p id="popup_title_text">{this.state.title}</p>
          </div>
          <div id="image_frame" style={this.state.image_frame}>
            <img id="image" alt="" src={this.state.urls[this.state.urls_index]} style={this.state.image}/>
          </div>
          <div id="scroller" className="scroll-left" style={this.state.scroller}>
            <p id="scroller_text">{this.state.story}</p>
          </div>
        </div>
      </Media>
    </div>)
  }
}
