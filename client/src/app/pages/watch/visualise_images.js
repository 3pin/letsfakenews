import React from "react";
import FrameButton from "../../../app/components/frameButton";
//import Sketch from "./sketches/sketch4class";
import 'eventsource-polyfill';
var timerId;

export default class Visualise extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource(`http://localhost:5000/settings/sse`);
    }
    this.apiGet = this.apiGet.bind(this);
    this.goFullscreen = this.goFullscreen.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.pickImages = this.pickImages.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.state = {
      apiHello: "/watch/visualise",
      liveList: [],
      imageSet: ["../../images/bgd.jpg"],
      imageSetIndex: 0,
      imageIndex: 0,
      imagecontainerStyle: {
        /*border: '2px solid green',
        background: 'green',*/
        width: '100%',
        height: '100%',
        margin: 'auto'
      },
      imgStyle: {
        /*border: '2px solid blue',
        background: 'pink',*/
        position: 'relative',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }
    };
  }
  apiGet = async endpoint => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  goFullscreen() {
    document.activeElement.blur();
    console.log("fullscreen entered");
    let i = this.container;
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
  };
  refreshList() {
    console.log('refreshList')
    /* load  story from database into state */
    this.apiGet(this.state.apiHello)
      .then(res => {
        console.log(res.liveList);
        this.setState({
          liveList: res.liveList
        });
      }).catch(err => console.log(err));
  };
  pickImages() {
    console.log('pickImages')
    /* randomly pick imageSet from this.state.liveList */
    /*
    let randomSet = Math.floor(Math.random() * this.state.liveList.length);
    return new Promise(() => {
      this.setState({
        imageSet: this.state.liveList[randomSet].urls_title,
        imageIndex: 0
      })
    })
    */
    /* sequentially pick imageSet from this.state.liveList */
    return new Promise(() => {
      this.setState({
        imageSet: this.state.liveList[this.state.imageSetIndex].urls_title,
        imageIndex: 0
      })
    })
  };
  changeImage() {
    /* every Xsecs step through the this.state.imageSet until end... then pickImages() */
    console.log('changing imageSet url');
    if (this.state.imageIndex < this.state.imageSet.length - 1) {
      this.setState({
        imageIndex: this.state.imageIndex + 1
      })
    } else {
      /* if imageSetIndex reached the end of imageSet then reset */
      if (this.state.imageSetIndex === this.state.liveList.length - 1) {
        this.setState({
          imageSetIndex: 0
        }, () => {this.pickImages()})
      } else {
        /* increment imageSetIndex */
        this.setState({
          imageSetIndex: this.state.imageSetIndex + 1
        }, () => {this.pickImages()})
      }
    }
  };
  startTimer(delay) {
    let id = setInterval(() => this.changeImage(), delay);
    console.log(`timerid: ${id}`);
    return {
      id: id
    };
  }
  endTimer(id) {
    console.log(`timerid: ${id}`);
    clearInterval(id);
  }
  componentDidMount() {
    this._isMounted = true;
    /* open sse listener */
    this.eventSource.addEventListener('activelistChange', (e) => {
      console.log('Backend changes triggered a refresh of the activelist');
      this.refreshList();
    });
    /* Catches errors */
    this.eventSource.onerror = (e) => {
      console.log("--- SSE EVENTSOURCE ERROR: ", e);
    };
    /* connect to API ONLY when component is mounted */
    if (this._isMounted) {
      this.apiGet(this.state.apiHello)
        .then(res => {
          console.log(res.liveList);
          /* load liveList from database into state */
          this.setState({
            liveList: res.liveList
          });
        })
        .then(() => {
          /* randomly pick imageSet from liveList */
          console.log('first pickImages')
          this.pickImages();
        })
        .then(() => {
          /* start the changeImage-timer */
          console.log('first startTimer')
          timerId = this.startTimer(4000).id;
        }).catch(err => console.log(err));
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
    //console.log(this.state)
    return (
      <div >
        <FrameButton
          buttonLabel='Fullscreen'
          onClick={this.goFullscreen.bind(this.outerContainer)}
        />
        <hr/>
        <div style={this.state.imagecontainerStyle} ref={container => {this.container=container}}>
          <img style={this.state.imgStyle} src={this.state.imageSet[this.state.imageIndex]} alt=""/>
        </div>
      </div>
    );
  }
}