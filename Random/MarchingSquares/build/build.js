var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
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
var MarchingSquaresHelper = (function () {
    function MarchingSquaresHelper() {
    }
    MarchingSquaresHelper.drawForCombination = function (x, y, bitmask) {
        var drawMesh = false;
        var drawLine = true;
        var midpoint = 0.5;
        var xPos = (x + 1) * PARAMS.gridSize;
        var yPos = (y + 1) * PARAMS.gridSize;
        var xZero = (x) * PARAMS.gridSize;
        var yZero = (y) * PARAMS.gridSize;
        var xMidpoint = xPos - (PARAMS.gridSize / 2);
        var yMidpoint = yPos - (PARAMS.gridSize / 2);
        if (bitmask == '0000') {
        }
        else if (bitmask == '0001') {
            if (drawLine)
                line(xZero, yMidpoint, xMidpoint, yZero);
            if (drawMesh) {
                beginShape();
                vertex(0, midpoint);
                vertex(midpoint, 0);
                vertex(0, 0);
                endShape();
            }
        }
        else if (bitmask == '0010') {
            if (drawLine)
                line(xPos - (PARAMS.gridSize / 2), yZero, xPos, yMidpoint);
            if (drawMesh) {
                beginShape();
                vertex(1 - midpoint, 0);
                vertex(1, midpoint);
                vertex(1, 0);
                endShape();
            }
        }
        else if (bitmask == '0011') {
            if (drawLine)
                line(xZero, yMidpoint, xPos, yMidpoint);
            if (drawMesh) {
                beginShape();
                vertex(0, midpoint);
                vertex(1, midpoint);
                vertex(1, 0);
                vertex(0, 0);
                endShape();
            }
        }
        else if (bitmask == '0100') {
            if (drawLine)
                line(xPos - (PARAMS.gridSize / 2), yPos, xPos, yPos - (PARAMS.gridSize / 2));
            if (drawMesh) {
                beginShape();
                vertex(1 - midpoint, 1);
                vertex(1, 1 - midpoint);
                vertex(1, 1);
                endShape();
            }
        }
        else if (bitmask == '0101') {
            MarchingSquaresHelper.drawForCombination(x, y, '0001');
            MarchingSquaresHelper.drawForCombination(x, y, '0100');
        }
        else if (bitmask == '0110') {
            if (drawLine)
                line(xMidpoint, yZero, xMidpoint, yPos);
            if (drawMesh) {
                beginShape();
                vertex(midpoint, 0);
                vertex(midpoint, 1);
                vertex(1, 1);
                vertex(1, 0);
                endShape();
            }
        }
        else if (bitmask == '0111') {
            if (drawLine)
                line(xZero, yPos - (PARAMS.gridSize / 2), xMidpoint, yPos);
            if (drawMesh) {
                beginShape();
                vertex(0, 1 - midpoint);
                vertex(midpoint, 1);
                vertex(1, 1);
                vertex(1, 0);
                vertex(0, 0);
                endShape();
            }
        }
        else if (bitmask == '1000') {
            if (drawLine)
                line(xZero, yPos - (PARAMS.gridSize / 2), xMidpoint, yPos);
            if (drawMesh) {
                beginShape();
                vertex(0, 1 - midpoint);
                vertex(midpoint, 1);
                vertex(0, 1);
                y;
                endShape();
            }
        }
        else if (bitmask == '1001') {
            if (drawLine)
                line(xPos - (PARAMS.gridSize / 2), yZero, xPos - (PARAMS.gridSize / 2), yPos);
            if (drawMesh) {
                beginShape();
                vertex(1 - midpoint, 0);
                vertex(1 - midpoint, 1);
                vertex(0, 1);
                vertex(0, 0);
                endShape();
            }
        }
        else if (bitmask == '1010') {
            MarchingSquaresHelper.drawForCombination(x, y, '0010');
            MarchingSquaresHelper.drawForCombination(x, y, '1000');
        }
        else if (bitmask == '1011') {
            if (drawLine)
                line(xPos - (PARAMS.gridSize / 2), yPos, xPos, yPos - (PARAMS.gridSize / 2));
            if (drawMesh) {
                beginShape();
                vertex(1 - midpoint, 1);
                vertex(1, 1 - midpoint);
                vertex(1, 0);
                vertex(0, 0);
                vertex(0, 1);
                endShape();
            }
        }
        else if (bitmask == '1100') {
            if (drawLine)
                line(xZero, yPos - (PARAMS.gridSize / 2), xPos, yPos - (PARAMS.gridSize / 2));
            if (drawMesh) {
                beginShape();
                vertex(0, 1 - midpoint);
                vertex(1, 1 - midpoint);
                vertex(1, 1);
                vertex(0, 1);
                endShape();
            }
        }
        else if (bitmask == '1101') {
            if (drawLine)
                line(xMidpoint, yZero, xPos, yMidpoint);
            if (drawMesh) {
                beginShape();
                vertex(midpoint, 0);
                vertex(1, midpoint);
                vertex(1, 1);
                vertex(0, 1);
                vertex(0, 0);
                endShape();
            }
        }
        else if (bitmask == '1110') {
            if (drawLine)
                line(xMidpoint, yZero, xZero, yMidpoint);
            if (drawMesh) {
                beginShape();
                vertex(midpoint, 0);
                vertex(0, midpoint);
                vertex(0, 1);
                vertex(1, 1);
                vertex(1, 0);
                endShape();
            }
        }
        else if (bitmask == '1111') {
            if (drawMesh) {
                beginShape();
                vertex(0, 0);
                vertex(0, 1);
                vertex(1, 1);
                vertex(1, 0);
                endShape();
            }
        }
        else {
            console.log('bad number' + bitmask);
        }
    };
    MarchingSquaresHelper.getCurrentPointArray = function (points) {
        var res = [];
        for (var y = 0; y < height / PARAMS.gridSize; y++) {
            res[y] = [];
            for (var x = 0; x < width / PARAMS.gridSize; x++) {
                res[y][x] = 0;
            }
        }
        var maxGridX = width / PARAMS.gridSize;
        var maxGridY = height / PARAMS.gridSize;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var p = points_1[_i];
            var xmin = Math.max(0, floor((p.x - p.r) / PARAMS.gridSize));
            var ymin = Math.max(0, floor((p.y - p.r) / PARAMS.gridSize));
            var xmax = Math.min(maxGridX - 1, ceil((p.x + p.r) / PARAMS.gridSize));
            var ymax = Math.min(maxGridY - 1, ceil((p.y + p.r) / PARAMS.gridSize));
            for (var y = ymin; y <= ymax; y++) {
                for (var x = xmin; x <= xmax; x++) {
                    var insidePoint = p.inside(x * PARAMS.gridSize, y * PARAMS.gridSize);
                    if (insidePoint >= 1) {
                        try {
                            res[y][x] = Math.max(insidePoint, res[y][x]);
                        }
                        catch (ex) {
                            console.log(y, x);
                        }
                    }
                }
            }
        }
        return res;
    };
    MarchingSquaresHelper.drawSquares = function (pointsArr) {
        for (var y = 1; y < pointsArr.length - 1; y++) {
            var point = pointsArr[y];
            for (var x = 1; x < point.length - 1; x++) {
                var p1 = pointsArr[y][x] > 0 ? '1' : '0';
                var p2 = pointsArr[y][x + 1] > 0 ? '1' : '0';
                var p4 = pointsArr[y + 1][x + 1] > 0 ? '1' : '0';
                var p8 = pointsArr[y + 1][x] > 0 ? '1' : '0';
                stroke(PARAMS.colorsArray[floor(x * PARAMS.gridSize)]);
                MarchingSquaresHelper.drawForCombination(x, y, p8 + p4 + p2 + p1);
            }
        }
    };
    return MarchingSquaresHelper;
}());
var Point = (function () {
    function Point(x, y, vx, vy, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
    }
    Point.prototype.draw = function () {
        point(this.x, this.y);
        circle(this.x, this.y, this.r);
    };
    Point.prototype.inside = function (x, y) {
        var res = (this.r * this.r) / (((x - this.x) * (x - this.x)) + ((y - this.y) * (y - this.y)));
        return res;
    };
    return Point;
}());
var PARAMS = {
    gridSize: 15,
    maxPointSize: 10,
    numberOfpoints: 100,
    colorsArray: []
};
var points;
var sliderGridSize;
var canvas;
function setup() {
    canvas = createCanvas(windowWidth,windowHeight)
    PARAMS.maxPointSize = width / 15;
    points = [];
    for (var i = 0; i < PARAMS.numberOfpoints; i++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        var velocityX = Math.random() * 2 - 1;
        var velocityY = Math.random() * 2 - 1;
        var size = Math.random() * PARAMS.maxPointSize;
        points.push(new Point(x, y, velocityX, velocityY, size));
    }
    sliderGridSize = createSlider(2, 30, PARAMS.gridSize, 2);
    sliderGridSize.position(10, 10);
    PARAMS.colorsArray = ColorHelper.getColorsArray(floor(width));
}
window.onresize = function() {
  canvas.size(windowWidth, windowHeight);
};
function draw() {
    background(1);
    PARAMS.gridSize = sliderGridSize.value();
    strokeWeight(2);
    var arr = MarchingSquaresHelper.getCurrentPointArray(points);
    MarchingSquaresHelper.drawSquares(arr);
    for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
        var p = _a[_i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x - p.r < 0 || p.x + p.r > width) {
            p.vx *= -1;
        }
        if (p.y - p.r < 0 || p.y + p.r > height) {
            p.vy *= -1;
        }
    }
    ;
    textSize(15);
    noStroke();
    fill(255);
    text('fps: ' + frameRate(), 10, 50);
}
