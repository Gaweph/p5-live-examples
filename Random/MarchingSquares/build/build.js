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
        push();
        translate(x * PARAMS.gridSize, y * PARAMS.gridSize);
        scale(PARAMS.gridSize);
        strokeWeight(1 / PARAMS.gridSize);
        var midpoint = 0.5;
        if (bitmask == '0000') {
        }
        else if (bitmask == '0001') {
            line(0, midpoint, midpoint, 0);
            beginShape();
            vertex(0, midpoint);
            vertex(midpoint, 0);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '0010') {
            line(1 - midpoint, 0, 1, midpoint);
            beginShape();
            vertex(1 - midpoint, 0);
            vertex(1, midpoint);
            vertex(1, 0);
            endShape();
        }
        else if (bitmask == '0011') {
            line(0, midpoint, 1, midpoint);
            beginShape();
            vertex(0, midpoint);
            vertex(1, midpoint);
            vertex(1, 0);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '0100') {
            line(1 - midpoint, 1, 1, 1 - midpoint);
            beginShape();
            vertex(1 - midpoint, 1);
            vertex(1, 1 - midpoint);
            vertex(1, 1);
            endShape();
        }
        else if (bitmask == '0101') {
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '0001');
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '0100');
        }
        else if (bitmask == '0110') {
            line(midpoint, 0, midpoint, 1);
            beginShape();
            vertex(midpoint, 0);
            vertex(midpoint, 1);
            vertex(1, 1);
            vertex(1, 0);
            endShape();
        }
        else if (bitmask == '0111') {
            line(0, 1 - midpoint, midpoint, 1);
            beginShape();
            vertex(0, 1 - midpoint);
            vertex(midpoint, 1);
            vertex(1, 1);
            vertex(1, 0);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '1000') {
            line(0, 1 - midpoint, midpoint, 1);
            beginShape();
            vertex(0, 1 - midpoint);
            vertex(midpoint, 1);
            vertex(0, 1);
            y;
            endShape();
        }
        else if (bitmask == '1001') {
            line(1 - midpoint, 0, 1 - midpoint, 1);
            beginShape();
            vertex(1 - midpoint, 0);
            vertex(1 - midpoint, 1);
            vertex(0, 1);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '1010') {
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '0010');
            pop();
            MarchingSquaresHelper.drawForCombination(x, y, '1000');
        }
        else if (bitmask == '1011') {
            line(1 - midpoint, 1, 1, 1 - midpoint);
            beginShape();
            vertex(1 - midpoint, 1);
            vertex(1, 1 - midpoint);
            vertex(1, 0);
            vertex(0, 0);
            vertex(0, 1);
            endShape();
        }
        else if (bitmask == '1100') {
            line(0, 1 - midpoint, 1, 1 - midpoint);
            beginShape();
            vertex(0, 1 - midpoint);
            vertex(1, 1 - midpoint);
            vertex(1, 1);
            vertex(0, 1);
            endShape();
        }
        else if (bitmask == '1101') {
            line(midpoint, 0, 1, midpoint);
            beginShape();
            vertex(midpoint, 0);
            vertex(1, midpoint);
            vertex(1, 1);
            vertex(0, 1);
            vertex(0, 0);
            endShape();
        }
        else if (bitmask == '1110') {
            line(midpoint, 0, 0, midpoint);
            beginShape();
            vertex(midpoint, 0);
            vertex(0, midpoint);
            vertex(0, 1);
            vertex(1, 1);
            vertex(1, 0);
            endShape();
        }
        else if (bitmask == '1111') {
            beginShape();
            vertex(0, 0);
            vertex(0, 1);
            vertex(1, 1);
            vertex(1, 0);
            endShape();
        }
        else {
            console.log('bad number' + bitmask);
        }
        pop();
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
        square(this.x, this.y, this.r);
    };
    return Point;
}());
var PARAMS = {
    gridSize: 10,
    pointSize: 10
};
var points;
var combinations;
function setup() {
    createCanvas(600, 600);
    PARAMS.gridSize = width / 10;
    PARAMS.pointSize = PARAMS.gridSize;
    points = [];
    points.push(new Point(5 * PARAMS.pointSize, 2 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(5 * PARAMS.pointSize, 3 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(5 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(6 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(6 * PARAMS.pointSize, 5 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    noLoop();
}
function draw() {
    background(1);
    stroke('red');
    strokeWeight(0.4);
    push();
    for (var i = 0; i < width / PARAMS.gridSize; i++) {
        line(i * PARAMS.gridSize, 0, i * PARAMS.gridSize, height);
    }
    for (var j = 0; j < height / PARAMS.gridSize; j++) {
        line(0, j * PARAMS.gridSize, width, j * PARAMS.gridSize);
    }
    pop();
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var p = points_1[_i];
        p.draw();
    }
    MarchingSquaresHelper.drawForCombination(0, 0, '0000');
    MarchingSquaresHelper.drawForCombination(0, 1, '0001');
    MarchingSquaresHelper.drawForCombination(0, 2, '0010');
    MarchingSquaresHelper.drawForCombination(0, 3, '0011');
    MarchingSquaresHelper.drawForCombination(1, 0, '0100');
    MarchingSquaresHelper.drawForCombination(1, 1, '0101');
    MarchingSquaresHelper.drawForCombination(1, 2, '0110');
    MarchingSquaresHelper.drawForCombination(1, 3, '0111');
    MarchingSquaresHelper.drawForCombination(2, 0, '1000');
    MarchingSquaresHelper.drawForCombination(2, 1, '1001');
    MarchingSquaresHelper.drawForCombination(2, 2, '1010');
    MarchingSquaresHelper.drawForCombination(2, 3, '1011');
    MarchingSquaresHelper.drawForCombination(3, 0, '1100');
    MarchingSquaresHelper.drawForCombination(3, 1, '1101');
    MarchingSquaresHelper.drawForCombination(3, 2, '1110');
    MarchingSquaresHelper.drawForCombination(3, 3, '1111');
}
