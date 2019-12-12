export default function sketch(p) {
  let w = window.innerWidth;
  let h = window.innerHeight;

  p.preload = () => {
    //p.loadFont("../fonts/SourceSansPro-Regular.otf");
  };
  p.setup = () => {
    // setup canvas
    p.canvas = p.createCanvas(w, h, p.WEBGL);
    p.canvas.parent("innerContainer");
    // Set text characteristics
    //p.textFont("Arial");
    p.textSize(32);
    //p.textAlign('LEFT','LEFT');
  };
  window.onresize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    p.canvas.size(w, h);
  };
  p.draw = () => {
    p.background(100);
    p.fill(0);
    //p.noStroke();
    //p.rect.style('z-index', '1');
    p.rect(-w/16, -w/16, w/8, h/8);
    //p.text.style('z-index', '2');
    //p.text("Hello", 0, 0);
  };
  p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    if (p.canvas) //Make sure the canvas has been created
      p.fill(Number(newProps.color));
      p.rect(-w/16, -w/16, w/8, h/8);
      console.log(Number(newProps.color))
  }
}
