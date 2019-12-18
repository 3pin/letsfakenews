import Calc from './func_Calc.js';

export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let fontSizeFactor = 10;
  let fontSizeOffsetFactor = 5;
  let incMin = 3;
  let incMax = 9;
  let numLines = 1;
  let lines = [];
  let fillDark = 0;
  let fillLight = 120;
  let onStartAll;
  let onEndOne;
  let location1 = 'https://res.cloudinary.com/hi58qepi6/image/upload/v1576621480/bgd.jpg'
  let img;
  //
  p.setup = () => {
    console.log("SETUP");
    img = p.loadImage(location1, p.resizeImg);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < numLines; i++) {
      lines.push(new StoryLine(p, i, 'Empty', canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor, i));
    }
    lines.forEach(line => {
      console.log(line);
    });
  };
  p.draw = () => {
    //console.log("DRAW");
    p.background(img);
    // Draw Storylines... if they have stories
    lines.forEach(line => {
      line.show();
      line.move();
    });
  };
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log("PROPS");
    if (props.onEndOne) {
      console.log("prop.onEndOne received");
      onEndOne = props.onEndOne;
      lines.forEach(line => {
        line.onEndOne = onEndOne;
        console.log(line);
      });
    }
    if (props.onStartAll) {
      console.log("prop.onStartAll received");
      onStartAll = props.onStartAll;
      lines.forEach(line => {
        line.onStartAll = onStartAll;
        console.log(line);
      });
      console.log('Loading Stories...')
      for (let i = 0; i < numLines; i++) {
        // randomly pull stories from db's livelist[] and push into stories[]
        onStartAll().then(data => {
          lines[i].story = data.story;
          lines[i].storyLength = Math.round(p.textWidth(data.story));
          console.log(lines[i].storyLength + ', ' + lines[i].story);
        });
      }
    }
  };
  p.resizeImg = (img) => {
    img.resize(canvasWidth, canvasHeight);
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
  //
  class StoryLine {
    constructor(p, index, story, canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor) {
      this.p = p;
      this.arrayIndex = index;
      this.story = story;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.fontSizeFactor = fontSizeFactor;
      this.fontSizeOffsetFactor = fontSizeOffsetFactor;
      const {
        fontSizeMax,
        fontSizeMin,
        fontSize,
        xPos,
        yPos
      } = Calc(this.canvasWidth, this.canvasHeight, this.fontSizeFactor, this.fontSizeOffsetFactor, this.arrayIndex);
      this.xPos = xPos;
      this.yPos = yPos;
      this.fontSizeMax = fontSizeMax;
      this.fontSizeMin = fontSizeMin;
      this.fontSize = fontSize;
      this.incAmount = Math.floor(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, incMin, incMax));
      this.p.textFont("Helvetica");
      this.p.textSize(this.fontSize);
      this.storyLength = Math.round(this.p.textWidth(this.story));
    }
    show() {
      this.p.smooth();
      this.p.fill(Math.floor(p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, fillLight, fillDark)));
      //this.p.textFont("Helvetica");
      //this.p.textSize(this.fontSize);
      this.p.text(this.story, this.xPos, this.yPos);
    }
    move() {
      let inv = this.storyLength * -1
      if (this.xPos < inv) {
        console.log(this.xPos);
        onEndOne(this.arrayIndex).then(data => {
          if (data.index === this.arrayIndex) {
            console.log('UPDATE FOR:' + data.index);
            const {
              fontSizeMax,
              fontSizeMin,
              fontSize,
              xPos,
              yPos
            } = Calc(this.canvasWidth, this.canvasHeight, this.fontSizeFactor, this.fontSizeOffsetFactor, this.arrayIndex);
            this.xPos = xPos;
            this.yPos = yPos;
            this.fontSizeMax = fontSizeMax;
            this.fontSizeMin = fontSizeMin;
            this.fontSize = fontSize;
            this.story = data.story;
            this.p.textFont("Helvetica");
            this.p.textSize(this.fontSize);
            this.storyLength = Math.round(this.p.textWidth(data.story));
            console.log('story: ' + this.story);
            console.log('storyLength: ' + this.storyLength);
            console.log(this);
          }
        });
      } else {
        this.xPos = this.xPos - this.incAmount;
      }
    }
  }
}
