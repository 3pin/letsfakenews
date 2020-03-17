export default function Aspect (img, aspectRatio, canvasWidth, canvasHeight) {
  let imgWidth, imgHeight
  if (img.width / img.height < aspectRatio) {
    // console.log('img aspect: portrait');
    imgHeight = canvasHeight
    imgWidth = Math.round((img.width * canvasHeight) / img.height)
  } else {
    // console.log('img aspect:landscape');
    imgWidth = canvasWidth
    imgHeight = Math.round((canvasWidth * img.height) / img.width)
  }
  // console.log(`imgWidth:${imgWidth} imgHeight:${imgHeight}`)
  return {
    imgWidth: Math.round(imgWidth),
    imgHeight: Math.round(imgHeight)
  }
}
