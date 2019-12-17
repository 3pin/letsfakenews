export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let fontSizeFactor = 10;
  let numLines = 6;
  let incRange = 7;
  let incOffset = 3;
  let lines = [];
  let onStartAll;
  let onEndOne;
  let location1 = 'https://res.cloudinary.com/hi58qepi6/image/upload/v1576621480/bgd.jpg'
  let img;

  p.Calc = (canvasWidth, canvasHeight, fontSizeFactor) => {
    img.resize(canvasWidth, canvasHeight);
    let fontSize = Math.floor(Math.random() * Math.floor(canvasHeight / fontSizeFactor));
    let xPos = canvasWidth;
    let yPos = Math.floor(Math.random() * Math.floor(canvasHeight - fontSize)) + fontSize;
    console.log(fontSize, xPos, yPos);
    return {
      fontSize: fontSize,
      xPos: xPos,
      yPos: yPos
    };
  };
  p.resizeImg = (img) => {
    console.log('success');
    img.resize(canvasWidth, canvasHeight);
  };
  p.setup = () => {
    console.log("SETUP");
    img = p.loadImage(location1, p.resizeImg);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < numLines; i++) {
      // randomly pull stories from db's livelist[] and push into stories[]
      lines.push(
        new StoryLine(p, canvasWidth, canvasHeight, fontSizeFactor)
      );
    }
  };
  p.draw = () => {
    console.log("DRAW");
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
    console.log(props);
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
            console.log(lines[i].story);
            console.log(lines[i].storyLength);
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
  //
  class StoryLine {
    constructor(p, canvasWidth, canvasHeight, fontSizeFactor) {
      this.p = p;
      this.fontSizeFactor = p.fontSizeFactor;
      const {
        fontSize,
        xPos,
        yPos
      } = p.Calc(canvasWidth, canvasHeight, fontSizeFactor);
      this.fontSize = fontSize;
      this.xPos = xPos;
      this.yPos = yPos;
      this.incAmount = Math.floor(Math.random() * incRange) + incOffset
      console.log('fontSize: ' + this.fontSize);
      console.log('incAmount: ' + this.incAmount);
    }
    move() {
      let inv = this.storyLength * -1
      if (this.xPos < inv) {
        console.log(this.xPos);
        const {
          fontSize,
          xPos,
          yPos
        } = p.Calc(canvasWidth, canvasHeight, fontSizeFactor);
        this.fontSize = fontSize;
        this.xPos = xPos;
        this.yPos = yPos;
        this.incAmount = Math.floor(Math.random() * incRange) + incOffset
        console.log('fontSize: ' + this.fontSize);
        console.log('incAmount: ' + this.incAmount);
        onEndOne().then(data => {
          //console.log(data);
          this.story = data;
          this.storyLength = Math.round(p.textWidth(data));
          console.log('story: ' + this.story);
          console.log('storyLength: ' + this.storyLength);
        });
      } else {
        this.xPos = this.xPos - this.incAmount;
      }
    }
    show() {
      p.smooth();
      p.fill(0);
      p.textFont("Helvetica");
      p.textSize(this.fontSize);
      p.text(this.story, this.xPos, this.yPos);
    }
  }
}
