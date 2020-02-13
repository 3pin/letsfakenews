import StoryLine from "./classes/class";

export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let inc = -5;
  let textSizeFactor = 13;
  let story = "Initial Story";
  let liveList = [];
  let numLines = 5;
  let lines = [];
  let numScrollersDisplay = 1;
  /* function connecting to props */
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS received...");
    if (props.liveList.length > 0) {
      liveList = [];
      for (let entry in props.liveList) {
        liveList.push(props.liveList[entry].story);
      }
    }
    if (props.textScrollers) {
      numScrollersDisplay = props.textScrollers
    }
    if (props.width) {
      initialWidth = props.width;
      initialHeight = Math.floor((props.width/16)*9);
      p.resizeCanvas(initialWidth, initialHeight);
      for (const line of lines) {
        line.resize(initialWidth, initialHeight);
      }
    }
  };
  /* function run once at startup... where objects are initialised from class */
  p.setup = () => {
    console.log("SETUP started...");
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < numLines; i++) {
      lines.push(new StoryLine(p, canvasWidth, canvasHeight, textSizeFactor, inc, story));
    }
  }
  /* function running throughout... where objects are updated */
  p.draw = () => {
    p.noSmooth();
    p.background(0);
    p.fill(255);
    for (let entry = 0; entry < numScrollersDisplay; entry++) {
      lines[entry].show();
      lines[entry].move(liveList);
    }
  };
  /* function to deal with fullscreen */
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
