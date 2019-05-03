var font;
function preload() {
    font = loadFont('/public/Digitalt.ttf');
}
var points;
var bounds;
var pairs;
var linePoints;
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
    rect(0, 0, bounds.w, -bounds.h);
    beginShape();
    strokeWeight(1);
    for (var i_1 = 0; i_1 < points.length; i_1++) {
        var p = points[i_1];
        vertex(p.x, p.y);
    }
    endShape(CLOSE);
    strokeWeight(1);
    for (var i = 0; i < linePoints.length; i++) {
        circle(linePoints[i].x, linePoints[i].y, 2);
    }
    pop();
}
function pointInShape(p, shapePoints) {
    var a = 0;
    var right = shapePoints.filter(function (v) { return v.x < p.x; });
    var left = shapePoints.filter(function (v) { return v.x > p.x; });
    var top = shapePoints.filter(function (v) { return v.y < p.y; });
    var bottom = shapePoints.filter(function (v) { return v.y > p.y; });
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
