var font;
function preload() {
    font = loadFont('/public/Digitalt.ttf');
}
var points;
var bounds;
var pairs;
function setup() {
    createCanvas(displayWidth, displayHeight);
    stroke(0);
    fill(255, 104, 204);
    bounds = font.textBounds(' Hello ', 0, 0, 200);
    points = font.textToPoints('Hello', 0, 0, 200, {
        sampleFactor: 5,
        simplifyThreshold: 0
    });
}
function draw() {
    background(255);
    push();
    translate(100, bounds.h);
    rect(0, 0, bounds.w, -bounds.h);
    beginShape();
    strokeWeight(1);
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        vertex(p.x, p.y);
    }
    endShape(CLOSE);
    strokeWeight(1);
    pop();
}
function pointInShape(p, shapePoint) {
    var a = 0;
    for (var i = 0; i < shapePoint.length - 1; ++i) {
        var v1 = shapePoint[i];
        var v2 = shapePoint[i + 1];
        a += vAtan2cent180(p, v1, v2);
    }
    var v1 = shapePoint[shapePoint.length - 1];
    var v2 = shapePoint[0];
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
