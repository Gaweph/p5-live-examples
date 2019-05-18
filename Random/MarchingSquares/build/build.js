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
    MarchingSquaresHelper.prototype.drawForCombination = function (bitmask) {
        if (bitmask == '0000') {
        }
        else if (bitmask == '0001') {
            line(0, 0.5, 0.5, 0);
        }
        else if (bitmask == '0010') {
            line(0.5, 0, 1, 0.5);
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
    PARAMS.gridSize = width / 20;
    PARAMS.pointSize = PARAMS.gridSize;
    points = [];
    points.push(new Point(2 * PARAMS.pointSize, 2 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(2 * PARAMS.pointSize, 3 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(2 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(3 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    points.push(new Point(3 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize));
    combinations = [];
    combinations[0] = function () {
    };
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
    push();
    translate(5 * PARAMS.gridSize, 5 * PARAMS.gridSize);
    scale(PARAMS.gridSize);
    strokeWeight(1 / PARAMS.gridSize);
    combinations[parseInt('0001', 2)]();
    pop();
}
