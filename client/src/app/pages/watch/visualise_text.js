import React from "react";
import FrameButton from "../../../app/components/frameButton";
import P5Wrapper from "react-p5-wrapper";
//import Sketch from "./sketches/sketch";
import Sketch from "./sketches/sketch4class";
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
    this.state = {
      apiHello: "/watch/visualise",
      liveList: [],
      textScrollers: 1,
      width: 400
    };
  }
  apiGet = async endpoint => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  refreshList() {
    /* load  story from database into state */
    this.apiGet(this.state.apiHello)
      .then(res => {
        console.log(res);
        this.setState({
          liveList: res.liveList,
          textScrollers: res.textScrollers
        });
      }).catch(err => console.log(err));
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
  componentDidMount() {
    var width = this.refs.parent.offsetWidth;
    this.setState({
      width: width
    });
    /* load  story from database into state */
    this.apiGet(this.state.apiHello)
      .then(res => {
        console.log(res.liveList);
        this.setState({
          liveList: res.liveList,
          textScrollers: res.textScrollers
        });
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
    return (
      <div ref="parent">
        <FrameButton
          buttonLabel="Play"
          onClick={this.goFullscreen.bind(this.outerContainer)}
        />
        <hr />
        <div
          id="outerContainer"
          ref={outerContainer => {
            this.outerContainer = outerContainer;
          }}
        >
          <div
            id="innerContainer"
            ref={innerContainer => {
              this.innerContainer = innerContainer;
            }}
          >
            <P5Wrapper
              sketch={Sketch}
              liveList={this.state.liveList}
              textScrollers={this.state.textScrollers}
              width={this.state.width}
            />
          </div>
        </div>
      </div>
    );
  }
}
