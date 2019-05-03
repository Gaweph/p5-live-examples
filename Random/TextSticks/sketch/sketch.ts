let font: p5.Font;
function preload() {
  font = loadFont('/public/Digitalt.ttf');
}

let points: p5.Vector[];
let bounds: any;
var pairs: { a: p5.Vector, b: p5.Vector }[];
function setup() {
  createCanvas(displayWidth, displayHeight);
  stroke(0);
  fill(255, 104, 204);

  bounds = font.textBounds('Q', 0, 0, 200);

  points = font.textToPoints('Q', 0, 0, 200, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });

}

function draw() {
  background(255);

  push();
  translate(100, 100 + bounds.h);
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    vertex(p.x, p.y);
  }
  endShape(CLOSE);

  strokeWeight(5);

  for (var i = 0; i < 10; i++) {
    point(i * 10, - i * 10);
    // var tmp = pointInPolygonx(1 * 10, -i * 10);
    var v = createVector(i * 10, - i * 10);
    if (pointInShape(v, points) == 1) {
      ellipse(v.x, v.y, 15, 15);
    }

    // if (tmp) {
    //   console.log(tmp);
    // }
  }

  pop();
}

// function pointInPolygonx(x: number, y: number) {


//   var i = polyCorners - 1;
//   var j = polyCorners - 1;

//   var oddNodes = false;

//   for (i = 0; i < polyCorners; i++) {
//     if ((polyY[i] < y && polyY[j] >= y
//       || polyY[j] < y && polyY[i] >= y)
//       && (polyX[i] <= x || polyX[j] <= x)) {
//       oddNodes || (polyX[i] + (y - polyY[i]) / (polyY[j] - polyY[i]) * (polyX[j] - polyX[i]) < x);
//     }
//     j = i;
//   }

//   return oddNodes;
// }

//  Globals which should be set before calling these functions:
//
//  int    polyCorners  =  how many corners the polygon has (no repeats)
//  float  polyX[]      =  horizontal coordinates of corners
//  float  polyY[]      =  vertical coordinates of corners
//  float  x, y         =  point to be tested
//
//  The following global arrays should be allocated before calling these functions:
//
//  float  constant[] = storage for precalculated constants (same size as polyX)
//  float  multiple[] = storage for precalculated multipliers (same size as polyX)
//
//  (Globals are used in this example for purposes of speed.  Change as
//  desired.)
//
//  USAGE:
//  Call precalc_values() to initialize the constant[] and multiple[] arrays,
//  then call pointInPolygon(x, y) to determine if the point is in the polygon.
//
//  The function will return YES if the point x,y is inside the polygon, or
//  NO if it is not.  If the point is exactly on the edge of the polygon,
//  then the function may return YES or NO.
//
//  Note that division by zero is avoided because the division is protected
//  by the "if" clause which surrounds it.


// var polyCorners: number;
// var polyX: number[];
// var polyY: number[];
// var constant: number[];
// var multiple: number[];
// function precalc_values() {

//   constant = [];
//   multiple = [];

//   var i = polyCorners - 1;
//   var j = polyCorners - 1;

//   for (i = 0; i < polyCorners; i++) {
//     if (polyY[j] == polyY[i]) {
//       constant[i] = polyX[i];
//       multiple[i] = 0;
//     }
//     else {
//       constant[i] = polyX[i] - (polyY[i] * polyX[j]) / (polyY[j] - polyY[i]) + (polyY[i] * polyX[i]) / (polyY[j] - polyY[i]);
//       multiple[i] = (polyX[j] - polyX[i]) / (polyY[j] - polyY[i]);
//     }
//     j = i;
//   }
// }

// function pointInPolygon(x: number, y: number): boolean {

//   var polyCorners = points.length;
//   var polyX = points.map(p => p.x);
//   var polyY = points.map(p => p.y);

//   var i = polyCorners - 1;
//   var j = polyCorners - 1;
//   var oddNodes = false;

//   for (i = 0; i < polyCorners; i++) {
//     if ((polyY[i] < y && polyY[j] >= y
//       || polyY[j] < y && polyY[i] >= y)) {
//       oddNodes || (y * multiple[i] + constant[i] < x);
//     }
//     j = i;
//   }

//   return oddNodes;
// }

function pointInShape(p: p5.Vector, shapePoint: p5.Vector[]) {
  var a = 0;
  for (var i = 0; i < shapePoint.length - 1; ++i) {
    var v1 = shapePoint[i];
    var v2 = shapePoint[i + 1];
    a += vAtan2cent180(p, v1, v2);
  }
  var v1 = shapePoint[shapePoint.length - 1];
  var v2 = shapePoint[0];
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