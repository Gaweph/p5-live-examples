// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

var angle = 0;
var growth  = 100;
var sliderAngle: any;
// var sliderBranches: any;

var sketch = (p: p5) => {
  p.preload = () => {

  }
  
  p.setup = () => {
    p.createCanvas(400, 400);
    sliderAngle = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
    // sliderBranches = p.createSlider(1, 50, 4);
  }
  
  p.windowResized = () => {
      // p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  
  p.draw = () => {
    p.background(51);
    angle = sliderAngle.value();
    p.stroke(p.color(255));
    p.translate(200, p.height);
    // var threshold = sliderBranches.value();
    growth -= 1;
    if(growth < 4) {
      growth = 4;
    }
    this.branch(100, growth);   
  }

  this.branch = (len: number, threshold: number) => {
    p.line(0, 0, 0, -len);
    p.translate(0, -len);
    if (len > threshold) {
      p.push();
      p.rotate(angle);
      this.branch(len * 0.67, threshold);
      p.pop();
      p.push();
      p.rotate(-angle);
      this.branch(len * 0.67, threshold);
      p.pop();
    }
  
  }
}

var sketchP = new p5(sketch);