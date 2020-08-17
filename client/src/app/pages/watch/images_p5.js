import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import {
  connect,
} from 'react-redux';
import axios from 'axios';

import FrameButton from '../../components/frameButton';
import Sketch from './sketches/images';
/* import Sketch from "./sketches/sketch4class"; */
import 'eventsource-polyfill';

/* which props do we want to inject, given the global store state? */
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

let timerId = 1;

class visualiseImages extends React.Component {
  constructor(props) {
    super(props);
    this.parentFrame = React.createRef();
    this._isMounted = false;
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource('http://localhost:5000/settings/sse');
    }
    this.goFullscreen = this.goFullscreen.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.pickImages = this.pickImages.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.state = {
      apiHello: '/watch/visualise',
      liveList: [],
      imageSet: [],
      imageSetIndex: 0,
      imageIndex: 0,
      imagecontainerStyle: {
        /*
        border: '2px solid green',
        background: 'green',
        */
        width: '100%',
        height: '100%',
        margin: 'auto',
      },
      imageDuration: 2,
      componentWidth: undefined,
      corsAnywhere: '',
    };
  }

  goFullscreen() {
    document.activeElement.blur();
    console.log('fullscreen entered');
    const i = this.container;
    console.log(i);
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

  refreshList() {
    console.log('refreshList');
    /* cancel timer and restart timer */
    this.endTimer(timerId);
    /* load  story from database into state */
    axios.get(this.state.apiHello, {
      params: {
        room: this.props.room,
      },
    }).then((res) => {
      console.log(res);
      console.log(`mode is ${res.data.nodeMode}`);
      console.log(`cors URL is ${res.data.corsAnywhere}`);
      this.setState({
        liveList: res.data.liveList,
        imageDuration: res.data.imageDuration,
        corsAnywhere: res.data.corsAnywhere,
      }, () => {
        console.log(`post-refresh.. starting startTimer @interval: ${this.state.imageDuration * 1000}`);
        timerId = this.startTimer(this.state.imageDuration * 1000).id;
      });
    }).catch((err) => console.log(err));
  }

  pickImages() {
    console.log('pickImages.. change Image Set');
    /* randomly pick imageSet from this.state.liveList */
    /*
    let randomSet = Math.floor(Math.random() * this.state.liveList.length);
    return new Promise(() => {
      this.setState({
        imageSet: this.state.liveList[randomSet].urlsTitle,
        imageIndex: 0
      })
    })
    */
    /* sequentially pick imageSet from this.state.liveList */
    const imageSet = this.state.liveList[this.state.imageSetIndex].urlsTitle;
    return new Promise(() => {
      this.setState({
        imageSet,
        imageIndex: 0,
      });
    });
  }

  changeImage() {
    /* every Xsecs step through the this.state.imageSet until end... then pickImages() */
    console.log('changeImage... display next Image in set');
    const incImageIndex = this.state.imageIndex + 1;
    const incImageSetIndex = this.state.imageSetIndex + 1;
    if (this.state.imageIndex < this.state.imageSet.length - 1) {
      this.setState({
        imageIndex: incImageIndex,
      });
    } else if (this.state.imageSetIndex === this.state.liveList.length - 1) {
      /* if imageSetIndex reached the end of imageSet then reset */
      this.setState({
        imageSetIndex: 0,
      }, () => {
        this.pickImages();
      });
    } else {
      /* increment imageSetIndex */
      this.setState({
        imageSetIndex: incImageSetIndex,
      }, () => {
        this.pickImages();
      });
    }
  }

  startTimer(delay) {
    const id = setInterval(() => this.changeImage(), delay);
    console.log(`start timerid: ${id}`);
    return {
      id,
    };
  }

  endTimer(id) {
    console.log(`end timerid: ${id}`);
    clearInterval(this.id);
  }

  componentDidMount() {
    /* pass in the rendered componentWidth to state */
    this.setState({
      componentWidth: this.parentFrame.current.offsetWidth,
    });
    this._isMounted = true;
    /* open sse listener to trigger a refresh:response which will update this.state.liveList */
    this.eventSource.addEventListener('activelistChange', (e) => {
      console.log('A change triggered a refresh of the activelist');
      const data = JSON.parse(e.data);
      if (data.room === this.props.room) {
        this.refreshList();
      }
    });
    /* Catches errors */
    this.eventSource.onerror = (e) => {
      console.log('--- SSE EVENTSOURCE ERROR: ', e);
    };
    /* connect to API ONLY when component is mounted */
    if (this._isMounted) {
      this.refreshList();
    }
  }

  componentWillUnmount() {
    /* cancel the changeImage-timer */
    this.endTimer(timerId);
    //
    this._isMounted = false;
    /* close sse listener */
    this.eventSource.close();
  }

  render() {
    // console.log(this.state)
    return (
      <div ref={this.parentFrame}>
        <FrameButton
          buttonLabel="Play Fullscreen"
          onClick={this.goFullscreen.bind(this.container)}
        />
        <hr />
        <div style={this.state.imagecontainerStyle} ref={(container) => { this.container = container; }}>
          <P5Wrapper
            sketch={Sketch}
            liveList={this.state.liveList}
            src={this.state.imageSet[this.state.imageIndex]}
            componentWidth={this.state.componentWidth}
            corsAnywhere={this.state.corsAnywhere}
          />
        </div>

      </div>
    );
  }
}
// export default connect(mapStateToProps)(withRouter(visualiseImages));
export default connect(mapStateToProps)(visualiseImages);
