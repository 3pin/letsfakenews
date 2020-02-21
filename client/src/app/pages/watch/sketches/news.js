import Aspect from "./functions/aspect";

export default function sketch(p) {
  let initialWidth = 534;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let setupCount = 0;
  let initialAspectRatio = 1.78;
  let aspectRatio = initialAspectRatio;
  let containerWidth, containerHeight;
  //
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    console.log("PROPS received...");
    if (props.componentWidth && setupCount < 1) {
      setupCount = setupCount + 1;
      initialWidth = props.componentWidth;
      /* A value of 1.78 sets starting aspect_ratio @16:9 */
      initialHeight = Math.floor((props.componentWidth / aspectRatio));
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      containerWidth = canvasWidth;
      containerHeight = canvasHeight;
      console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`)
      p.resizeCanvas(initialWidth, initialHeight);
    }
    if (props.vidUrl) {
      //vidUrl = props.vidUrl;
    }
  };
  p.setup = () => {
    console.log("SETUP started...");
    p.noStroke()
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    containerWidth = canvasWidth;
    containerHeight = canvasHeight;
    console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`)
    p.createCanvas(canvasWidth, canvasHeight);
    //
  };
  p.draw = () => {
    p.noSmooth();
    //p.background(0);
    p.rectMode(p.CENTER);
    //p.rect(canvasWidth/2, canvasHeight/2, canvasWidth/4, canvasHeight/4);
    let y1 = containerHeight/3;
    let y2 = containerHeight/5.8;
    let x1 = containerWidth/3.2;
    p.fill(100);
    p.rect( (canvasWidth/2), (canvasHeight/2 + y1), (containerWidth), (y2));
    p.fill(255);
    p.rect( (canvasWidth/2), (canvasHeight/2 + y1), (containerWidth-x1), (y2));
  };
  window.onresize = () => {
    console.log('resize clicked')
    if (!window.screenTop && !window.screenY) {
      console.log('condition: ENTERING FULLSCREEN')
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
      aspectRatio = window.screen.width / window.screen.height;
      if (aspectRatio < initialAspectRatio) {
        containerWidth = canvasWidth;
        containerHeight = Math.round(canvasWidth / initialAspectRatio);
      } else {
        containerHeight = canvasHeight
        containerWidth = Math.round(canvasHeight / initialAspectRatio);
      }
      console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`)
    } else {
      console.log('condition: EXITING FULLSCREEN')
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      aspectRatio = initialAspectRatio;
      containerWidth = canvasWidth;
      containerHeight = canvasHeight;
      console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`)
    }
    p.resizeCanvas(canvasWidth, canvasHeight);
  };
}
