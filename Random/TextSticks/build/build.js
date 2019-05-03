var font;
function preload() {
    font = loadFont('/public/Digitalt.ttf');
}
var points;
var bounds;
function setup() {
    createCanvas(displayWidth, displayHeight);
    stroke(0);
    fill(255, 104, 204);
    points = font.textToPoints('Hello World', 0, 0, 100, {
        sampleFactor: 5,
        simplifyThreshold: 0
    });
    bounds = font.textBounds(' Hello World ', 0, 0, 100);
}
function draw() {
    background(255);
    beginShape();
    translate(0, bounds.h);
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        point(p.x, p.y);
    }
    endShape(CLOSE);
}
