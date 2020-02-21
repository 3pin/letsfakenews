export default function Aspect(img, aspectRatio, canvasWidth, canvasHeight) {
  let imgWidth, imgHeight;
  if (img.width / img.height < aspectRatio) {
    //console.log('aspect: portrait');
    imgHeight = canvasHeight;
    imgWidth = Math.round((img.width * canvasHeight) / img.height);
  } else {
    //console.log('aspect:landscape');
    imgWidth = canvasWidth;
    imgHeight = Math.round((canvasWidth * img.height) / img.width);
  }
  console.log(`imgWidth:${imgWidth} imgHeight:${imgHeight}`)
  return {
    imgWidth: imgWidth,
    imgHeight: imgHeight
  }
}
