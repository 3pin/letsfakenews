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
        display: 'hide'
      },
      image_frame: {
        display: 'hide'
      },
      image: {
        display: 'hide'
      },
      panel_title: {
        display: 'hide'
      },
      scroller: {
        display: 'hide'
      }
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
    console.log(e.currentTime);
    let currentTime = e.currentTime;
    /* change url-image according to markers... */
    if (currentTime >= this.state.markers[this.state.url_index]) {
      this.setState({
        url_index: this.state.url_index + 1
      });
    }
    /* change interface according to markers */
    if (this.state.currentTime >= this.state.popupStart && this.state.currentTime <= this.state.popupEnd) {
      this.setState({
        popup_title: {
          display: 'show'
        }
      });
    } else if (this.state.currentTime >= this.state.imagesStart && this.state.currentTime <= this.state.imagesEnd) {
      this.setState({
        popup_title: {
          display: 'hide'
        },
        image_frame: {
          display: 'show'
        },
        image: {
          display: 'show'
        },
        scroller: {
          display: 'show'
        }
      });
    } else {
      this.setState({
        popup_title: {
          display: 'hide'
        },
        image_frame: {
          display: 'hide'
        },
        image: {
          display: 'hide'
        },
        panel_title: {
          display: 'hide'
        },
        scroller: {
          display: 'hide'
        }
      });
    }
  }
  componentWillMount() {
    console.log('componentWilMount');
    /* calculate durations */
    this.setState({
      popup_duration: diff(this.state.popupStart, this.state.popupEnd),
      image_duration: diff(this.state.imagesStart, this.state.imagesEnd)
    });
  }
  componentDidMount() {
    console.log('componentDidMount')
    /* load initial story into this.state */
    this.apiGet('/watch/request_new_story')
      .then((res) => this.setState({
        title: res.data.title,
        story: res.data.story,
        urls: metadata(res.data, this.state.image_duration, this.state.imagesStart).urls,
        markers: metadata(res.data, this.state.image_duration, this.state.imagesStart).markers
      }))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state);
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
            <Player loop={true} onProgress={this.onProgress.bind(this)} onPlay={this.onPlay.bind(this)} onPause={this.onPause.bind(this)} onTimeUpdate={this.onTimeUpdate.bind(this)} src="https://res.cloudinary.com/hi58qepi6/video/upload/v1548956607/aljazeera-desktop.mp4"/>
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

        </div>
      </Media>
    </div>)
  }
}
