import Calc from "./functions/calc";

export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let xPos, yPos, textSize;
  let testAlignment = "TRUE";
  let inc = -5;
  let radius = 50;
  let storyLength;
  let textSizeFactor = 20;
  let story = "Initial Story";
  let liveList;
  //
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS received...");
    if (props.liveList) {
      liveList = props.liveList;
      console.log(liveList);
    }
  };
  p.setup = () => {
    console.log("SETUP started...");
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    storyLength = Math.floor(p.textWidth(story));
    console.log(storyLength);
    ({ textSize, xPos, yPos } = Calc(
      canvasWidth,
      canvasHeight,
      textSizeFactor
    ));
    p.textSize(textSize);
  };
  p.move = () => {
    //console.log(xPos)
    if (xPos < -storyLength) {
      console.log("Reached Storylength:" + xPos);
      ({ textSize, xPos, yPos } = Calc(
        canvasWidth,
        canvasHeight,
        textSizeFactor
      ));
      p.textSize(textSize);
      p.Ended();
    } else {
      xPos = xPos + inc;
    }
  };
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
    p.textFont("Helvetica");
    p.textSize(textSize);
    p.smooth();
    p.text(story, xPos, yPos);
    p.move();
  };
  p.Ended = () => {
    // pick a random story from liveList
    let randomEntry = Math.floor(Math.random() * liveList.length);
    story = liveList[randomEntry].story;
    storyLength = Math.floor(p.textWidth(story));
    console.log(`StoryLength:${storyLength} \n Story:${story}`);
  };
  window.onresize = () => {
    if (!window.screenTop && !window.screenY) {
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
    } else {
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
    }
    xPos = canvasWidth;
    yPos = canvasHeight / 2;
    p.resizeCanvas(canvasWidth, canvasHeight);
  };
}
