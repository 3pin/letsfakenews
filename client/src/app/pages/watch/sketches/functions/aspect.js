export default function Aspect(img, canvasWidth, canvasHeight) {
  this.img = img;
  let imgWidth, imgHeight;
  if (this.img.width / this.img.height < 1.78) {
    console.log('aspect: portrait');
    imgWidth = (this.img.width * canvasHeight) / this.img.height;
    imgHeight = canvasHeight;
  } else {
    console.log('aspect:landscape');
    imgWidth = canvasWidth;
    imgHeight = (canvasWidth * this.img.height) / this.img.width;
  }
  return {
    imgWidth: imgWidth,
    imgHeight: imgHeight
  }
}
