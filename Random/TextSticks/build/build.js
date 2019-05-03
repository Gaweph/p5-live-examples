var font;
function preload() {
    font = loadFont('/public/Digitalt.ttf');
}
var points;
var bounds;
var lines;
function setup() {
    createCanvas(displayWidth, displayHeight);
    stroke(0);
    fill(255, 104, 204);
    bounds = font.textBounds(' Hello ', 0, 0, 200);
    points = font.textToPoints('Hello', 0, 0, 200, {
        sampleFactor: 1,
        simplifyThreshold: 0
    });
    lines = [];
    var lineGap = 10;
    for (var x = 0; x < bounds.w * 1.5; x += lineGap) {
        if (!pointHorizontallyOut(x, points)) {
            var lineStart = null;
            var lineEnd = null;
            for (var y = bounds.h; y > -bounds.h * 2; y -= lineGap) {
                if (!pointVerticallyOut(y, points)) {
                    var v = createVector(x, y);
                    if (pointInShape(v, points) == 1) {
                        if (lineStart == null) {
                            lineStart = v;
                        }
                        else {
                            lineEnd = v;
                        }
                    }
                    else {
                        if (lineStart && lineEnd) {
                            lines.push({ a: lineStart, b: lineEnd });
                        }
                        lineStart = null;
                        lineEnd = null;
                    }
                }
            }
        }
    }
    console.log(lines);
}
function draw() {
    background(255);
    push();
    translate(100, bounds.h);
    strokeWeight(1);
    for (var i = 0; i < lines.length; i++) {
        line(lines[i].a.x, lines[i].a.y, lines[i].b.x, lines[i].b.y);
    }
    pop();
}
function pointHorizontallyOut(x, shapePoints) {
    return false;
    var right = shapePoints.filter(function (v) { return v.x < x; });
    var left = shapePoints.filter(function (v) { return v.x > x; });
    return right.length == 0 || left.length == 0;
}
function pointVerticallyOut(y, shapePoints) {
    return false;
    var top = shapePoints.filter(function (v) { return v.y < y; });
    var bottom = shapePoints.filter(function (v) { return v.y > y; });
    return top.length == 0 || bottom.length == 0;
}
function pointInShape(p, shapePoints) {
    var a = 0;
    for (var i = 0; i < shapePoints.length - 1; ++i) {
        var v1 = shapePoints[i];
        var v2 = shapePoints[i + 1];
        a += vAtan2cent180(p, v1, v2);
    }
    var v1 = shapePoints[shapePoints.length - 1];
    var v2 = shapePoints[0];
    a += vAtan2cent180(p, v1, v2);
    if (abs(abs(a) - TWO_PI) < 0.01)
        return 1;
    else
        return 0;
}
function vAtan2cent180(cent, v2, v1) {
    var vA = createVector(v1.x, v1.y);
    var vB = createVector(v2.x, v2.y);
    vA.sub(cent);
    vB.sub(cent);
    vB.mult(-1);
    var ang = atan2(vB.x, vB.y) - atan2(vA.x, vA.y);
    if (ang < 0)
        ang = TWO_PI + ang;
    ang -= PI;
    return ang;
}
