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
        sampleFactor: 1,
        simplifyThreshold: 0
    });
    polyCorners = points.length;
    polyX = points.map(function (p) { return p.x; });
    polyY = points.map(function (p) { return p.y; });
    precalc_values();
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
        var tmp = pointInPolygonx(1 * 10, -i * 10);
        if (tmp) {
            console.log(tmp);
        }
    }
    pop();
}
function pointInPolygonx(x, y) {
    var i = polyCorners - 1;
    var j = polyCorners - 1;
    var oddNodes = false;
    for (i = 0; i < polyCorners; i++) {
        if ((polyY[i] < y && polyY[j] >= y
            || polyY[j] < y && polyY[i] >= y)
            && (polyX[i] <= x || polyX[j] <= x)) {
            oddNodes || (polyX[i] + (y - polyY[i]) / (polyY[j] - polyY[i]) * (polyX[j] - polyX[i]) < x);
        }
        j = i;
    }
    return oddNodes;
}
var polyCorners;
var polyX;
var polyY;
var constant;
var multiple;
function precalc_values() {
    constant = [];
    multiple = [];
    var i = polyCorners - 1;
    var j = polyCorners - 1;
    for (i = 0; i < polyCorners; i++) {
        if (polyY[j] == polyY[i]) {
            constant[i] = polyX[i];
            multiple[i] = 0;
        }
        else {
            constant[i] = polyX[i] - (polyY[i] * polyX[j]) / (polyY[j] - polyY[i]) + (polyY[i] * polyX[i]) / (polyY[j] - polyY[i]);
            multiple[i] = (polyX[j] - polyX[i]) / (polyY[j] - polyY[i]);
        }
        j = i;
    }
}
function pointInPolygon(x, y) {
    var polyCorners = points.length;
    var polyX = points.map(function (p) { return p.x; });
    var polyY = points.map(function (p) { return p.y; });
    var i = polyCorners - 1;
    var j = polyCorners - 1;
    var oddNodes = false;
    for (i = 0; i < polyCorners; i++) {
        if ((polyY[i] < y && polyY[j] >= y
            || polyY[j] < y && polyY[i] >= y)) {
            oddNodes || (y * multiple[i] + constant[i] < x);
        }
        j = i;
    }
    return oddNodes;
}
