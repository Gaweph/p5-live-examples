var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.getColorsArray = function (total) {
        var rainbowColors = [
            this.getColorVector(color('red')),
            this.getColorVector(color('orange')),
            this.getColorVector(color('yellow')),
            this.getColorVector(color('green')),
            createVector(38, 58, 150),
            this.getColorVector(color('indigo')),
            this.getColorVector(color('violet'))
        ];
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var font;
function preload() {
    font = loadFont('/public/Digitalt.ttf');
}
var bounds;
var lines;
var shapeLines;
var overlapPoints;
var colors;
var points;
var renderer;
function setup() {
    renderer = createCanvas(windowWidth, windowHeight);
    stroke(0);
    fill(255, 104, 204);
    console.time(' setup canvas');
    push();
    bounds = font.textBounds(' Hello ', 0, 0, 200);
    translate(100, bounds.h);
    textFont(font);
    textSize(200);
    fill(0);
    text('Hello', 0, 0);
    fill('red');
    rect(400, 400, 500, 100);
    fill('purple');
    circle(200, 200, 75);
    pop();
    console.timeEnd();
    console.time(' convert to lines ');
    var canvas = renderer.canvas;
    points = canvasToPoints(canvas);
    console.timeEnd();
    background(255);
}
function draw() {
    background(255);
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var p = points_1[_i];
        stroke(p.color);
        point(p.pos.x, p.pos.y);
    }
}
function canvasToPoints(canvas) {
    var data = canvas.getContext('2d').getImageData(0, 0, width, height).data;
    var dotGap = 10;
    var res = [];
    for (var y = 0; y < canvas.height; y += dotGap) {
        for (var x = 0; x < canvas.width; x += dotGap) {
            var i = (y * canvas.width + x) * 4;
            var red = data[i];
            var green = data[i + 1];
            var blue = data[i + 2];
            var alpha = data[i + 3];
            if (red != 0 || green != 0 || blue != 0 || alpha != 0) {
                var c = color(red, green, blue, alpha);
                res.push({ pos: createVector(x, y), color: c });
            }
        }
    }
    return res;
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
function overlap(lineA, lineB) {
    var x1 = lineA.a.x;
    var y1 = lineA.a.y;
    var x2 = lineA.b.x;
    var y2 = lineA.b.y;
    var x3 = lineB.a.x;
    var y3 = lineB.a.y;
    var x4 = lineB.b.x;
    var y4 = lineB.b.y;
    var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
        return null;
    }
    var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
        var pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
    }
    else {
        return null;
    }
}
