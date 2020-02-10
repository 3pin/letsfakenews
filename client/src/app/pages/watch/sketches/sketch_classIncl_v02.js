import Calc from './functions/calc.js';

export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let fontSizeFactor = 10;
  let fontSizeOffsetFactor = 5;
  let incMin = 5;
  let incMax = 200;
  let numLines = 2;
  let lines = [];
  let fillDark = 0;
  let fillLight = 120;
  let onStartAll;
  let onEndOne;
  let location1 = 'https://res.cloudinary.com/hi58qepi6/image/upload/v1576621480/bgd.jpg'
  let img;
  let font;
  //
  p.setup = () => {
    //console.log("SETUP");
    img = p.loadImage(location1, p.resizeImg);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    font = p.textFont("Helvetica");
    for (let i = 0; i < numLines; i++) {
      lines.push(
        new StoryLine(p, i, font, canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor, incMin, incMax, fillDark, fillLight, onStartAll, onEndOne)
      );
    }
    lines.forEach(line => {
      console.log(line);
    });
  };
  p.draw = () => {
    //console.log("DRAW");
    p.background(img);
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
      console.log('ONENDONE PROP recevied')
      fontSizeFactor = props.fontSizeFactor;
      onEndOne = props.onEndOne;
    }
    if (props.onStartAll) {
      console.log('STARTUP PROP recevied')
      onStartAll = props.onStartAll;
      if (!lines[0].story) {
        for (let i = 0; i < numLines; i++) {
          // randomly pull stories from db's livelist[] and push into stories[]
          onStartAll().then(data => {
            lines[i].story = data;
            lines[i].p.textSize(lines[i].fontSize);
            lines[i].storyLength = Math.round(lines[i].p.textWidth(data));
            console.log('INDEX:' + i + ', STORYLENGTH:' + lines[i].storyLength + ', STORY:' + lines[i].story);
          });
        }
        lines.forEach(line => {
          console.log(line);
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
    constructor(p, index, font, canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor, incMin, incMax, fillDark, fillLight, onStartAll, onEndOne) {
      this.p = p;
      this.index = index;
      this.font = font;
      this.p.textFont(this.font);
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.fontSizeFactor = fontSizeFactor;
      this.fontSizeOffsetFactor = fontSizeOffsetFactor;
      this.incMin = incMin;
      this.incMax = incMax;
      this.fillDark = fillDark;
      this.fillLight = fillLight;
      this.onStartAll = onStartAll;
      this.onEndOne=onEndOne;
      const {
        fontSizeMax,
        fontSizeMin,
        fontSize,
        xPos,
        yPos
      } = Calc(canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor);
      this.fontSizeMax = fontSizeMax;
      this.fontSizeMin = fontSizeMin;
      this.fontSize = fontSize;
      this.xPos = xPos;
      this.yPos = yPos;
      this.incAmount = Math.floor(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, incMin, incMax));
      console.log('incAmount: ' + this.incAmount);
    }
    move() {
      let inv = this.storyLength * -1
      if (this.xPos < inv) {
        console.log('OFFSCREEN:' + this.xPos + ', INDEX:' + this.index);
        const {
          fontSizeMax,
          fontSizeMin,
          fontSize,
          xPos,
          yPos
        } = Calc(canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor);
        this.fontSizeMax = fontSizeMax;
        this.fontSizeMin = fontSizeMin;
        this.fontSize = fontSize;
        this.xPos = xPos;
        this.yPos = yPos;
        this.incAmount = Math.floor(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, incMin, incMax));
        //console.log('incAmount: ' + this.incAmount);
        onEndOne(this.index).then(data => {
          //console.log(data);
          if (data.index === this.index) {
            this.story = data.story;
            this.p.textSize(this.fontSize);
            this.storyLength = Math.round(this.p.textWidth(this.story));
            console.log('INDEX:' + this.index + ', fontSize:' + this.fontSize + ', STORYLENGTH:' + this.storyLength + ', STORY:' + this.story);
            //lines[i].story = data;
            //lines[i].storyLength = Math.round(p.textWidth(data));
            //console.log('story: ' + this.story);
            //console.log('storyLength: ' + this.storyLength);
          }
        });
      } else {
        this.xPos = this.xPos - this.incAmount;
      }
    }
    show() {
      //console.log(this.fontSize)
      p.textSize(200);
      //console.log(this.p.textSize())
      this.p.smooth();
      this.p.fill(Math.floor(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, fillLight, fillDark)));
      //this.p.textFont("Helvetica");
      //this.p.textSize(this.fontSize);
      this.p.text(this.story, this.xPos, this.yPos);
    }
  }
}
