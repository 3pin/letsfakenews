import React from "react";
import FrameButton from "../../../app/components/frameButton";
import P5Wrapper from "react-p5-wrapper";
import Sketch from "./sketches/sketch_classed";

export default class Visualise extends React.Component {
  constructor(props) {
    super(props);
    this.apiGet = this.apiGet.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.goFullscreen = this.goFullscreen.bind(this);
    this.onStartAll = this.onStartAll.bind(this);
    this.onEndOne = this.onEndOne.bind(this);
    this.state = {
      apiHello: "/watch/visualise",
      story: "Initial Story",
      radius: 50,
      fontSizeFactor: 4
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
  onStartAll() {
    console.log("All Lines have started... ");
    return new Promise((resolve, reject) => {
      /* load  story from database into state */
      this.apiGet(this.state.apiHello)
        .then(res => {
          resolve(res.data.story)
        })
    }).catch(err => console.log(err));
  }
  onEndOne() {
    console.log("One textline has ended...");
    return new Promise((resolve, reject) => {
      /* load  story from database into state */
      this.apiGet(this.state.apiHello).then(res => {
        resolve(res.data.story);
      });
    }).catch(err => console.log(err));
  }
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
  }
  componentDidMount() {
    /* load  story from database into state */
    /*
    this.apiGet(this.state.apiHello)
      .then(res => {
        this.setState({
          story: res.data.story,
        });
        console.log(res.data.story);
      }).catch(err => console.log(err));
      */
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
              fontSizeFactor={this.state.fontSizeFactor}
              radius={this.state.radius}
              onStartAll={this.onStartAll}
              onEndOne={this.onEndOne}
            />
          </div>
        </div>
      </div>
    );
  }
}
