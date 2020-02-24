import Aspect from "./functions/aspect";

export default function sketch(p) {
  let initialWidth = 534;
  let initialHeight = 300;
  let canvasWidth, canvasHeight;
  let setupCount = 0;
  let initialAspectRatio = 1.78;
  let aspectRatio = initialAspectRatio;
  let containerWidth, containerHeight;
  let playedSeconds = 0;
  let textFrame_xOrigin, textFrame_yOrigin, textFrame_Width, textFrame_Height, textFrame_Border;
  let imgUrl = "../../../images/bgd.jpg";
  let img, imgWidth, imgHeight, image_Xcentre, image_Ycentre;
  let imageFrame_Xoffset, imageFrame_xOrigin, imageFrame_yOrigin, imageFrame_Width, imageFrame_Height, imageFrame_Border;
  let xOffsetFactor = 0.025
  let imageBorder = 0.02
  let imageHeightFactory = 0.77
  let textBorderFactor = 0.01
  let textHeightFactor = 0.15
  //
  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    //console.log("PROPS received...");
    if (props.componentWidth && setupCount < 1) {
      setupCount = setupCount + 1;
      initialWidth = props.componentWidth;
      /* A value of 1.78 sets starting aspect_ratio @16:9 */
      initialHeight = Math.round((props.componentWidth / aspectRatio));
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      containerWidth = canvasWidth;
      containerHeight = canvasHeight;
      console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`)
      p.resizeCanvas(initialWidth, initialHeight);
      //
      imageFrame_Xoffset = Math.round(canvasWidth * xOffsetFactor); /* set image in from left edge */
      imageFrame_Border = Math.round(canvasWidth * imageBorder); /* set image in from all edges */
      imageFrame_xOrigin = imageFrame_Xoffset + Math.round((canvasWidth - containerWidth) / 2) + imageFrame_Border;
      imageFrame_yOrigin = Math.round((canvasHeight - containerHeight) / 2) + imageFrame_Border;
      imageFrame_Width = imageFrame_Xoffset + Math.round(canvasWidth / 2) - Math.round(2 * imageFrame_Border);
      imageFrame_Height = Math.round(containerHeight * imageHeightFactory) - Math.round(2 * imageFrame_Border);
      image_Xcentre = imageFrame_xOrigin + Math.round(imageFrame_Width / 2);
      image_Ycentre = imageFrame_yOrigin + Math.round(imageFrame_Height / 2);
      //
      textFrame_Border = Math.round(canvasWidth * textBorderFactor); /* set text in from all edges */
      textFrame_xOrigin = Math.round((canvasWidth - containerWidth) / 2) + textFrame_Border;
      textFrame_yOrigin = Math.round(containerHeight * imageHeightFactory) + textFrame_Border;
      textFrame_Width = containerWidth + Math.round((canvasWidth - containerWidth) / 2) - Math.round(2 * textFrame_Border);
      textFrame_Height = Math.round(containerHeight * textHeightFactor) - Math.round(2 * textFrame_Border);
      //
    }
    if (props.playedSeconds) {
      playedSeconds = props.playedSeconds;
      //console.log(playedSeconds);
    }
    if (props.image) {
      if (imgUrl !== props.image) {
        imgUrl = props.image;
        console.log(`imgUrl: ${imgUrl}`);
        img = p.loadImage(imgUrl, (img) => {
          ({
            imgWidth,
            imgHeight
          } = Aspect(img, imageFrame_Width / imageFrame_Height, imageFrame_Width, imageFrame_Height));
        });
      }
    }
  };
  p.setup = () => {
    console.log(`SETUP started... imgUrl: ${imgUrl}`);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    containerWidth = canvasWidth;
    containerHeight = canvasHeight;
    //console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`)
    p.createCanvas(canvasWidth, canvasHeight);
    p.stroke(0, 0, 255);
    p.noFill();
    p.rectMode(p.CORNER);
    p.imageMode(p.CENTER);
  };
  p.draw = () => {
    p.noSmooth();
    /* visible: title */
    if (playedSeconds > 6.2 && playedSeconds < 11.3) {
      /* titleBGD */
      p.rect(textFrame_xOrigin, textFrame_yOrigin, textFrame_Width, textFrame_Height);
    }
    /* visible: text & image */
    else if (playedSeconds > 17.6 && playedSeconds < 41.1) {
      /* textBGD */
      p.rect(textFrame_xOrigin, textFrame_yOrigin, textFrame_Width, textFrame_Height);
      /* imageBGD */
      p.fill(50);
      p.rect(imageFrame_xOrigin, imageFrame_yOrigin, imageFrame_Width, imageFrame_Height);
      p.noFill();
      //console.log(`imgWidth:${imgWidth} imgHeight:${imgHeight}`)
      p.image(img, image_Xcentre, image_Ycentre, imgWidth, imgHeight);
    }
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
    //
    imageFrame_Xoffset = Math.round(canvasWidth * xOffsetFactor); /* set image in from left edge */
    imageFrame_Border = Math.round(canvasWidth * imageBorder); /* set image in from all edges */
    imageFrame_xOrigin = imageFrame_Xoffset + Math.round((canvasWidth - containerWidth) / 2) + imageFrame_Border;
    imageFrame_yOrigin = Math.round((canvasHeight - containerHeight) / 2) + imageFrame_Border;
    imageFrame_Width = imageFrame_Xoffset + Math.round(canvasWidth / 2) - Math.round(2 * imageFrame_Border);
    imageFrame_Height = Math.round(containerHeight * imageHeightFactory) - Math.round(2 * imageFrame_Border);
    image_Xcentre = imageFrame_xOrigin + Math.round(imageFrame_Width / 2);
    image_Ycentre = imageFrame_yOrigin + Math.round(imageFrame_Height / 2);
    //
    textFrame_Border = Math.round(canvasWidth * textBorderFactor); /* set text in from all edges */
    textFrame_xOrigin = Math.round((canvasWidth - containerWidth) / 2) + textFrame_Border;
    textFrame_yOrigin = Math.round(containerHeight * imageHeightFactory) + textFrame_Border;
    textFrame_Width = containerWidth + Math.round((canvasWidth - containerWidth) / 2) - Math.round(2 * textFrame_Border);
    textFrame_Height = Math.round(containerHeight * textHeightFactor) - Math.round(2 * textFrame_Border);
    //
  };
}
