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
    for (var i_1 = 0; i_1 < points.length; i_1++) {
        var p = points[i_1];
        vertex(p.x, p.y);
    }
    endShape(CLOSE);
    strokeWeight(5);
    for (var i = 0; i < 10; i++) {
        point(i * 10, -i * 10);
        var v = createVector(i * 10, -i * 10);
        if (pointInShape(v, points) == 1) {
            ellipse(v.x, v.y, 15, 15);
        }
    }
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
