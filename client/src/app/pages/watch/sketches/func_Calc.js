export default function Calc(canvasWidth, canvasHeight, fontSizeMinFactor, fontSizeMaxFactor) {
  let fontSizeMin = Math.round(canvasWidth * fontSizeMinFactor);
  let fontSizeMax = Math.round(canvasWidth * fontSizeMaxFactor);
  let fontSize = Math.round(Math.random() * (fontSizeMax - fontSizeMin)) + fontSizeMin;
  let xPos = canvasWidth;
  let yPos = Math.round(Math.random() * (canvasHeight - fontSize)) + fontSize;
  console.log(`fontSizeMin:${fontSizeMin} fontSizeMax:${fontSizeMax} fontSize:${fontSize} xPos:${xPos} yPos:${yPos}`);
  return {
    fontSizeMin: fontSizeMin,
    fontSizeMax: fontSizeMax,
    fontSize: fontSize,
    xPos: xPos,
    yPos: yPos
  };
};
