import React from 'react';
import ReactPlayer from 'react-player';
import FrameButton from '../../components/frameButton';

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

export default class Visualise_News extends React.Component {
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
        display: 'none'
      },
      image_frame: {
        display: 'none'
      },
      image: {
        display: 'none'
      },
      scroller: {
        display: 'none'
      },
      playing: false,
      controls: false,
      volume: 1,
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
  onReady() {
    console.log("Media ready");
    /* load new story into this.state */
    this.apiGet('/watch/request_new_story')
      .then((res) => this.setState({
        url_index: 0,
        title: res.data.title.toUpperCase(),
        story: res.data.story,
        urls: metadata(res.data, this.state.image_duration, this.state.imagesStart).urls,
        markers: metadata(res.data, this.state.image_duration, this.state.imagesStart).markers
      }))
      .then(() => {
        console.log(this.state)
      }).catch(err => console.log(err))
  }
  onProgress(e) {
    /* change url-image according to markers... */
    let currentSec = e.playedSeconds;
    if (currentSec >= this.state.markers[this.state.url_index] && this.state.url_index < this.state.markers.length - 1) {
      console.log('marker passed secs:' + this.state.markers[this.state.url_index] + ' current url index:' + this.state.url_index);
      this.setState({
        url_index: this.state.url_index + 1
      });
      console.log('new url index: ' + this.state.url_index);
      console.log('new url: ' + this.state.urls[this.state.url_index]);
    }
    /* change interface according to markers */
    if (currentSec >= this.state.popupStart && currentSec <= this.state.popupEnd) {
      //console.log('popup & title should be visible');
      this.setState({
        popup_title: {
          display: 'block'
        }
      });
    } else if (currentSec >= this.state.imagesStart && currentSec <= this.state.imagesEnd) {
      //console.log('images & scroller should be visible');
      this.setState({
        popup_title: {
          display: 'none'
        },
        image_frame: {
          display: 'block'
        },
        image: {
          display: 'block'
        },
        scroller: {
          display: 'block'
        }
      });
    } else {
      this.setState({
        popup_title: {
          display: 'none'
        },
        image_frame: {
          display: 'none'
        },
        image: {
          display: 'none'
        },
        scroller: {
          display: 'none'
        }
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
    let i = this.container;
    console.log(i)
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
  exitFullscreen() {
    if (!document.fullscreenElement) {
      console.log('fullscreen exited');
      this.setState({
        playing: false
      });
      this.onEnded()
    }
  }
  componentDidMount() {
    console.log('componentDidMount');
    document.addEventListener("fullscreenchange", this.exitFullscreen, false);
    // load db settings... load 'mode' into localStorage
    this.apiGet('/settings/mode').then(res => {
      //console.log(res);
      //sessionStorage.setItem('node_mode', res.dbSettings.node_mode);
      this.setState({
        mode: res.dbSettings.node_mode
      });
    }).then(() => {
      if (this.state.mode === 'production') {
        this.setState({
          playing: false,
          controls: false,
          volume: 1
        });
      } else {
        this.setState({
          playing: true,
          controls: true,
          volume: 0
        });
      }
    }).catch(err => console.log(err));
    /* calculate durations */
    this.setState({
      popup_duration: diff(this.state.popupStart, this.state.popupEnd),
      image_duration: diff(this.state.imagesStart, this.state.imagesEnd)
    });
  }
  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.exitFullscreen, false);
  }
  render() {
    return (
      <div >
        <FrameButton
          buttonLabel='Play'
          onClick={this.goFullscreen.bind(this.outerContainer)}
        />
        <hr/>
        <div ref={outerContainer => {this.outerContainer=outerContainer}} >
          <div id="videoContainer" ref={container => {this.container=container}} >
            <ReactPlayer
              id="videoPlayer"
              volume={this.state.volume}
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
              <p id="popup_title_text">{this.state.title}</p>
            </div>
            <div id="image_frame" style={this.state.image_frame}>
              <img id="image" alt="" src={this.state.urls[this.state.url_index]} style={this.state.image}/>
            </div>
            <div id="scroll-left" style={this.state.scroller}>
              <p id="scroller_text">{this.state.story}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
