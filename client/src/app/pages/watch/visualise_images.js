import React from "react";
import FrameButton from "../../../app/components/frameButton";
//import Sketch from "./sketches/sketch4class";
import 'eventsource-polyfill';

export default class Visualise extends React.Component {
  constructor(props) {
    super(props);
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
    this.state = {
      apiHello: "/watch/visualise",
      liveList: [],
      imageSet: ["../../images/bgd.jpg"],
      imageIndex: 0
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
    let i = this.innerContainer;
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
    let randomSet = Math.floor(Math.random() * this.state.liveList.length);
    this.setState({
      imageSet: this.state.liveList[randomSet].urls_title
    });
  };
  changeImage() {
    /* every Xsecs step through the this.state.imageSet until end... then pickImages() */
    console.log('changing imageSet url');
    if (this.state.imageIndex < this.state.imageSet.length-1) {
      this.setState({
        imageIndex: this.state.imageIndex + 1
      })
    } else {
      this.pickImages();
      this.setState({
        imageIndex: 0
      })
    }
  };
  componentDidMount() {
    /* load  story from database into state */
    //setInterval(this.changeImage(), 2000);
    this.apiGet(this.state.apiHello)
      .then(res => {
        console.log(res.liveList);
        this.setState({
          liveList: res.liveList
        });
      }).then(() => {
        this.pickImages();
      }).then(() => {
        setInterval(this.changeImage(), 2000)
      }).catch(err => console.log(err));
    /* open sse listener */
    this.eventSource.addEventListener('activelistChange', (e) => {
      console.log('Backend changes triggered a refresh of the activelist');
      this.refreshList();
    });
    // Catches errors
    this.eventSource.onerror = (e) => {
      console.log("--- SSE EVENTSOURCE ERROR: ", e);
    };
  }
  render() {
    console.log(this.state)
    return (
      <div >
        <FrameButton
          buttonLabel='Fullscreen'
          onClick={this.goFullscreen.bind(this.outerContainer)}
        />
        <hr/>
        <div id="imagePlayer" style={this.state.image_frame} ref={container => {this.innerContainer=container}}>
          <img id="images" alt="" src={this.state.imageSet[this.state.imageIndex]} style={this.state.image}/>
        </div>
      </div>
    );
  }
}
