import React from "react";
import FrameButton from "../../../app/components/frameButton";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/sketch";

export default class Visualise extends React.Component {
  constructor(props) {
    super(props);
    this.apiGet = this.apiGet.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.goFullscreen = this.goFullscreen.bind(this);
    this.exitFullscreen = this.exitFullscreen.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.state = {
      activelist: [],
      visualsAmount: 0,
      visualsList: []
    };
  }
  apiGet = async endpoint => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  apiPost = async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  goFullscreen() {
    document.activeElement.blur();
    console.log("fullscreen entered");
    this.setState({
      playing: true
    });
    let i = this.innerContainer;
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
      console.log("fullscreen exited");
      this.setState({
        playing: false
      });
      this.onEnded();
    }
  }
  onEnded() {
    console.log("Word-Track Ended");
  }
  componentDidMount() {
    /* load database into this.state */
    this.apiGet(this.props.apiHello)
      .then(res => {
        this.setState({
          activelist: res.activelist,
          visualsAmount: res.visualsAmount,
          visualsList: res.livelist
        });
        console.log(res);
      })
      .catch(err => console.log(err));
    //
  }
  render() {
    return (
      <div>
        <FrameButton
          buttonLabel="Play"
          onClick={this.goFullscreen.bind(this.outerContainer)}
        />
        <hr />
        <div id="outerContainer" ref={outerContainer => {this.outerContainer = outerContainer;}}>
          <div id="innerContainer" font="Arial" fontSize="32" ref={innerContainer => {this.innerContainer = innerContainer;}}>
            <P5Wrapper sketch={sketch} color='100'/>
          </div>
        </div>
      </div>
    );
  }
}
