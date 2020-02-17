import StoryLine from "./classes/text";

export default function sketch(p) {
  let initialWidth = 534;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let inc = -5;
  let textSizeFactor = 13;
  let story = "Initial Story";
  let liveList = [];
  let numLines = 5;
  let lines = [];
  let numScrollersDisplay = 1;
  let setupCount = 0;
  let intialAspectRatio = 1.78;
  let aspectRatio = intialAspectRatio;
  /* function connecting to props */
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS received...");
    console.log(props);
    if (props.liveList.length > 0) {
      liveList = [];
      for (let entry in props.liveList) {
        liveList.push(props.liveList[entry].story);
      }
    }
    if (props.textScrollers) {
      numScrollersDisplay = props.textScrollers
    }
    if (props.componentWidth && setupCount < 1) {
      setupCount = setupCount + 1
      initialWidth = props.componentWidth;
      /* 1.78 aspectRatio to setup component as 16:9 */
      initialHeight = Math.floor((props.componentWidth/aspectRatio));
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
      aspectRatio = window.screen.width / window.screen.height;
    } else {
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      aspectRatio = intialAspectRatio;
    }
    p.resizeCanvas(canvasWidth, canvasHeight);
    for (const line of lines) {
      line.resize(canvasWidth, canvasHeight);
    }
  };
}
