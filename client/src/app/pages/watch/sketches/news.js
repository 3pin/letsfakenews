import Aspect from './functions/aspect';
import Layout from './functions/layout';

export default function sketch(P) {
  const p = P;
  let initialWidth = 534;
  let initialHeight = 300;
  let canvasWidth;
  let canvasHeight;
  let setupCount = 0;
  const initialAspectRatio = 1.78;
  let aspectRatio = initialAspectRatio;
  let playedSeconds = 0;
  const fps = 60;
  // const corsUrl = 'https://cors-anywhere.herokuapp.com/';
  // const corsUrl = 'http://localhost:8080/';
  let corsUrl;
  let imgUrl;
  let containerWidth;
  let containerHeight;
  let title;
  let story;
  let storyLength;
  let storyXpos;
  let storyXinc;
  let font;
  const fontUrl = './Arial.ttf';
  let img;
  let previousImg = '';
  let imgWidth;
  let imgHeight;
  let timings = {};
  let textLayout = {
    borderFactor: 0.01,
    yOffsetFactor: 0.755,
    heightFactor: 0.143,
    textFrame_xOrigin: undefined,
    textFrame_yOrigin: undefined,
    textFrame_Width: undefined,
    textFrame_Height: undefined,
    textFrame_Border: undefined,
    fontSize: undefined,
  };
  let imageLayout = {
    borderFactor: 0.02,
    xOffsetFactor: 0.0,
    heightFactor: 0.77,
    widthFactor: 0.58,
    imageFrame_Xoffset: undefined,
    imageFrame_xOrigin: undefined,
    imageFrame_yOrigin: undefined,
    imageFrame_Width: undefined,
    imageFrame_Height: undefined,
    imageFrame_Border: undefined,
    image_Xcentre: undefined,
    image_Ycentre: undefined,
  };
  //
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    // console.log("PROPS received...");
    if (props.componentWidth && props.timings && setupCount < 1) {
      setupCount = 1;
      timings = props.timings;
      initialWidth = props.componentWidth;
      initialHeight = Math.round(props.componentWidth / aspectRatio);
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      containerWidth = canvasWidth;
      containerHeight = canvasHeight;
      // console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`)
      p.resizeCanvas(initialWidth, initialHeight);
      ({ imageLayout, textLayout } = Layout(
        imageLayout,
        textLayout,
        aspectRatio,
        canvasWidth,
        canvasHeight,
        containerWidth,
        containerHeight,
      ));
    } else {
      if (props.playedSeconds) {
        playedSeconds = props.playedSeconds;
        // console.log(playedSeconds);
      }
      if (props.image) {
        // console.log(props.image);
        if (props.image !== previousImg) {
          previousImg = props.image;
          imgUrl = corsUrl + props.image;
          if (props.imageCaching) {
            console.log('loading image to cache...');
            // loadImages into cache before needed
            img = p.loadImage(imgUrl, () => {
              // tell parent that: image is cached so send on the next one
              props.imageInc('DONE');
            }, () => {
              console.log('Loading to cache failed');
              props.imageInc('DONE');
            });
          } else {
            // loadImages according to markers
            img = p.loadImage(imgUrl, (image) => {
              ({ imgWidth, imgHeight } = Aspect(
                image,
                imageLayout.imageFrame_Width / imageLayout.imageFrame_Height,
                imageLayout.imageFrame_Width,
                imageLayout.imageFrame_Height,
              ));
            }, () => {
              console.log('Loading failed');
            });
          }
        }
      }
      if (props.title) {
        if (title !== props.title) {
          title = props.title;
        }
      }
      if (props.corsAnywhere) {
        corsUrl = props.corsAnywhere;
      }
      if (props.story) {
        if (story !== props.story) {
          story = props.story;
          console.log(`containerWidth ${containerWidth}`);
          p.textSize(textLayout.fontSize);
          storyLength = Math.round(p.textWidth(story));
          console.log(`storyLength ${storyLength}`);
          const totalLength = Math.round(containerWidth + storyLength);
          console.log(`totalLength ${totalLength}`);
          console.log(`fps ${fps}`);
          const noFrames = fps * timings.imagesDuration;
          console.log(`noFrames ${noFrames}`);
          const inc = 1.0 * (totalLength / noFrames).toFixed(2);
          console.log(`inc ${inc}`);
          /* no need for rounding as it puts timings out */
          // storyXinc = Math.ceil(inc);
          storyXinc = inc;
          console.log(`storyXinc ${storyXinc}`);
          storyXpos = containerWidth;
        }
      }
    }
  };
  p.setup = () => {
    // console.log(`SETUP started...`);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    containerWidth = canvasWidth;
    containerHeight = canvasHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    p.rectMode(p.CORNER);
    p.imageMode(p.CENTER);
    p.smooth();
    font = p.loadFont(fontUrl);
    p.textFont(font);
  };
  p.draw = () => {
    if (setupCount > 0) {
      p.clear();
      p.push();
      const translateX = Math.round(canvasWidth - containerWidth) / 2;
      const translateY = Math.round(canvasHeight - containerHeight) / 2;
      p.translate(translateX, translateY);
      if (playedSeconds > timings.popupStart && playedSeconds < timings.popupEnd
      ) {
        /* title */
        p.noStroke();
        p.fill(0);
        p.textSize(textLayout.fontSize);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(
          title,
          Math.round(textLayout.textFrame_Width / 2),
          textLayout.textFrame_yOrigin + Math.round(textLayout.textFrame_Height / 2),
        );
      } else if (playedSeconds > timings.imagesStart && playedSeconds < timings.imagesEnd
      ) {
        /* image */
        p.image(
          img,
          imageLayout.image_Xcentre,
          imageLayout.image_Ycentre,
          imgWidth,
          imgHeight,
        );
        /* story */
        p.noStroke();
        p.fill(0);
        p.textSize(textLayout.fontSize);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(
          story,
          storyXpos,
          textLayout.textFrame_yOrigin + Math.round(textLayout.textFrame_Height / 2),
        );
        storyXpos -= storyXinc;
      }
      p.pop();
    }
  };
  window.onresize = () => {
    console.log('resize clicked');
    if (!window.screenTop && !window.screenY) {
      console.log('condition: ENTERING FULLSCREEN');
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
      aspectRatio = window.screen.width / window.screen.height;
      if (aspectRatio < initialAspectRatio) {
        containerWidth = canvasWidth;
        containerHeight = Math.round(canvasWidth / initialAspectRatio);
      } else {
        containerHeight = canvasHeight;
        containerWidth = Math.round(canvasHeight / initialAspectRatio);
      }
      console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`);
    } else {
      console.log('condition: EXITING FULLSCREEN');
      canvasWidth = initialWidth;
      canvasHeight = initialHeight;
      aspectRatio = initialAspectRatio;
      containerWidth = canvasWidth;
      containerHeight = canvasHeight;
      console.log(`containerWidth:${containerWidth} containerHeight:${containerHeight}`);
    }
    p.resizeCanvas(canvasWidth, canvasHeight);
    ({ imageLayout, textLayout } = Layout(
      imageLayout,
      textLayout,
      aspectRatio,
      canvasWidth,
      canvasHeight,
      containerWidth,
      containerHeight,
    ));
  };
}
