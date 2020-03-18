import Aspect from './functions/aspect';

export default function sketch(p) {
  let initialWidth = 534;
  let initialHeight = 300;
  let canvasWidth; let
    canvasHeight;
  const corsUrl = 'https://cors-anywhere.herokuapp.com/';
  let imgUrl = '../../images/bgd.jpg';
  let img;
  let imgWidth; let
    imgHeight;
  let setupCount = 0;
  const initialAspectRatio = 1.78;
  let aspectRatio = initialAspectRatio;
  //
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log('PROPS received...');
    if (props.componentWidth && setupCount < 1) {
      setupCount += 1;
      console.log(`setupCount: ${setupCount}`);
      initialWidth = props.componentWidth;
      /* 1.78 sets aspect_ratio for component @16:9 */
      initialHeight = Math.floor((props.componentWidth / aspectRatio));
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      console.log(`canvasWidth:${canvasWidth} canvasHeight:${canvasHeight}`);
      p.resizeCanvas(initialWidth, initialHeight);
    }
    if (props.src !== undefined) {
      setupCount += 1;
      console.log(`setupCount: ${setupCount}`);
      imgUrl = corsUrl + props.src;
      console.log(`imgUrl: ${imgUrl}`);
      img = p.loadImage(imgUrl, () => {
        ({
          imgWidth,
          imgHeight,
        } = Aspect(img, aspectRatio, canvasWidth, canvasHeight));
      });
    }
  };
  p.setup = () => {
    console.log('SETUP started...');
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.imageMode(p.CENTER);
    p.createCanvas(canvasWidth, canvasHeight);
  };
  p.draw = () => {
    p.noSmooth();
    p.background(0);
    if (setupCount > 1) {
      p.image(img, canvasWidth / 2, canvasHeight / 2, imgWidth, imgHeight);
    }
  };
  window.onresize = () => {
    console.log('resize clicked');
    if (!window.screenTop && !window.screenY) {
      console.log('condition:A');
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
      aspectRatio = window.screen.width / window.screen.height;
      img = p.loadImage(imgUrl, () => {
        ({
          imgWidth,
          imgHeight,
        } = Aspect(img, aspectRatio, canvasWidth, canvasHeight));
      });
    } else {
      console.log('condition:B');
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      aspectRatio = initialAspectRatio;
      img = p.loadImage(imgUrl, () => {
        ({
          imgWidth,
          imgHeight,
        } = Aspect(img, aspectRatio, canvasWidth, canvasHeight));
      });
    }
    p.resizeCanvas(canvasWidth, canvasHeight);
  };
}
