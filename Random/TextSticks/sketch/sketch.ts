let font: p5.Font;
function preload() {
  font = loadFont('/public/Digitalt.ttf');
}

let points: p5.Vector[];
let bounds: any;
function setup() {
  createCanvas(displayWidth, displayHeight);
  stroke(0);
  fill(255, 104, 204);

  points = font.textToPoints('Hello World', 0, 0, 100, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(' Hello World ', 0, 0, 100);
}

function draw() {
  background(255);
  beginShape();
  translate(0, bounds.h);
  // translate(-bounds.x * width / bounds.w, -bounds.y * height / bounds.h);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    point(p.x,p.y);
    // vertex(
    //   p.x * width / bounds.w +
    //     sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,
    //   p.y * height / bounds.h
    // );
  }
  endShape(CLOSE);
}