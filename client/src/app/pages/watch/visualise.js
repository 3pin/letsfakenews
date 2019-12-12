import React from "react";
import FrameButton from "../../../app/components/frameButton";
import Sketch from "react-p5";

export default class Visualise extends React.Component {
  constructor(props) {
    super(props);
    this.apiGet = this.apiGet.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.goFullscreen = this.goFullscreen.bind(this);
    /*
    this.exitFullscreen = this.exitFullscreen.bind(this);
    this.onEnded = this.onEnded.bind(this);
    */
    this.state = {
      activelist: [],
      visualsAmount: 0,
      visualsList: [],
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
      radius: 50
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
      windowWidth: window.screen.width,
      windowHeight: window.screen.height,
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
  /*
  exitFullscreen() {
    if (!document.fullscreenElement) {
      console.log("fullscreen exited");
      this.setState({
        playing: false,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
      this.onEnded();
    }
  }
  onEnded() {
    console.log("Word-Track Ended");
  }
  */
  componentDidMount() {
    /* load database into this.state */
    this.apiGet(this.props.apiHello)
      .then(res => {
        this.setState({
          activelist: res.activelist,
          visualsAmount: res.visualsAmount,
          visualsList: res.livelist,
        });
        //console.log(res);
      }).catch(err => console.log(err));
  }
  render() {
    //console.log(this.state)
    return (
      <div>
        <FrameButton
          buttonLabel="Play"
          onClick={this.goFullscreen.bind(this.outerContainer)}
        />
        <hr />
        <div id="outerContainer" ref={outerContainer => {this.outerContainer = outerContainer;}}>
          <div id="innerContainer" ref={innerContainer => {this.innerContainer = innerContainer;}}>
            <Sketch
              setup={(p5, parent) => {
                p5.canvas = p5.createCanvas(this.state.windowWidth, this.state.windowHeight).parent(parent);
              }}
              draw={p5 => {
                p5.canvas.resize(this.state.windowWidth,this.state.windowWidth);
                p5.background(0);
  							p5.fill(150);
  							p5.ellipse(0,0, this.state.radius, this.state.radius);
                p5.ellipse(this.state.windowWidth/2, this.state.windowHeight/2, this.state.radius,this.state.radius);
                p5.ellipse(this.state.windowWidth, this.state.windowHeight, this.state.radius, this.state.radius);
  							p5.fill(255);
  							p5.textFont('Helvetica')
  							p5.textSize(32);
  							p5.text('Hello', this.state.windowWidth/2, this.state.windowHeight/2);
  						}}
            />
          </div>
        </div>
      </div>
    );
  }
}
