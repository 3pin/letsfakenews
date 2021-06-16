import React from 'react';
import {
  connect,
} from 'react-redux';
import axios from 'axios';
import ReactPlayer from 'react-player';
import P5Wrapper from 'react-p5-wrapper';
import FrameButton from '../../components/frameButton';
import Sketch from './sketches/news';

/* which props do we want to inject, given the global store state? */
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

/* func to calc timing-durations */
const diff = (start, end) => parseFloat((end - start).toFixed(1));
/* function process-multimedia-metadata */
const metadata = (data, imageDuration, imagesStart) => {
  /* load imge_URLS */
  const imageLocations = data.urls;
  const urls = [];
  for (const url in imageLocations) {
    urls.push(imageLocations[url]);
  }
  /* calculate multimedia metadata */
  const picDuration = Math.round(imageDuration / urls.length);
  const markers = [];
  for (let i = 1; i <= urls.length; i += 1) {
    markers.push(Math.round(imagesStart + picDuration * i));
  }
  return {
    urls,
    markers,
  };
};

class visualiseNews extends React.Component {
  constructor(props) {
    super(props);
    this.parentFrame = React.createRef();
    this.loadNewStory = this.loadNewStory.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.goFullscreen = this.goFullscreen.bind(this);
    this.exitFullscreen = this.exitFullscreen.bind(this);
    this.handleImageInc = this.handleImageInc.bind(this);
    this.sketchController = this.sketchController.bind(this);
    this.state = {
      apiHello: '/watch/requestNewStory',
      mode: '',
      corsAnywhere: '',
      /* timings */
      playedSeconds: 0,
      popupStart: 6.2,
      popupEnd: 11.3,
      imagesStart: 17.6,
      imagesEnd: 41.1,
      /* story data */
      title: '',
      story: '',
      urls: [],
      markers: [],
      /* array index for currently-displayed image from url-array */
      urlIndex: 0,
      /* interface elements visibility */
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
      sketchState: 'STOP',
      stopOnUnmount: true,
      loop: false
    };
  }

  sketchController(val) {
    console.log(`sketchController(${val})`);
    if (val === 'META') {
      this.setState({
        sketchState: 'META',
      });
    } else if (val === 'CACHE') {
      this.setState({
        sketchState: 'CACHE',
      });
    } else if (val === 'TEXT') {
      this.setState({
        sketchState: 'TEXT',
      });
    } else if (val === 'PLAY') {
      this.setState({
        sketchState: 'PLAY',
      }, () => {
        this.setState({
          playing: true,
        })
      });
    } else if (val === 'STOP') {
      this.player.seekTo(0);
      this.setState({
        sketchState: 'STOP',
      }, () => {
        this.setState({
          playing: false,
        })
      });
    }
  }

