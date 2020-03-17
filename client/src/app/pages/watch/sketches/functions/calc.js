export default function Calc (canvasWidth, canvasHeight, textSizeFactor) {
  // this.canvasWidth = canvasWidth;
  // this.canvasHeight = canvasHeight;
  // this.textSizeFactor = textSizeFactor;
  //
  const textSize = Math.floor(Math.random() * Math.floor(canvasHeight / textSizeFactor))
  const xPos = canvasWidth
  const yPos = Math.floor(Math.random() * Math.floor(canvasHeight - textSize)) + textSize
  // console.log(`xPos:${xPos} yPos:${yPos} textSize:${textSize}`);
  //
  return {
    textSize: textSize,
    xPos: xPos,
    yPos: yPos
  }
};
