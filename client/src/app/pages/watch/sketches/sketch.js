export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let xPos, yPos, fontSize;
  let radius=50;
  let story= "Default text";
  let finished;
  let storyLength = 0;
  let fontSizeFactor = 20;

  p.Calc = (canvasWidth, canvasHeight, fontSizeFactor) => {
    let fontSize = Math.floor(Math.random() * Math.floor(canvasHeight/fontSizeFactor));
    let xPos = canvasWidth;
    let yPos = Math.floor(Math.random() * Math.floor(canvasHeight-fontSize)) + fontSize;
    //console.log(fontSize, xPos, yPos);
    return {
      fontSize: fontSize,
      xPos: xPos,
      yPos: yPos
    }
  }
  p.onEndOne = () => {
    /*
    console.log(finished);
    ({ fontSize, xPos, yPos } = p.Calc(canvasWidth, canvasHeight, fontSizeFactor));
    finished();
    */
  }
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log("PROPS received...")
    if (props.radius || props.finished || props.fontSizeFactor) {
      radius = props.radius;
      finished = props.finished;
      fontSizeFactor = props.fontSizeFactor;
    }
    if (props.story) {
      story = props.story;
      storyLength = p.textWidth(story);
    }
  }
  p.setup = () => {
    console.log('SETUP started...')
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    ({ fontSize, xPos, yPos } = p.Calc(canvasWidth, canvasHeight, fontSizeFactor));
  }
  p.move = () => {
    if (xPos < -storyLength) {
      //p.onEndOne();
      ({ fontSize, xPos, yPos } = p.Calc(canvasWidth, canvasHeight, fontSizeFactor));
      finished().then((data) => {
        console.log(data);
      });
    } else {
      xPos = xPos-30;
    }
  }
  p.draw = () => {
    p.noSmooth();
    p.background(0);
    p.fill(150);
    p.ellipse(0, 0, radius, radius);
    p.ellipse(canvasWidth / 2, canvasHeight / 2, radius, radius);
    p.ellipse(canvasWidth, canvasHeight, radius, radius);
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
