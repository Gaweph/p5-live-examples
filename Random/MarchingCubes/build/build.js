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
var MarchingCubes = (function () {
    function MarchingCubes(gridSpace, numPoints, strength, colors) {
        this.gridSpace = gridSpace;
        this.numPoints = numPoints;
        this.strength = strength;
        this.colors = colors;
        this.setupSquares();
        this.setupPoints();
    }
    MarchingCubes.prototype.move = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) {
                p.vx *= -1;
            }
            if (p.y < 0 || p.y > height) {
                p.vy *= -1;
            }
        }
        ;
        this.generateLines();
    };
    MarchingCubes.prototype.draw = function () {
        this.drawLines();
    };
    MarchingCubes.prototype.setupPoints = function () {
        this.points = [];
        var i;
        for (i = 0; i < this.numPoints; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            var vx = Math.random() * 3 - 1;
            var vy = Math.random() * 3 - 1;
            var r = (Math.random() * 65) + 25;
            this.points[i] = new Point(x, y, vx, vy, r);
        }
    };
    MarchingCubes.prototype.drawPoints = function () {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            p.draw();
        }
        ;
    };
    ;
    MarchingCubes.prototype.drawGrid = function () {
        stroke('#f00');
        strokeWeight(0.2);
        for (var i = 0; i < width / this.gridSpace; i++) {
            line(i * this.gridSpace, 0, i * this.gridSpace, height);
        }
        for (var j = 0; j < height / this.gridSpace; j++) {
            ;
            line(0, j * this.gridSpace, width, j * this.gridSpace);
        }
    };
    ;
    MarchingCubes.prototype.generateLines = function () {
        var potentials = [];
        var imax = Math.ceil(width / this.gridSpace);
        var jmax = Math.ceil(height / this.gridSpace);
        var white = color('white');
        for (var i = 0; i < imax; i++) {
            potentials[i] = [];
            for (var j = 0; j < jmax; j++) {
                potentials[i][j] = 0;
            }
        }
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            var i = Math.max(0, Math.floor((p.x - this.strength) / this.gridSpace));
            var j = Math.max(0, Math.floor((p.y - this.strength) / this.gridSpace));
            var ilim = Math.min(imax, i + 1 + Math.ceil(this.strength * 2 / this.gridSpace));
            var jlim = Math.min(jmax, j + 1 + Math.ceil(this.strength * 2 / this.gridSpace));
            var j0;
            for (; i < ilim; i++) {
                for (j0 = j; j0 < jlim; j0++) {
                    potentials[i][j0] += Math.max(0, (p.r - dist(p.x, p.y, i * this.gridSpace, j0 * this.gridSpace)));
                }
            }
        }
        ;
        this.lines = [];
        var p1, p2, p4, p8;
        var c1, c2, c4, c8;
        var imax = Math.ceil(width / this.gridSpace);
        var jmax = Math.ceil(height / this.gridSpace);
        for (var i = 0; i < imax - 1; i++) {
            for (var j = 0; j < jmax - 1; j++) {
                p1 = potentials[i][j] / 100;
                p2 = potentials[i + 1][j] / 100;
                p4 = potentials[i][j + 1] / 100;
                p8 = potentials[i + 1][j + 1] / 100;
                var square = (p1 >= 0.2 ? 1 : 0) +
                    (p2 >= 0.2 ? 2 : 0) +
                    (p4 >= 0.2 ? 4 : 0) +
                    (p8 >= 0.2 ? 8 : 0);
                var linePoints = this.squares[square](i * this.gridSpace, j * this.gridSpace, p1, p2, p4, p8);
                if (linePoints != null) {
                    var c = random([c1, c2, c4, c8]);
                    this.lines.push({ start: linePoints.start, end: linePoints.end });
                }
            }
        }
    };
    MarchingCubes.prototype.drawLines = function () {
        var colorsArray = ColorHelper.getColorsArray(floor(width));
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var l = _a[_i];
            stroke(colorsArray[floor(l.start.x)]);
            strokeWeight(2);
            line(l.start.x, l.start.y, l.end.x, l.end.y);
        }
    };
    MarchingCubes.prototype.side = function (a, b) {
        return this.gridSpace * ((0.2 - a) / (b - a));
    };
    MarchingCubes.prototype.setupSquares = function () {
        var _this = this;
        this.squares = [];
        this.squares[0] = function (x, y, p1, p2, p4, p8) {
            return null;
        };
        this.squares[1] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.gridSpace - _this.side(p4, p1));
            var end = createVector(x + _this.gridSpace - _this.side(p2, p1), y);
            return { start: start, end: end };
        };
        this.squares[2] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.side(p1, p2), y);
            var end = createVector(x + _this.gridSpace, y + _this.gridSpace - _this.side(p8, p2));
            return { start: start, end: end };
        };
        this.squares[3] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.gridSpace - _this.side(p4, p1));
            var end = createVector(x + _this.gridSpace, y + _this.gridSpace - _this.side(p8, p2));
            return { start: start, end: end };
        };
        this.squares[4] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.side(p1, p4));
            var end = createVector(x + _this.gridSpace - _this.side(p8, p4), y + _this.gridSpace);
            return { start: start, end: end };
        };
        this.squares[5] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.gridSpace - _this.side(p2, p1), y);
            var end = createVector(x + _this.gridSpace - _this.side(p8, p4), y + _this.gridSpace);
            return { start: start, end: end };
        };
        this.squares[6] = function (x, y, p1, p2, p4, p8) {
            return null;
        };
        this.squares[7] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.gridSpace - _this.side(p8, p4), y + _this.gridSpace);
            var end = createVector(x + _this.gridSpace, y + _this.gridSpace - _this.side(p8, p2));
            return { start: start, end: end };
        };
        this.squares[8] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.side(p4, p8), y + _this.gridSpace);
            var end = createVector(x + _this.gridSpace, y + _this.side(p2, p8));
            return { start: start, end: end };
        };
        this.squares[9] = function (x, y, p1, p2, p4, p8) {
            return null;
        };
        this.squares[10] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.side(p1, p2), y);
            var end = createVector(x + _this.side(p4, p8), y + _this.gridSpace);
            return { start: start, end: end };
        };
        this.squares[11] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.gridSpace - _this.side(p4, p1));
            var end = createVector(x + _this.side(p4, p8), y + _this.gridSpace);
            return { start: start, end: end };
        };
        this.squares[12] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.side(p1, p4));
            var end = createVector(x + _this.gridSpace, y + _this.side(p2, p8));
            return { start: start, end: end };
        };
        this.squares[13] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.gridSpace - _this.side(p2, p1), y);
            var end = createVector(x + _this.gridSpace, y + _this.side(p2, p8));
            return { start: start, end: end };
        };
        this.squares[14] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.side(p1, p4));
            var end = createVector(x + _this.side(p1, p2), y);
            return { start: start, end: end };
        };
        this.squares[15] = function (x, y, p1, p2, p4, p8) {
            return null;
        };
    };
    return MarchingCubes;
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
        stroke('white');
        strokeWeight(0.5);
        circle(this.x, this.y, this.r);
    };
    return Point;
}());
var marchingCubes;
var colors;
function setup() {
    createCanvas(windowWidth, windowHeight);
    var gridSpace = 10;
    var numpoints = 50;
    var strength = 100;
    var purples = [
        color(38, 58, 150),
        color('indigo'),
        color('violet')
    ];
    marchingCubes = new MarchingCubes(gridSpace, numpoints, strength, purples.slice());
}
function draw() {
    background(1);
    marchingCubes.move();
    marchingCubes.draw();
}
