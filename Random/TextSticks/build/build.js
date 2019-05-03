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
    bounds = font.textBounds('A', 0, 0, 200);
    points = font.textToPoints('A', 0, 0, 200, {
        sampleFactor: 5,
        simplifyThreshold: 0
    });
}
function draw() {
    background(255);
    translate(100, 100 + bounds.h);
    stroke(10);
    for (var i = 0; i < 100; i++) {
        line(i + bounds.x, -10 + -bounds.h, i + bounds.x, 10);
    }
    stroke(200);
    for (var i_1 = 0; i_1 < points.length; i_1++) {
        var p = points[i_1];
        beginShape();
        vertex(p.x, p.y);
        endShape(CLOSE);
    }
}