  loadNewStory() {
    /* load new story into this.state */
    axios.get(this.state.apiHello, {
      params: {
        room: this.props.room,
      },
    }).then((res) => {
      console.log(res);
      const {
        urls,
        markers
      } = metadata(res.data, this.state.imageDuration, this.state.imagesStart);
      this.setState({
        urlIndex: 0,
        title: res.data.title.toUpperCase(),
        story: res.data.story,
        urls,
        markers,
      }, () => {
        this.setState({
          sketchState: 'META'
        }, () => {
          //console.log(this.state);
          console.log('Metadata now setup');
        })
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
    /* pass in the rendered componentWidth to state */
    this.setState({
      componentWidth: this.parentFrame.current.offsetWidth,
    });
    document.addEventListener('fullscreenchange', this.exitFullscreen, false);
    document.addEventListener('webkitfullscreenchange', this.exitFullscreen, false);
    document.addEventListener('mozfullscreenchange', this.exitFullscreen, false);
    document.addEventListener('MSFullscreenChange', this.exitFullscreen, false);
    /* load settings  from db */
    axios.get('/settings/mode', {
      params: {
        room: this.props.room,
      },
    }).then((res) => {
      console.log(res);
      // const popup_duration = diff(this.state.popupStart, this.state.popupEnd);
      const imageDuration = diff(this.state.imagesStart, this.state.imagesEnd);
      if (res.status !== 200) {
        throw Error(res.message);
      } else if (res.data.dbSettings.nodeMode === 'production') {
        // console.log(`mode is ${res.data.dbSettings.nodeMode}`);
        this.setState({
          imageDuration,
          mode: res.data.dbSettings.nodeMode,
          corsAnywhere: res.data.dbSettings.corsAnywhere,
          volume: 1,
        });
      } else {
        // console.log(`mode is: ${res.data.dbSettings.nodeMode}`);
        this.setState({
          imageDuration,
          mode: res.data.dbSettings.nodeMode,
          corsAnywhere: res.data.dbSettings.corsAnywhere,
          volume: 0,
          controls: false,
        });
      }
    }).then(() => {
      console.log(`mode is: ${this.state.mode}`);
    }).catch((err) => console.log(err));
  }

  goFullscreen() {
    console.log(`Entering Fullscreen`);
    /* go full-screen with cross-browser support */
    document.activeElement.blur();
    const i = this.videoContainer;
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }
    this.loadNewStory();
  }

  handleImageInc(val) {
    console.log(`handleimageInc(): handleImageInc(${val})`);
    console.log(val, this.state.urlIndex + 1, this.state.urls.length);
    if (this.state.urlIndex < this.state.urls.length - 1) {
      console.log('Sending next image to be CACHED');
      let {
        urlIndex
      } = this.state;
      urlIndex += 1;
      this.setState({
        urlIndex,
      });
    } else {
      console.log('All images CACHED');
      this.setState({
        sketchState: 'TEXT',
      }, () => {
        this.setState({
          urlIndex: 0,
        });
      });
    }
  }

  onProgress(e) {
    // console.log(e.playedSeconds.toFixed(2));
    this.setState({
      playedSeconds: e.playedSeconds.toFixed(2),
    });
    /* change url-image according to markers... */
    const currentSec = e.playedSeconds;
    if (currentSec >= this.state.markers[this.state.urlIndex] && this.state.urlIndex < this.state.markers.length - 1) {
      let {
        urlIndex
      } = this.state;
      urlIndex += 1;
      this.setState({
        urlIndex,
      });
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
    console.log('Media Restarting');
    this.player.seekTo(0);
    this.loadNewStory();
  }

  exitFullscreen() {
    //console.log(`Fullscreen Event`);
    this.player.seekTo(0);
    this.setState({
      sketchState: 'STOP'
    }, () => {
      this.setState({
        playing: false
      })
    })
    if (!document.fullscreenElement) {
      console.log('Fullscreen exiting');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('fullscreenchange', this.exitFullscreen, false);
    document.removeEventListener('webkitfullscreenchange', this.exitFullscreen, false);
    document.removeEventListener('mozfullscreenchange', this.exitFullscreen, false);
    document.removeEventListener('MSFullscreenChange', this.exitFullscreen, false);
    console.log('unmounting');
  }

  render() {
    return (
      <div ref={this.parentFrame}>
        <FrameButton
          buttonLabel="Fullscreen"
          desc="Use this button to enter fullscreen & the ESC key to later exit"
          onClick={this.goFullscreen.bind(this.videoContainer)}
        />
        <hr />
        <div id="videoContainer" ref={(videoContainer) => { this.videoContainer = videoContainer; }}>
          <ReactPlayer
            id="videoPlayer"
            volume={this.state.volume}
            width="100%"
            height="100%"
            ref={(player) => { this.player = player; }}
            controls={this.state.controls}
            progressInterval={this.state.progressInterval}
            playing={this.state.playing}
            onProgress={this.onProgress.bind(this)}
            onEnded={this.onEnded.bind(this)}
            url={this.state.url}
          />
          <div id="p5_container">
            <P5Wrapper
              mode={this.state.mode}
              sketch={Sketch}
              corsAnywhere={this.state.corsAnywhere}
              vidUrl={this.state.url}
              componentWidth={this.state.componentWidth}
              popup_title={this.state.popup_title}
              popup_title_text={this.state.title}
              image_frame={this.state.image_frame}
              image={this.state.urls[this.state.urlIndex]}
              imageIndex={this.state.urlIndex}
              numImages={this.state.urls.length}
              imageInc={this.handleImageInc}
              scroll-left={this.state.scroller}
              scroller_text={this.state.story}
              playedSeconds={this.state.playedSeconds}
              title={this.state.title}
              story={this.state.story}
              sketchState={this.state.sketchState}
              sketchController={this.sketchController}
              timings={{
                popupStart: this.state.popupStart,
                popupEnd: this.state.popupEnd,
                popupduration: this.state.popupEnd - this.state.popupStart,
                imagesStart: this.state.imagesStart,
                imagesEnd: this.state.imagesEnd,
                imagesDuration: this.state.imagesEnd - this.state.imagesStart,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
// export default connect(mapStateToProps)(withRouter(visualiseNews));
export default connect(mapStateToProps)(visualiseNews);
