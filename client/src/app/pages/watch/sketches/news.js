import Aspect from './functions/aspect';
import Layout from './functions/layout';

export default function sketch(P) {
  const p = P;
  let initialWidth = 534;
  let initialHeight = 300;
  let canvasWidth;
  let canvasHeight;
  let runDraw = 'STOP';
  const initialAspectRatio = 1.78;
  let aspectRatio = initialAspectRatio;
  let playedSeconds = 0;
  const fps = 60;
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
    // console.log(`props.sketchState:${props.sketchState} props.image:${props.image}`);
    if (props.sketchState === 'META' && props.componentWidth && props.timings && props.corsAnywhere) {
      console.log(`CODE BLOCK: META`);
      runDraw = 'STOP';
      story = "";
      previousImg = "";
      corsUrl = props.corsAnywhere;
      timings = props.timings;
      props.sketchController("CACHE");
    } else if (props.sketchState === 'CACHE' && props.image) {
      console.log(`CODE BLOCK: CACHE`);
      if (props.image !== previousImg) {
        // console.log(`This is a new image:${imgUrl}`);
        previousImg = props.image;
        imgUrl = corsUrl + props.image;
        if (runDraw === 'STOP') {
          console.log('loading image to cache...');
          /* loadImages into cache before needed */
          img = p.loadImage(imgUrl, () => {
            /* tell parent that: image is cached so send on the next one */
            props.imageInc('DONE');
          }, () => {
            console.log('Loading to cache failed');
            props.imageInc('FAILED');
          });
        }
      }
    } else if (props.sketchState === 'TEXT' && props.story && props.title) {
      console.log(`CODE BLOCK: TEXT`);
      if (title !== props.title) {
        title = props.title;
      }
      if (story !== props.story) {
        console.log('Calculating text-durations');
        story = props.story;
        p.textSize(textLayout.fontSize);
        storyLength = Math.round(p.textWidth(story));
        const totalLength = Math.round(containerWidth + storyLength);
        const noFrames = fps * timings.imagesDuration;
        const inc = 1.75 * (totalLength / noFrames).toFixed(2);
        storyXinc = Math.ceil(inc);
        console.log(`inc:${inc} storyXinc:${storyXinc}`)
        /* reset scrolling-text to off-screen */
        storyXpos = containerWidth;
        props.sketchController('PLAY');
      }
    } else if (props.sketchState === 'PLAY' && props.playedSeconds) {
      console.log(`CODE BLOCK: PLAY`);
      runDraw = 'PLAY';
      playedSeconds = props.playedSeconds;
      // console.log(playedSeconds);
      /* loadImages according to markers */
      if (props.image !== previousImg) {
        console.log(`This is a new image:${imgUrl}`);
        previousImg = props.image;
        imgUrl = corsUrl + props.image;
        // console.log(`imgUrl:${imgUrl}`);
        img = p.loadImage(imgUrl, (image) => {
          ({
            imgWidth,
            imgHeight
          } = Aspect(
            image,
            imageLayout.imageFrame_Width / imageLayout.imageFrame_Height,
            imageLayout.imageFrame_Width,
            imageLayout.imageFrame_Height,
          ));
        }, () => {
          console.log('Loading failed');
        });
      }
    } else if (props.sketchState === 'STOP') {
      console.log(`CODE BLOCK: STOP`);
      runDraw = 'STOP';
    }
  };
  p.setup = () => {
    // console.log(`SKETCH SETUP started...`);
    canvasWidth = initialWidth;
    canvasHeight = initialHeight;
    containerWidth = canvasWidth;
    containerHeight = canvasHeight;
    p.createCanvas(canvasWidth, canvasHeight);
    p.rectMode(p.CORNER);
    p.imageMode(p.CENTER);
    //p.smooth();
    font = p.loadFont(fontUrl);
    p.textFont(font);
  };
  p.draw = () => {
    // console.log(`SKETCH DRAW started...`);
    if (runDraw === 'PLAY') {
      p.clear();
      p.push();
      const translateX = Math.round(canvasWidth - containerWidth) / 2;
      const translateY = Math.round(canvasHeight - containerHeight) / 2;
      p.translate(translateX, translateY);
      if (playedSeconds > timings.popupStart && playedSeconds < timings.popupEnd) {
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
      } else if (playedSeconds > timings.imagesStart && playedSeconds < timings.imagesEnd) {
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
    console.log('window resized');
    if (!window.screenTop && !window.screenY) {
      console.log('condition: ENTERING FULLSCREEN');
      canvasWidth = window.screen.width;
      canvasHeight = window.screen.height;
      console.log(`canvasWidth:${canvasWidth}, canvasHeight:${canvasHeight}`);
      aspectRatio = window.screen.width / window.screen.height;
      if (aspectRatio < initialAspectRatio) {
        containerWidth = canvasWidth;
        containerHeight = Math.round(canvasWidth / initialAspectRatio);
      } else {
        containerHeight = canvasHeight;
        containerWidth = Math.round(canvasHeight / initialAspectRatio);
      }
      console.log(`containerWidth:${containerWidth}, containerHeight:${containerHeight}`);
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
    ({
      imageLayout,
      textLayout
    } = Layout(
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
