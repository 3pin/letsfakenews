export default function Calc(canvasWidth, canvasHeight, textSizeFactor) {
  //this.canvasWidth = canvasWidth;
  //this.canvasHeight = canvasHeight;
  //this.textSizeFactor = textSizeFactor;
  //
  let textSize = Math.floor(Math.random() * Math.floor(canvasHeight / textSizeFactor));
  let xPos = canvasWidth;
  let yPos = Math.floor(Math.random() * Math.floor(canvasHeight - textSize)) + textSize;
  //console.log(`xPos:${xPos} yPos:${yPos} textSize:${textSize}`);
  //
  return {
    textSize: textSize,
    xPos: xPos,
    yPos: yPos
  }
};
