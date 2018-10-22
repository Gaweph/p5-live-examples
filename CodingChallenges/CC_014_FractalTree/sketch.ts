// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

var angle = 0;
var slider: any;

var sketch = (p: p5) => {
  p.preload = () => {

  }
  
  p.setup = () => {
    p.createCanvas(400, 400);
    slider = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
  }
  
  p.windowResized = () => {
      // p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  
  p.draw = () => {
    p.background(51);
    angle = slider.value();
    p.stroke(p.color(255));
    p.translate(200, p.height);
    this.branch(100);   
  }

  this.branch = (len: number) => {
    p.line(0, 0, 0, -len);
    p.translate(0, -len);
    if (len > 4) {
      p.push();
      p.rotate(angle);
      this.branch(len * 0.67);
      p.pop();
      p.push();
      p.rotate(-angle);
      this.branch(len * 0.67);
      p.pop();
    }
  
    //line(0, 0, 0, -len * 0.67);
  }
}

var sketchP = new p5(sketch);