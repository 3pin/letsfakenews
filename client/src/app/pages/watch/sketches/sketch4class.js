import StoryLine from "./classes/class";

export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let testAlignment = "TRUE";
  let inc = -5;
  let radius = 50;
  let textSizeFactor = 10;
  let story = "Initial Story";
  let liveList = [];
  let numLines = 2;
  let lines = [];
  //
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS received...");
    if (props.liveList.length > 0) {
      liveList = [];
      for (let entry in props.liveList) {
        liveList.push(props.liveList[entry].story);
      }
    }
  };
  p.setup = () => {
    console.log("SETUP started...");
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < numLines; i++) {
      lines.push(new StoryLine(p, canvasWidth, canvasHeight, textSizeFactor, inc, radius, story));
    }
  }
  p.draw = () => {
    p.noSmooth();
    p.background(0);
    if (testAlignment === "TRUE") {
      p.fill(160);
      p.ellipse(0, 0, radius, radius);
      p.ellipse(canvasWidth, 0, radius, radius);
      p.ellipse(0, canvasHeight, radius, radius);
      p.ellipse(canvasWidth, canvasHeight, radius, radius);
    }
    p.fill(255);
    for (const line of lines) {
      line.show();
      line.move(liveList);
    }
  };
  window.onresize = () => {
    if (!window.screenTop && !window.screenY) {
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
    } else {
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
    }
    p.resizeCanvas(canvasWidth, canvasHeight);
    for (const line of lines) {
      line.resize(canvasWidth, canvasHeight);
    }
  };
}
