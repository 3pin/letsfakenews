import Calc from './functions/calc.js';

export default function sketch(p) {
  let initialWidth = 500;
  let initialHeight = 500;
  let canvasWidth, canvasHeight;
  let fontSizeMinFactor = 0.01;
  let fontSizeMaxFactor = 0.1
  //let fontSizeOffsetFactor = 5;
  let incMin = 2;
  let incMax = 5;
  let numLines = 3;
  let lines = [];
  let fillDark = 0;
  let fillLight = 150;
  // eslint-disable-next-line
  let onEndOne = 'onEndOne';
  let location1 = 'https://res.cloudinary.com/hi58qepi6/image/upload/v1576621480/bgd.jpg'
  let img;
  //
  class StoryLine {
    constructor(p, index, story, canvasWidth, canvasHeight, fontSizeMinFactor, fontSizeMaxFactor) {
      this.p = p;
      this.arrayIndex = index;
      this.story = story;
      //this.canvasWidth = canvasWidth;
      //this.canvasHeight = canvasHeight;
      //this.fontSizeMinFactor = fontSizeMinFactor;
      //this.fontSizeMaxFactor = fontSizeMaxFactor;
      this.onEndOne = 'onEndOne';
      let {
        xPos,
        yPos,
        fontSizeMin,
        fontSizeMax,
        fontSize
      } = Calc(canvasWidth, canvasHeight, fontSizeMinFactor, fontSizeMaxFactor);
      this.xPos = xPos;
      this.yPos = yPos;
      this.fontSizeMin = fontSizeMin;
      this.fontSizeMax = fontSizeMax;
      this.fontSize = fontSize;
      this.incAmount = Math.round(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, incMin, incMax));
      this.p.fill(Math.ceil(this.p.map(this.fontSize, this.fontSizeMinFactor, this.fontSizeMaxFactor, fillLight, fillDark)));
      console.log(`${this.fontSizeMin}, ${this.fontSizeMax}, ${this.fontSize}, ${incMin}, ${incMax}, ${this.incAmount}`);
      this.p.textFont("Helvetica");
      this.p.textSize(this.fontSize);
      this.storyLength = Math.ceil(this.p.textWidth(this.story));
    }
    show(p) {
      //this.p.smooth();
      //this.p.fill(Math.ceil(this.p.map(this.fontSize, this.fontSizeMinFactor, this.fontSizeMaxFactor, fillLight, fillDark)));
      //this.p.textFont("Helvetica");
      //this.p.textSize(this.fontSize);
      this.p.text(this.story, this.xPos, this.yPos);
    }
    move() {
      let offscreen = this.storyLength * -1
      if (this.xPos < offscreen) {
        console.log(this.xPos);
        this.onEndOne(this.arrayIndex).then(data => {
          if (data.index === this.arrayIndex) {
            console.log('UPDATE RECIEVED FOR INDEX:' + data.index);
            /*
            const {
              fontSizeMaxFactor,
              fontSizeMinFactor,
              fontSize,
              xPos,
              yPos
            } = Calc(this.canvasWidth, this.canvasHeight, this.fontSizeMinFactor, this.fontSizeMaxFactor);

            this.xPos = xPos;
            this.yPos = yPos;
            this.fontSize = fontSize;
            */
            this.story = data.story;
            this.p.textFont("Helvetica");
            this.p.textSize(this.fontSize);
            this.storyLength = Math.ceil(this.p.textWidth(data.story));
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
  //
  p.setup = () => {
    console.log("SETUP");
    img = p.loadImage(location1, p.resizeImg);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);

    for (let i = 0; i < numLines; i++) {
      lines.push(new StoryLine(p, i, 'Empty', canvasWidth, canvasHeight, fontSizeMinFactor, fontSizeMaxFactor));
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
      line.show(p);
      line.move(p);
    });
  };
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log("PROPS");
    if (props.onEndOne) {
      onEndOne = props.onEndOne;
      for (const line of lines) {
        line.onEndOne = onEndOne;
        console.log(line);
      }
    }
    /*
    if (props.onStartAll && props.onEndOne && props.numLines) {
      console.log(props.onStartAll + ', ' + props.onEndOne + ', ' + props.numLines)
      onStartAll = props.onStartAll;
      onEndOne = props.onEndOne;
      for (let i = 0; i < props.numLines; i++) {
        lines.push(new StoryLine(p, i, 'Empty', canvasWidth, canvasHeight, fontSizeMinFactor, fontSizeMaxFactor, onStartAll, onEndOne));
      }
      for (let i = 0; i < props.numLines; i++) {
        onStartAll().then(data => {
          if (data.index === i) {
            lines[i].story = data.story;
            lines[i].storyLength = Math.ceil(p.textWidth(data.story));
            //console.log(lines[i].storyLength + ', ' + lines[i].story);
            console.log(lines[i]);
          }
        });
      }
    }
    */
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
}
