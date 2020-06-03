// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/H81Tdrmz2LA
// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

// var p = new p5();

let canvasWidth = 400;
let canvasHeight = 400;
let angle = 0;
let w = 24;
let ma;
let maxD;
let minHeight = 100;
let maxHeight = 300;

var leftBuffer;
var rightBuffer;
var pg;
var speed = 0.06;

var heightsColors;
var rowColors;
function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 200, 200);

  var button = createButton("Toggle RAINBOW");
  button.position(0, 0);
  button.mousePressed(toggleRainbow);

  let cols = canvasHeight / w;
  let rows = canvasHeight / w;
  heightsColors = ColorHelper.getColorsArray(maxHeight - minHeight);
  rowColors = ColorHelper.getColorsArray(rows);
}

let showRainbowColors = false;
function draw() {
  background(100);

  ortho(-400, 400, 400, -400, 0, 1000);
  rotateX(-ma);
  rotateY(-QUARTER_PI);

  // lighting copied from Davenewt's variant: https://codepen.io/anon/pen/wprwdP?editors=0010
  //colorMode(HSB);
  pointLight(255, 255, 255, 0, 0, 400);
  pointLight(100, 50, 100, -300, -300, canvasHeight / 2);
  directionalLight(150, 150, 150, -0.8, -0.8, 0);

  for (let z = 0; z < canvasHeight; z += w) {
    for (let x = 0; x < canvasHeight; x += w) {
      push();

      let d = dist(x, z, canvasHeight / 2, canvasHeight / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = mapHeight(a);

      if (showRainbowColors) {
        let heightColor = heightsColors[h - minHeight];
        ambientMaterial(heightColor);
      } else {
        let row = floor(z / w);
        let rowColor = rowColors[row];
        ambientMaterial(rowColor);
      }
      translate(x - canvasHeight / 2, 0, z - canvasHeight / 2);
      box(w, h, w);

      pop();
    }
  }
  angle -= speed;
}

var toggleRainbow = () => {
  showRainbowColors = !showRainbowColors;
};

var mapHeight = (angle) => {
  return floor(map(sin(angle), -1, 1, minHeight, maxHeight));
};
