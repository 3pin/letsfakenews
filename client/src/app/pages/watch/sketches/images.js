//import Aspect from './functions/aspect';

export default function sketch(p) {
  let initialWidth = 534;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let imgUrl = "../../images/bgd.jpg";
  let img;
  let imgWidth, imgHeight;
  let setupCount = 0;
  //
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS received...");
    if (props.componentWidth && setupCount<1) {
      setupCount = setupCount + 1;
      initialWidth = props.componentWidth;
      initialHeight = Math.floor((props.componentWidth / 1.78));
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      console.log(`canvasWidth:${canvasWidth} canvasHeight:${canvasHeight}`)
      p.resizeCanvas(initialWidth, initialHeight);
    }
    if (props.src) {
      imgUrl = props.src;
      img = p.loadImage(imgUrl, (img) => {
        if (img.width / img.height < 1.78) {
          //console.log('aspect: portrait');
          imgHeight = canvasHeight;
          imgWidth = (img.width * canvasHeight) / img.height;
        } else {
          //console.log('aspect:landscape');
          imgWidth = canvasWidth;
          imgHeight = (canvasWidth * img.height) / img.width;
        }
      });
    }
  };
  p.setup = () => {
    console.log("SETUP started...");
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    p.imageMode(p.CENTER);
    p.createCanvas(canvasWidth, canvasHeight);
    img = p.loadImage(imgUrl, (img) => {
      if (img.width / img.height < 1.78) {
        //console.log('aspect: portrait');
        imgHeight = canvasHeight;
        imgWidth = (img.width * canvasHeight) / img.height;
      } else {
        //console.log('aspect:landscape');
        imgWidth = canvasWidth;
        imgHeight = (canvasWidth * img.height) / img.width;
      }
    });
  };
  p.draw = () => {
    p.noSmooth();
    p.background(0);
    p.image(img, canvasWidth / 2, canvasHeight / 2, imgWidth, imgHeight);
  };
  window.onresize = () => {
    console.log('resize clicked')
    if (!window.screenTop && !window.screenY) {
      console.log('condition:A')
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
      img = p.loadImage(imgUrl, (img) => {
        if (img.width / img.height < 1.78) {
          //console.log('aspect: portrait');
          imgHeight = canvasHeight;
          imgWidth = (img.width * canvasHeight) / img.height;
        } else {
          //console.log('aspect:landscape');
          imgWidth = canvasWidth;
          imgHeight = (canvasWidth * img.height) / img.width;
        }
      });
    } else {
      console.log('condition:B')
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      img = p.loadImage(imgUrl, (img) => {
        if (img.width / img.height < 1.78) {
          //console.log('aspect: portrait');
          imgHeight = canvasHeight;
          imgWidth = (img.width * canvasHeight) / img.height;
        } else {
          //console.log('aspect:landscape');
          imgWidth = canvasWidth;
          imgHeight = (canvasWidth * img.height) / img.width;
        }
      });
    }
    p.resizeCanvas(canvasWidth, canvasHeight);
  };
}
