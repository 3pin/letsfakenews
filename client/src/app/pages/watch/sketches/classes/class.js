export default class StoryLine {
  constructor(p, canvasWidth, canvasHeight, textSizeFactor, inc, radius, story) {
    //this.Calc = Calc;
    this.p = p;
    this.testAlignment = "FALSE";
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textSizeFactor = textSizeFactor;
    this.inc = inc;
    this.radius = radius;
    this.p.textFont("Helvetica");
    //
    this.textSize = undefined;
    this.xPos = undefined;
    this.yPos = undefined;
    this.calc();
    //
    this.story = story;
    this.storyLength = Math.floor(this.p.textWidth(this.story));
    console.log(`StoryLength:${this.storyLength} \n Story:${this.story}`);
  }
  calc() {
    this.textSize = Math.floor(Math.random() * Math.floor(this.canvasHeight / this.textSizeFactor));
    this.xPos = this.canvasWidth;
    this.yPos = Math.floor(Math.random() * Math.floor(this.canvasHeight - this.textSize)) + this.textSize;
    console.log(`xPos:${this.xPos} yPos:${this.yPos} textSize:${this.textSize}`);
    this.p.textSize(this.textSize);
    console.log(this.p.textSize());
  }
  show() {
    this.p.noSmooth();
    //this.p.background(0);
    if (this.testAlignment === "TRUE") {
      this.p.fill(160);
      this.p.ellipse(0, 0, this.radius, this.radius);
      this.p.ellipse(this.canvasWidth, 0, this.radius, this.radius);
      this.p.ellipse(0, this.canvasHeight, this.radius, this.radius);
      this.p.ellipse(this.canvasWidth, this.canvasHeight, this.radius, this.radius);
    }
    this.p.fill(255);
    //console.log(this.p.textSize());
    //this.p.textSize(this.textSize);
    this.p.text(this.story, this.xPos, this.yPos);
  }
  move(liveList) {
    if (this.xPos < -this.storyLength) {
      console.log("Reached Storylength:" + this.xPos);
      this.calc();
      // pick a random story from liveList
      let randomEntry = Math.floor(Math.random() * liveList.length);
      this.story = liveList[randomEntry];
      this.storyLength = Math.floor(this.p.textWidth(this.story));
      console.log(`StoryLength:${this.storyLength} \n Story:${this.story}`);
    } else {
      this.xPos = this.xPos + this.inc;
    }
  }
  resize(w,h) {
    console.log('RESIZE command received');
    this.canvasWidth = w;
    this.canvasHeight = h;
  }
}
