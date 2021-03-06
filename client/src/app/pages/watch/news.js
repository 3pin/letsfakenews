import React from 'react';
import ReactPlayer from 'react-player';
import FrameButton from '../../components/frameButton';

// func to calc timing-durations
const diff = (start, end) => parseFloat((end - start).toFixed(1));
// function process-multimedia-metadata
const metadata = (data, imageDuration, imagesStart) => {
  // load imge_URLS
  const imageLocations = data.urls;
  const urls = [];
  for (const url in imageLocations) {
    urls.push(imageLocations[url]);
  }
  // calculate multimedia metadata
  const picDuration = Math.round(imageDuration / urls.length);
  const markers = [];
  for (let i = 1; i <= urls.length; i++) {
    markers.push(Math.round(imagesStart + picDuration * i));
  }
  return {
    urls,
    markers,
  };
};

export default class VisualiseNews extends React.Component {
  constructor(props) {
    super(props);
    //
    this.apiGet = this.apiGet.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.goFullscreen = this.goFullscreen.bind(this);
    this.exitFullscreen = this.exitFullscreen.bind(this);
    //
    this.state = {
      mode: '',
      // timings
      popupStart: 6.2,
      popupEnd: 11.3,
      imagesStart: 17.6,
      imagesEnd: 41.1,
      // story data
      title: '',
      story: '',
      urls: [],
      markers: [],
      // array index for currently-displayed image from url-array
      url_index: 0,
      // interface elements visibility
      popup_title: {
        display: 'none',
      },
      image_frame: {
        display: 'none',
      },
      image: {
        display: 'none',
      },
      scroller: {
        display: 'none',
      },
      playing: false,
      controls: false,
      volume: 1,
      progressInterval: 500,
      url: 'https://res.cloudinary.com/hi58qepi6/video/upload/v1548956607/aljazeera-desktop.mp4',
    };
  }

  apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) { throw Error(body.message); }
    return body;
  }

  onReady() {
    /* load new story into this.state */
    this.apiGet('/watch/requestNewStory')
      .then((res) => this.setState({
        url_index: 0,
        title: res.data.title.toUpperCase(),
        story: res.data.story,
        urls: metadata(res.data, this.state.imageDuration, this.state.imagesStart).urls,
        markers: metadata(res.data, this.state.imageDuration, this.state.imagesStart).markers,
      }))
      .then(() => {
        console.log(this.state);
        console.log('Media now ready');
      }).catch((err) => console.log(err));
  }

  onProgress(e) {
    /* change url-image according to markers... */
    const currentSec = e.playedSeconds;
    if (currentSec >= this.state.markers[this.state.url_index] && this.state.url_index < this.state.markers.length - 1) {
      console.log(`marker passed secs:${this.state.markers[this.state.url_index]} current url index:${this.state.url_index}`);
      this.setState({
        url_index: this.state.url_index + 1,
      });
      console.log(`new url index: ${this.state.url_index}`);
      console.log(`new url: ${this.state.urls[this.state.url_index]}`);
    }
    /* change interface according to markers */
    if (currentSec >= this.state.popupStart && currentSec <= this.state.popupEnd) {
      // console.log('popup & title should be visible');
      this.setState({
        popup_title: {
          display: 'block',
        },
      });
    } else if (currentSec >= this.state.imagesStart && currentSec <= this.state.imagesEnd) {
      // console.log('images & scroller should be visible');
      this.setState({
        popup_title: {
          display: 'none',
        },
        image_frame: {
          display: 'block',
        },
        image: {
          display: 'block',
        },
        scroller: {
          display: 'block',
        },
      });
    } else {
      this.setState({
        popup_title: {
          display: 'none',
        },
        image_frame: {
          display: 'none',
        },
        image: {
          display: 'none',
        },
        scroller: {
          display: 'none',
        },
      });
    }
  }

  onEnded() {
    console.log('Media Ended');
    this.player.seekTo(0);
  }

  goFullscreen() {
    document.activeElement.blur();
    console.log('fullscreen entered');
    const i = this.videoContainer;
    console.log(i);
    // go full-screen with cross-browser support
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (!document.fullscreenElement) {
      console.log('fullscreen exited');
      this.onEnded();
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    document.addEventListener('fullscreenchange', this.exitFullscreen, false);
    /* calculate durations && */
    /* load db settings... */
    this.apiGet('/settings/mode').then((res) => {
      console.log('route /settings/mode has given a response');
      console.log(res.dbSettings);
      if (res.dbSettings.nodeMode === 'production') {
        console.log(`mode is ${res.dbSettings.nodeMode}`);
        this.setState({
          popup_duration: diff(this.state.popupStart, this.state.popupEnd),
          imageDuration: diff(this.state.imagesStart, this.state.imagesEnd),
          mode: res.dbSettings.nodeMode,
          playing: true,
          controls: false,
          volume: 1,
        });
      } else if (res.dbSettings.nodeMode === 'development') {
        console.log(`mode is: ${res.dbSettings.nodeMode}`);
        this.setState({
          popup_duration: diff(this.state.popupStart, this.state.popupEnd),
          imageDuration: diff(this.state.imagesStart, this.state.imagesEnd),
          mode: res.dbSettings.nodeMode,
          playing: true,
          controls: true,
          volume: 0,
        });
      }
    }).catch((err) => console.log(err));
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.exitFullscreen, false);
  }

  render() {
    return (
      <div>
        <FrameButton
          buttonLabel="Fullscreen"
          onClick={this.goFullscreen.bind(this.videoContainer)}
        />
        <hr />
        <div id="videoContainer" ref={(videoContainer) => { this.videoContainer = videoContainer; }}>
          <ReactPlayer
            id="videoPlayer"
            ref={(player) => { this.player = player; }}
            volume={this.state.volume}
            width="100%"
            height="100%"
            controls={this.state.controls}
            progressInterval={this.state.progressInterval}
            playing={this.state.playing}
            onReady={this.onReady.bind(this)}
            onProgress={this.onProgress.bind(this)}
            onEnded={this.onEnded.bind(this)}
            url={this.state.url}
          />
          <div id="popup_title" style={this.state.popup_title}>
            <p id="popup_title_text">{this.state.title}</p>
          </div>
          <div id="image_frame" style={this.state.image_frame}>
            <img id="image" alt="" src={this.state.urls[this.state.url_index]} style={this.state.image} />
          </div>
          <div id="scroll-left" style={this.state.scroller}>
            <p id="scroller_text">{this.state.story}</p>
          </div>
        </div>
      </div>
    );
  }
}
