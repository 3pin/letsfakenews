export default function Aspect(img, aspectRatio, canvasWidth, canvasHeight) {
  let imgWidth, imgHeight;
  if (img.width / img.height < aspectRatio) {
    //console.log('aspect: portrait');
    imgHeight = canvasHeight;
    imgWidth = (img.width * canvasHeight) / img.height;
  } else {
    //console.log('aspect:landscape');
    imgWidth = canvasWidth;
    imgHeight = (canvasWidth * img.height) / img.width;
  }
  return {
    imgWidth: imgWidth,
    imgHeight: imgHeight
  }
}
