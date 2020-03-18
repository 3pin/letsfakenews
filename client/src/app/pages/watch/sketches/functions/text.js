import Calc from './functions/calc';

export default function sketch(p) {
  const initialWidth = 400;
  const initialHeight = 300;
  let canvasWidth; let
    canvasHeight;
  let xPos; let yPos; let
    textSize;
  const inc = -5;
  let storyLength;
  const textSizeFactor = 8;
  let story = 'Initial Story';
  let liveList;
  let img;
  const imgUrl = '../../images/bgd.jpg';
  //
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log('PROPS received...');
    if (props.liveList.length > 0) {
      liveList = props.liveList;
      console.log(liveList);
    }
  };
  p.setup = () => {
    console.log('SETUP started...');
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    img = p.loadImage(imgUrl);
    p.textFont('Helvetica');
    ({
      textSize,
      xPos,
      yPos,
    } = Calc(
      canvasWidth,
      canvasHeight,
      textSizeFactor,
    ));
    console.log(p.textSize());
    p.textSize(textSize);
    console.log(p.textSize());
    storyLength = Math.floor(p.textWidth(story));
    console.log(storyLength);
  };
  p.move = () => {
    // console.log(xPos)
    if (xPos < -storyLength) {
      console.log(`Reached Storylength:${xPos}`);
      const randomEntry = Math.floor(Math.random() * liveList.length);
      story = liveList[randomEntry].story;
      console.log(story);
      ({
        textSize,
        xPos,
        yPos,
      } = Calc(
        canvasWidth,
        canvasHeight,
        textSizeFactor,
      ));
      p.textSize(textSize);
      storyLength = Math.floor(p.textWidth(story));
      console.log(`StoryLength:${storyLength} \n Story:${story}`);
    } else {
      xPos += inc;
    }
  };
  p.draw = () => {
    p.noSmooth();
    p.background(0);
    p.image(img, 0, 0);
    p.fill(0);
    console.log(p.textSize());
    p.textSize(textSize);
    p.smooth();
    p.text(story, xPos, yPos);
    p.move();
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
