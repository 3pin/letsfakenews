export default function sketch(p) {
  let initialWidth = 400;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let radius = 50;
  let fontSizeFactor = 20;
  let numLines = 1;
  let lines = [];
  let onStartAll;
  let onEndOne;
  //
  p.Calc = (canvasWidth, canvasHeight, fontSizeFactor) => {
    let fontSize = Math.floor(Math.random() * Math.floor(canvasHeight / fontSizeFactor));
    let xPos = canvasWidth;
    let yPos =Math.floor(Math.random() * Math.floor(canvasHeight - fontSize)) + fontSize;
    console.log(fontSize, xPos, yPos);
    return {
      fontSize: fontSize,
      xPos: xPos,
      yPos: yPos
    };
  };
  p.onStartAll = () => {
    console.log("onStartAll");
    onStartAll();
  };
  /*
  p.onEndOne = async () => {
    console.log("onEndOne");
    onEndOne();
    //this.line.story = p.onEndOne().story;
    //console.log(this.line.story);
  };
  */
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS");
    console.log(props);
    if (
      props.radius ||
      props.fontSizeFactor ||
      props.onStartAll ||
      props.onEndOne
    ) {
      radius = props.radius;
      fontSizeFactor = props.fontSizeFactor;
      onStartAll = props.onStartAll;
      onEndOne = props.onEndOne;
    }
    if (props.onStartAll) {
      onStartAll = props.onStartAll;
      /*
      for (let i = 0; i < numLines; i++) {
        // randomly pull stories from db's livelist[] and push into stories[]
        console.log(lines[i].story);
        lines[i].story = p.onStartAll();
        //p.loop();
      }
      */
    }
    if (props.onEndOne) {
      onEndOne = props.onEndOne;
    }
  };
  p.setup = () => {
    //p.noLoop();
    console.log("SETUP")
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < numLines; i++) {
      // randomly pull stories from db's livelist[] and push into stories[]
      //let startingStory = p.onStartAll();
      lines.push(new StoryLine(p, canvasWidth, canvasHeight, fontSizeFactor, "Empty", 5));
    }
  };
  p.draw = () => {
    console.log("DRAW")
    p.noSmooth();
    p.background(0);
    p.fill(150);
    p.ellipse(0, 0, radius, radius);
    p.ellipse(canvasWidth / 2, canvasHeight / 2, radius, radius);
    p.ellipse(canvasWidth, canvasHeight, radius, radius);
    lines.forEach(line => {
      //console.log(line.story);
      //console.log(line.storyLength);
      line.show();
      line.move();
    });
  };
  window.onresize = () => {
    console.log("WINDOW-RESIZE")
    if (!window.screenTop && !window.screenY) {
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
    } else {
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
    }
    p.resizeCanvas(canvasWidth, canvasHeight);
  };
  class StoryLine {
    constructor(p, canvasWidth, canvasHeight, fontSizeFactor, story, storyLength, onStartAll, onEndOne) {
      this.p = p;
      //this.canvasWidth = p.canvasWidth;
      //this.canvasHeight = p.canvasHeight;
      this.fontSizeFactor = p.fontSizeFactor;
      const { fontSize, xPos, yPos } = p.Calc(canvasWidth,canvasHeight,fontSizeFactor);
      this.fontSize = fontSize;
      this.xPos = xPos;
      this.yPos = yPos;
      this.story = story;
      this.storyLength = storyLength;
    }
    onEnded = async () => {
      console.log('This class has ended');
      const { fontSize, xPos, yPos } = p.Calc(canvasWidth,canvasHeight,fontSizeFactor);
      this.fontSize = fontSize;
      this.xPos = xPos;
      this.yPos = yPos;
      let response = await onEndOne();
      return this.callback(response);
      /*
      let response = new Promise(function(resolve,reject) {
        resolve(onEndOne());
        console.log(response);
      })
      */
      //this.story = response.story;
      //console.log(this.line.story);
    }
    callback(response) {
      console.log('boom');
      console.log(response);
    }
    move() {
      if (this.xPos < -this.storyLength) {
        this.onEnded('ended', this.callback);
      } else {
        this.xPos = this.xPos - 5;
      }
    }
    show() {
      p.smooth();
      p.fill(255);
      p.textFont("Helvetica");
      p.textSize(this.fontSize);
      p.text(this.story, this.xPos, this.yPos);
    }
  }
}
