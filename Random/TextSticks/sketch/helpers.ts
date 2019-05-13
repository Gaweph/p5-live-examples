class Helpers {
    
   static canvasTolines(canvas: HTMLCanvasElement) {
    var data = canvas.getContext('2d').getImageData(0, 0, width, height).data;
    // for (var x = 0; x < bounds.w * 1.5; x += dotGap) {
    //   for (var y = bounds.h; y > -bounds.h * 2; y -= dotGap) {
  
    var lines: {line: { pointA: p5.Vector, pointB: p5.Vector }, color: p5.Color}[] = [];
    for (var x = 0; x < canvas.width; x += dotGap) {
  
      var lineStart: p5.Vector = null;
      var lineEnd: p5.Vector = null;
      var colorStart: p5.Color = null;
  
      for (var y = 0; y < canvas.height; y += dotGap) {
        var i = (y * canvas.width + x) * 4;
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var alpha = data[i+3];
        var pointInShape = (red != 0 || green != 0 || blue != 0  || alpha != 0);
        var c = color(red, green, blue, alpha);
        var v = createVector(x, y);
          if (pointInShape) {
            //linePoints.push(v);
  
            if (lineStart == null) {
              lineStart = v;
              colorStart = c;
            }
            else {
              lineEnd = v;
            }
  
          }
          else {
            // not in shape
            if (lineStart && lineEnd) {
              // we have a line
              lines.push({ line: {pointA: lineStart, pointB: lineEnd }, color: colorStart});
            }
  
            //reset line
            lineStart = null;
            lineEnd = null;
          }
        }
      }
    return lines;
  }
  
  static canvasToPoints(canvas: HTMLCanvasElement): {pos: p5.Vector, color: p5.Color}[] {
    var data = canvas.getContext('2d').getImageData(0, 0, width, height).data;
    // for (var x = 0; x < bounds.w * 1.5; x += dotGap) {
    //   for (var y = bounds.h; y > -bounds.h * 2; y -= dotGap) {
  
    var res: {pos: p5.Vector, color: p5.Color}[] = [];
    for (var y = 0; y < canvas.height; y += dotGap) {
      for (var x = 0; x < canvas.width; x += dotGap) {
        var i = (y * canvas.width + x) * 4;
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var alpha = data[i+3];
        if(red != 0 || green != 0 || blue != 0  || alpha != 0) {
          var c = color(red, green, blue, alpha);
          res.push({pos: createVector(x,y), color: c});
        }
      }
    }
  
    return res;
  }
  
  static pointHorizontallyOut(x: number, shapePoints: p5.Vector[]) {
  
    return false;
    // if point is totally out horizontally
    var right = shapePoints.filter(v => v.x < x); // all to the right
    var left = shapePoints.filter(v => v.x > x); // all to the left
  
    return right.length == 0 || left.length == 0;
  }
  static pointVerticallyOut(y: number, shapePoints: p5.Vector[]) {
  
    return false;
    // if point is totally out vertically
    var top = shapePoints.filter(v => v.y < y);
    var bottom = shapePoints.filter(v => v.y > y);
  
    return top.length == 0 || bottom.length == 0;
  }
  
  static pointInShape(p: p5.Vector, shapePoints: p5.Vector[]) {
    var a = 0;
  
    for (var i = 0; i < shapePoints.length - 1; ++i) {
      var v1 = shapePoints[i];
      var v2 = shapePoints[i + 1];
      a += Helpers.vAtan2cent180(p, v1, v2);
    }
    var v1 = shapePoints[shapePoints.length - 1];
    var v2 = shapePoints[0];
    a += Helpers.vAtan2cent180(p, v1, v2);
    //  if (a < 0.001) println(degrees(a));
  
    if (abs(abs(a) - TWO_PI) < 0.01) return 1;
    else return 0;
  }
  
  static vAtan2cent180(cent: p5.Vector, v2: p5.Vector, v1: p5.Vector) {
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
  
  static overlap(lineA: { a: p5.Vector, b: p5.Vector }, lineB: { a: p5.Vector, b: p5.Vector }): p5.Vector {
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
}