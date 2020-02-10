import StoryLine from "./classes/class";

export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let inc = -5;
  let textSizeFactor = 8;
  let story = "Initial Story";
  let liveList = [];
  let numLines = 4;
  let lines = [];
  /* function connecting to props */
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS received...");
    if (props.liveList.length > 0) {
      liveList = [];
      for (let entry in props.liveList) {
        liveList.push(props.liveList[entry].story);
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
    for (const line of lines) {
      line.show();
      line.move(liveList);
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
