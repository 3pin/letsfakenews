export default function Calc(canvasWidth, canvasHeight, textSizeFactor) {
  let textSize = Math.floor(Math.random() * Math.floor(canvasHeight / textSizeFactor));
  let xPos = canvasWidth;
  let yPos = Math.floor(Math.random() * Math.floor(canvasHeight - textSize)) + textSize;
  return {
    textSize: textSize,
    xPos: xPos,
    yPos: yPos
  }
};
