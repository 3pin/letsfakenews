export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let xPos, yPos, fontSize;
  //let radius = 50;
  let storyLength;
  let fontSizeFactor = 20;
  let story = "Initial Story";
  let liveList;

  p.Calc = (canvasWidth, canvasHeight, fontSizeFactor) => {
    let fontSize = Math.floor(Math.random() * Math.floor(canvasHeight/fontSizeFactor));
    let xPos = canvasWidth;
    let yPos = Math.floor(Math.random() * Math.floor(canvasHeight-fontSize)) + fontSize;
    return {
      fontSize: fontSize,
      xPos: xPos,
      yPos: yPos
    }
  }
  p.Ended = () => {
    // pick a random story from liveList
    let randomEntry = Math.floor(Math.random() * (liveList.length));
    story = liveList[randomEntry].story;
    storyLength = Math.floor(p.textWidth(story));
    console.log(`StoryLength:${storyLength} \n Story:${story}`);

  }
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log("PROPS received...")
    if (props.liveList) {
      liveList = props.liveList;
      console.log(liveList);
    }
  }
  p.setup = () => {
    console.log('SETUP started...')
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    storyLength = Math.floor(p.textWidth(story));
    console.log(storyLength);
    ({ fontSize, xPos, yPos } = p.Calc(canvasWidth, canvasHeight, fontSizeFactor));
  }
  p.move = () => {
    //console.log(xPos)
    if (xPos < -storyLength) {
      console.log('Reached Storylength:' + storyLength);
      ({ fontSize, xPos, yPos } = p.Calc(canvasWidth, canvasHeight, fontSizeFactor));
      p.Ended();
    } else {
      xPos = xPos-10;
    }
  }
  p.draw = () => {
    p.noSmooth();
    p.background(0);
    /*
    p.fill(150);
    p.ellipse(0, 0, radius, radius);
    p.ellipse(canvasWidth/2, canvasHeight/2, radius, radius);
    p.ellipse(canvasWidth, canvasHeight, radius, radius);
    */
    p.fill(255);
    p.textFont('Helvetica')
    p.textSize(fontSize);
    p.smooth();
    p.text(story, xPos, yPos);
    p.move();
  }
  window.onresize = () => {
    if (!window.screenTop && !window.screenY) {
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
    } else {
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
    }
    xPos = canvasWidth;
    yPos = canvasHeight/2;
    p.resizeCanvas(canvasWidth, canvasHeight);
  }
}
