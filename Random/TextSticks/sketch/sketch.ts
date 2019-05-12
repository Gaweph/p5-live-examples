let font: p5.Font;
function preload() {
  font = loadFont('/public/Digitalt.ttf');
}

let points: p5.Vector[];
let bounds: any;
var lines: { a: p5.Vector, b: p5.Vector }[];
var shapeLines: { a: p5.Vector, b: p5.Vector }[];
var overlapPoints: p5.Vector[];
var colors: p5.Color[];
function setup() {
  createCanvas(displayWidth, displayHeight);
  stroke(0);
  fill(255, 104, 204);

  console.time();

  bounds = font.textBounds(' Hello ', 0, 0, 200);

  points = font.textToPoints('Hello', 0, 0, 200, {
    sampleFactor: 1,
    simplifyThreshold: 0
  });

  shapeLines = [];
  overlapPoints = [];
  for (var i = 0; i < points.length - 1; i++) {

    // if (i == points.length - 1) {
    //   shapeLines.push({ a: points[i], b: points[0] });
    // }
    // else {
    shapeLines.push({ a: points[i], b: points[i + 1] });
    // }

  }

  // generate lines
  // lines = [];
  var lineGap = 10; // lower is more
  for (var x = 0; x < bounds.w * 1.5; x += lineGap) {

    // for (var y = bounds.h; y > -bounds.h * 2; y -= lineGap) {

    for (var l = 0; l < shapeLines.length; l++) {
      let res = overlap(shapeLines[l], { a: createVector(x, bounds.h), b: createVector(x, -1) });
      if (res != null) {
        overlapPoints.push(res);
      }
    }
    // }
    // if (!pointHorizontallyOut(x, points)) {

    //   var lineStart: p5.Vector = null;
    //   var lineEnd: p5.Vector = null;
    //   for (var y = bounds.h; y > -bounds.h * 2; y -= lineGap) {

    //     if (!pointVerticallyOut(y, points)) {

    //       var v = createVector(x, y);
    //       if (pointInShape(v, points) == 1) {
    //         //linePoints.push(v);

    //         if (lineStart == null) {
    //           lineStart = v;
    //         }
    //         else {
    //           lineEnd = v;
    //         }

    //       }
    //       else {
    //         // not in shape
    //         if (lineStart && lineEnd) {
    //           // we have a line
    //           lines.push({ a: lineStart, b: lineEnd });
    //         }

    //         //reset line
    //         lineStart = null;
    //         lineEnd = null;
    //       }
    //     }
    //   }
    // }
  }
  console.timeEnd();

  // colors = ColorHelper.getColorsArray(lines.length);
}

function draw() {
  background(255);

  push();
  translate(100, bounds.h);

  // box around whole phrase 
  // rect(0, 0, bounds.w, -bounds.h);

  // draw text
  // beginShape();
  // strokeWeight(1);
  // for (let i = 0; i < points.length; i++) {
  //   let p = points[i];
  //   vertex(p.x, p.y);
  // }
  // endShape(CLOSE);

  strokeWeight(1);


  for (var i = 0; i < shapeLines.length; i++) {
    line(shapeLines[i].a.x, shapeLines[i].a.y, shapeLines[i].b.x, shapeLines[i].b.y);
  }

  for (var i = 0; i < overlapPoints.length; i++) {
    circle(overlapPoints[i].x, overlapPoints[i].y, 2);
  }

  // for (var i = 0; i < lines.length; i++) {
  //   // circle(linePoints[i].x, linePoints[i].y, 2);
  //   stroke(colors[i]);
  //   line(lines[i].a.x, lines[i].a.y, lines[i].b.x, lines[i].b.y);
  // }

  pop();
}

function pointHorizontallyOut(x: number, shapePoints: p5.Vector[]) {

  return false;
  // if point is totally out horizontally
  var right = shapePoints.filter(v => v.x < x); // all to the right
  var left = shapePoints.filter(v => v.x > x); // all to the left

  return right.length == 0 || left.length == 0;
}
function pointVerticallyOut(y: number, shapePoints: p5.Vector[]) {

  return false;
  // if point is totally out vertically
  var top = shapePoints.filter(v => v.y < y);
  var bottom = shapePoints.filter(v => v.y > y);

  return top.length == 0 || bottom.length == 0;
}

function pointInShape(p: p5.Vector, shapePoints: p5.Vector[]) {
  var a = 0;

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

function overlap(lineA: { a: p5.Vector, b: p5.Vector }, lineB: { a: p5.Vector, b: p5.Vector }): p5.Vector {
  const x1 = lineA.a.x;
  const y1 = lineA.a.y;
  const x2 = lineA.b.x;
  const y2 = lineA.b.y;

  const x3 = lineB.a.x;
  const y3 = lineB.a.y;
  const x4 = lineB.b.x;
  const y4 = lineB.b.y;

  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (den == 0) {
    return null;
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
  if (t > 0 && t < 1 && u > 0) {
    const pt = createVector();
    pt.x = x1 + t * (x2 - x1);
    pt.y = y1 + t * (y2 - y1);
    return pt;
  } else {
    return null;
  }
}