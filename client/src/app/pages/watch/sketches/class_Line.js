import Calc from './func_Calc.js';

export default function StoryLine(p, canvasWidth, canvasHeight, fontSizeFactor, fontSizeOffsetFactor, incMin, incMax, fillLight, fillDark, onStartAll, onEndOne) {
  this.p = p;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.fontSizeFactory = fontSizeFactor;
  this.fontSizeOffsetFactor = fontSizeOffsetFactor;
  this.fillLight = fillLight;
  this.fillDark = fillDark;
  this.onStartAll = onStartAll;
  this.onEndOne = onEndOne;
  //
  const {
    fontSizeMax,
    fontSizeMin,
    fontSize,
    xPos,
    yPos
  } = Calc(this.canvasWidth, this.canvasHeight, this.fontSizeFactor, this.fontSizeOffsetFactor);
  //
  this.fontSizeMax = fontSizeMax;
  this.fontSizeMin = fontSizeMin;
  this.fontSize = fontSize;
  this.xPos = xPos;
  this.yPos = yPos;
  this.incAmount = Math.floor(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, this.incMin, this.incMax));
  console.log('incAmount: ' + this.incAmount);

  this.move = () => {
    let inv = this.storyLength * -1
    if (this.xPos < inv) {
      console.log(this.xPos);
      const {
        fontSizeMax,
        fontSizeMin,
        fontSize,
        xPos,
        yPos
      } = Calc(this.canvasWidth, this.canvasHeight, this.fontSizeFactor, this.fontSizeOffsetFactor);
      this.fontSizeMax = fontSizeMax;
      this.fontSizeMin = fontSizeMin;
      this.fontSize = fontSize;
      this.xPos = xPos;
      this.yPos = yPos;
      this.incAmount = Math.floor(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, this.incMin, this.incMax));
      console.log('incAmount: ' + this.incAmount);
      this.onEndOne().then(data => {
        //console.log(data);
        this.story = data;
        this.storyLength = Math.round(this.p.textWidth(data));
        //console.log('story: ' + this.story);
        //console.log('storyLength: ' + this.storyLength);
      });
    } else {
      this.xPos = this.xPos - this.incAmount;
    }
  }

  this.show = () => {
    this.p.smooth();
    this.p.fill(Math.floor(this.p.map(this.fontSize, this.fontSizeMin, this.fontSizeMax, this.fillLight, this.fillDark)));
    this.p.textFont("Helvetica");
    this.p.textSize(this.fontSize);
    this.p.text(this.story, this.xPos, this.yPos);
  }
}
