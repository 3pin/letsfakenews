//import Calc from './func_Calc.js';
import StoryLine from './class_Line.js';

export default class sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  //
  let canvasWidth, canvasHeight;
  let fontSizeFactor = 10;
  let fontSizeOffsetFactor = 5;
  let incMin = 8;
  let incMax = 24;
  let fillDark = 0;
  let fillLight = 120;
  let onStartAll;
  let onEndOne;
  //
  let numLines = 5;
  let lines = [];
  //
  let location1 = 'https://res.cloudinary.com/hi58qepi6/image/upload/v1576621480/bgd.jpg'
  let img;

  p.resizeImg = (img) => {
    img.resize(canvasWidth, canvasHeight);
  };
  p.setup = () => {
    //console.log("SETUP");
    img = p.loadImage(location1, p.resizeImg);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < numLines; i++) {
      // randomly pull stories from db's livelist[] and push into stories[]
      lines.push(StoryLine(p, canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor, incMin, incMax, fillDark, fillLight, onStartAll, onEndOne));
    }
  };
  p.draw = () => {
    //console.log("DRAW");
    // Draw Background
    p.background(img);
    // Draw Storylines... if they have stories
    lines.forEach(line => {
      if (line.story) {
        line.show();
        line.move();
      }
    });
  };
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    //console.log("PROPS");
    if (props.fontSizeFactor || props.onEndOne) {
      fontSizeFactor = props.fontSizeFactor;
      onEndOne = props.onEndOne;
    }
    if (props.onStartAll) {
      onStartAll = props.onStartAll;
      if (!lines[0].story) {
        //console.log('LOADING STORIES...')
        for (let i = 0; i < numLines; i++) {
          // randomly pull stories from db's livelist[] and push into stories[]
          onStartAll().then(data => {
            lines[i].story = data;
            lines[i].storyLength = Math.round(p.textWidth(data));
            //console.log(lines[i].story + ' ' + lines[i].storyLength);
          });
        }
      }
    }
  };
  window.onresize = () => {
    console.log("WINDOW-RESIZE");
    if (!window.screenTop && !window.screenY) {
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
    } else {
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
    }
    img.resize(canvasWidth, canvasHeight);
    p.resizeCanvas(canvasWidth, canvasHeight);
  };
}
