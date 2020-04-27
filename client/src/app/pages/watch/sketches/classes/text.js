import Calc from '../functions/calc';

let calcResult;

export default class StoryLine {
  constructor(p, canvasWidth, canvasHeight, textSizeFactor, inc, story) {
    this.p = p;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textSizeFactor = textSizeFactor;
    this.inc = inc;
    this.story = story;
    calcResult = Calc(this.canvasWidth, this.canvasHeight, this.textSizeFactor);
    this.xPos = calcResult.xPos;
    this.yPos = calcResult.yPos;
    this.textSize = calcResult.textSize;
    /* declare textFont:textSize so we can correctly calculate textWidth */
    this.p.textFont('Helvetica', this.textSize);
    this.storyLength = Math.floor(this.p.textWidth(this.story));
  }

  show() {
    this.p.noSmooth();
    // this.p.background(0);
    this.p.fill(255);
    // this.p.textSize(this.textSize);
    // console.log(this.p.textSize());
    // this.p.textSize(30);
    this.p.textFont('Helvetica', this.textSize);
    this.p.text(this.story, this.xPos, this.yPos);
  }

  move(liveList) {
    if (this.xPos < -this.storyLength) {
      console.log(`Reached Storylength:${this.xPos}`);
      // pick a random story from liveList
      if (liveList.length > 0) {
        const randomEntry = Math.floor(Math.random() * liveList.length);
        this.story = liveList[randomEntry];
      }
      (calcResult = Calc(this.canvasWidth, this.canvasHeight, this.textSizeFactor));
      this.xPos = calcResult.xPos;
      this.yPos = calcResult.yPos;
      this.textSize = calcResult.textSize;
      /* declare textFont:textSize so we can correctly calculate textWidth */
      this.p.textFont('Helvetica', this.textSize);
      this.storyLength = Math.floor(this.p.textWidth(this.story));
    } else {
      this.xPos += this.inc;
    }
  }

  resize(w, h) {
    console.log('Class recevied RESIZE command');
    this.canvasWidth = w;
    this.canvasHeight = h;
  }
}
