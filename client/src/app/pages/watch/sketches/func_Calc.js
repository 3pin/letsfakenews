export default function Calc(canvasWidth, canvasHeight, fontSizeFactor,fontSizeOffsetFactor) {
  let fontSizeMax = Math.floor(canvasHeight / fontSizeFactor) + Math.floor(canvasHeight / (fontSizeFactor));
  let fontSizeMin = Math.floor(canvasHeight / (fontSizeFactor));
  let fontSize = Math.floor(Math.random() * Math.floor(canvasHeight / fontSizeFactor)) + Math.floor(canvasHeight / (fontSizeFactor * fontSizeOffsetFactor));
  let xPos = canvasWidth;
  let yPos = Math.floor(Math.random() * Math.floor(canvasHeight - fontSize)) + fontSize;
  console.log('fontSizeMax:' + fontSizeMax + ', fontSizeMin:' + fontSizeMin + ',fontSize:' + fontSize + ', xPos:' + xPos + ', yPos:' + yPos);
  return {
    fontSizeMax: fontSizeMax,
    fontSizeMin: fontSizeMin,
    fontSize: fontSize,
    xPos: xPos,
    yPos: yPos
  };
};
