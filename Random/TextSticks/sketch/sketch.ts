let font: p5.Font;
function preload() {
  font = loadFont('/public/Digitalt.ttf');
}

let points: p5.Vector[];
let bounds: any;
var pairs: { a: p5.Vector, b: p5.Vector }[];

var linePoints: p5.Vector[];
function setup() {
  createCanvas(displayWidth, displayHeight);
  stroke(0);
  fill(255, 104, 204);

  bounds = font.textBounds(' foo ', 0, 0, 200);

  points = font.textToPoints('foo', 0, 0, 200, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });

  linePoints = [];
  for (var x = 0; x < bounds.w * 1.5; x += 10) {
    for (var y = bounds.h; y > -bounds.h * 2; y -= 10) {

      var v = createVector(x, y);
      if (pointInShape(v, points) == 1) {
        linePoints.push(v);
      }
    }
  }

  console.log(linePoints);
}

function draw() {
  background(255);

  push();
  translate(100, bounds.h);
  // box around whole phrase 
  rect(0, 0, bounds.w, -bounds.h);
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  strokeWeight(1);

  for (var i = 0; i < linePoints.length; i++) {
    circle(linePoints[i].x, linePoints[i].y, 2);
  }

  pop();
}

function pointInShape(p: p5.Vector, shapePoints: p5.Vector[]) {
  var a = 0;

  // if point is totally out horizontally
  var right = shapePoints.filter(v => v.x < p.x); // all to the right
  var left = shapePoints.filter(v => v.x > p.x); // all to the left

  var top = shapePoints.filter(v => v.y < p.y);
  var bottom = shapePoints.filter(v => v.y > p.y);

  if (right.length == 0 || left.length == 0 || top.length == 0 || bottom.length == 0) {
    return false;
  }

  for (var i = 0; i < shapePoints.length - 1; ++i) {
    var v1 = shapePoints[i];
    var v2 = shapePoints[i + 1];
    a += vAtan2cent180(p, v1, v2);
  }
  var v1 = shapePoints[shapePoints.length - 1];
  var v2 = shapePoints[0];
  a += vAtan2cent180(p, v1, v2);
  //  if (a < 0.001) println(degrees(a));

  if (abs(abs(a) - TWO_PI) < 0.01) return 1;
  else return 0;
}

function vAtan2cent180(cent: p5.Vector, v2: p5.Vector, v1: p5.Vector) {
  var vA = createVector(v1.x, v1.y);
  var vB = createVector(v2.x, v2.y);
  vA.sub(cent);
  vB.sub(cent);
  vB.mult(-1);
  var ang = atan2(vB.x, vB.y) - atan2(vA.x, vA.y);
  if (ang < 0) ang = TWO_PI + ang;
  ang -= PI;
  return ang;
}