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
    function MarchingCubes(numPoints, maxSpeed, sizeRange, minSize) {
        this.numPoints = numPoints;
        this.maxSpeed = maxSpeed;
        this.sizeRange = sizeRange;
        this.minSize = minSize;
        this.setColors();
        this.setupSquares();
        this.setupPoints();
        this.generateLines();
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
    MarchingCubes.prototype.setColors = function (colors) {
        if (colors === void 0) { colors = null; }
        this.colorsArray = ColorHelper.getColorsArray(floor(width), colors);
    };
    MarchingCubes.prototype.draw = function () {
        strokeWeight(2);
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var l = _a[_i];
            stroke(this.colorsArray[floor(l.x1)]);
            line(l.x1, l.y1, l.x2, l.y2);
        }
    };
    MarchingCubes.prototype.drawPoints = function (color) {
        stroke(color);
        strokeWeight(0.5);
        noFill();
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            p.draw();
        }
        ;
    };
    ;
    MarchingCubes.prototype.drawGrid = function (color) {
        stroke(color);
        strokeWeight(0.4);
        for (var i = 0; i < width / PARAMS.gridSpace; i++) {
            line(i * PARAMS.gridSpace, 0, i * PARAMS.gridSpace, height);
        }
        for (var j = 0; j < height / PARAMS.gridSpace; j++) {
            ;
            line(0, j * PARAMS.gridSpace, width, j * PARAMS.gridSpace);
        }
    };
    ;
    MarchingCubes.prototype.setupPoints = function () {
        this.points = [];
        var i;
        for (i = 0; i < this.numPoints; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            var vx = Math.random() * this.maxSpeed - 1;
            var vy = Math.random() * this.maxSpeed - 1;
            var r = (Math.random() * this.sizeRange) + this.minSize;
            this.points[i] = new Point(x, y, vx, vy, r);
        }
    };
    MarchingCubes.prototype.generateLines = function () {
        var potentials = [];
        var imax = Math.ceil(width / PARAMS.gridSpace);
        var jmax = Math.ceil(height / PARAMS.gridSpace);
        for (var i = 0; i < imax; i++) {
            potentials[i] = [];
            for (var j = 0; j < jmax; j++) {
                potentials[i][j] = 0;
            }
        }
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            var str = (p.r / 2) * PARAMS.strength;
            var strengthFactor = Math.ceil(str * 2 / PARAMS.gridSpace);
            var i = Math.max(0, Math.floor((p.x - str) / PARAMS.gridSpace));
            var j = Math.max(0, Math.floor((p.y - str) / PARAMS.gridSpace));
            var ilim = Math.min(imax, i + 1 + strengthFactor);
            var jlim = Math.min(jmax, j + 1 + strengthFactor);
            var j0;
            for (; i < ilim; i++) {
                for (j0 = j; j0 < jlim; j0++) {
                    var d = dist(p.x, p.y, i * PARAMS.gridSpace, j0 * PARAMS.gridSpace);
                    var prDistance = (p.r - d);
                    potentials[i][j0] += Math.max(0, prDistance);
                }
            }
        }
        ;
        this.lines = [];
        var p1, p2, p4, p8;
        var imax = Math.ceil(width / PARAMS.gridSpace);
        var jmax = Math.ceil(height / PARAMS.gridSpace);
        for (var i = 0; i < imax - 1; i++) {
            for (var j = 0; j < jmax - 1; j++) {
                p1 = potentials[i][j] / 100;
                p2 = potentials[i + 1][j] / 100;
                p4 = potentials[i][j + 1] / 100;
                p8 = potentials[i + 1][j + 1] / 100;
                var square = (p1 >= PARAMS.stickyVal ? 1 : 0) +
                    (p2 >= PARAMS.stickyVal ? 2 : 0) +
                    (p4 >= PARAMS.stickyVal ? 4 : 0) +
                    (p8 >= PARAMS.stickyVal ? 8 : 0);
                var linePoints = this.squares[square](i * PARAMS.gridSpace, j * PARAMS.gridSpace, p1, p2, p4, p8);
                if (linePoints != null) {
                    this.lines.push(linePoints);
                }
            }
        }
    };
    MarchingCubes.prototype.side = function (a, b) {
        return PARAMS.gridSpace * ((PARAMS.stickyVal - a) / (b - a));
    };
    MarchingCubes.prototype.setupSquares = function () {
        var _this = this;
        this.squares = [];
        this.squares[0] = function (x, y, p1, p2, p4, p8) {
            return null;
        };
        this.squares[1] = function (x, y, p1, p2, p4, p8) {
            var x1 = x;
            var y1 = y + PARAMS.gridSpace - _this.side(p4, p1);
            var x2 = x + PARAMS.gridSpace - _this.side(p2, p1);
            var y2 = y;
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[2] = function (x, y, p1, p2, p4, p8) {
            var x1 = x + _this.side(p1, p2);
            var y1 = y;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + PARAMS.gridSpace - _this.side(p8, p2);
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[3] = function (x, y, p1, p2, p4, p8) {
            var x1 = x;
            var y1 = y + PARAMS.gridSpace - _this.side(p4, p1);
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + PARAMS.gridSpace - _this.side(p8, p2);
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[4] = function (x, y, p1, p2, p4, p8) {
            var x1 = x;
            var y1 = y + _this.side(p1, p4);
            var x2 = x + PARAMS.gridSpace - _this.side(p8, p4);
            var y2 = y + PARAMS.gridSpace;
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[5] = function (x, y, p1, p2, p4, p8) {
            var x1 = x + PARAMS.gridSpace - _this.side(p2, p1);
            var y1 = y;
            var x2 = x + PARAMS.gridSpace - _this.side(p8, p4);
            var y2 = y + PARAMS.gridSpace;
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[6] = function (x, y, p1, p2, p4, p8) {
            return null;
        };
        this.squares[7] = function (x, y, p1, p2, p4, p8) {
            var x1 = x + PARAMS.gridSpace - _this.side(p8, p4);
            var y1 = y + PARAMS.gridSpace;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + PARAMS.gridSpace - _this.side(p8, p2);
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[8] = function (x, y, p1, p2, p4, p8) {
            var x1 = x + _this.side(p4, p8);
            var y1 = y + PARAMS.gridSpace;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + _this.side(p2, p8);
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[9] = function (x, y, p1, p2, p4, p8) {
            return null;
        };
        this.squares[10] = function (x, y, p1, p2, p4, p8) {
            var x1 = x + _this.side(p1, p2);
            var y1 = y;
            var x2 = x + _this.side(p4, p8);
            var y2 = y + PARAMS.gridSpace;
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[11] = function (x, y, p1, p2, p4, p8) {
            var x1 = x;
            var y1 = y + PARAMS.gridSpace - _this.side(p4, p1);
            var x2 = x + _this.side(p4, p8);
            var y2 = y + PARAMS.gridSpace;
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[12] = function (x, y, p1, p2, p4, p8) {
            var x1 = x;
            var y1 = y + _this.side(p1, p4);
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + _this.side(p2, p8);
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[13] = function (x, y, p1, p2, p4, p8) {
            var x1 = x + PARAMS.gridSpace - _this.side(p2, p1);
            var y1 = y;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + _this.side(p2, p8);
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        };
        this.squares[14] = function (x, y, p1, p2, p4, p8) {
            var x1 = x;
            var y1 = y + _this.side(p1, p4);
            var x2 = x + _this.side(p1, p2);
            var y2 = y;
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
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
        circle(this.x, this.y, this.r);
    };
    return Point;
}());
var marchingCubes;
var PARAMS = {
    gridSpace: 10,
    strength: 1.8,
    stickyVal: 0.2,
    showGrid: false,
    showPoints: false,
    colors: []
};
var sliderGridSize;
function setup() {
    createCanvas(windowWidth, windowHeight);
    var numpoints = 40;
    var maxSpeed = 4;
    var sizeRange = 65;
    var minSize = 35;
    marchingCubes = new MarchingCubes(numpoints, maxSpeed, sizeRange, minSize);
    setupGui();
    frameRate(30);
}
function setupGui() {
    var chkShowGrid = createCheckbox(' Grid', PARAMS.showGrid);
    chkShowGrid.position(10, 60);
    chkShowGrid.style('color', 'white');
    chkShowGrid.style('font-weight', 'bold');
    sliderGridSize = createSlider(5, 50, 10, 1);
    sliderGridSize.position(80, 60);
    chkShowGrid.changed(function () { PARAMS.showGrid = chkShowGrid.checked(); });
    var chkShowPoints = createCheckbox(' Points', PARAMS.showPoints);
    chkShowPoints.position(10, 90);
    chkShowPoints.style('color', 'white');
    chkShowPoints.style('font-weight', 'bold');
    chkShowPoints.changed(function () { PARAMS.showPoints = chkShowPoints.checked(); });
    var colorSelect = createSelect();
    colorSelect.position(10, 10);
    colorSelect.option('rainbow', "");
    colorSelect.option('red', ['red', 'orange']);
    colorSelect.option('green', ['yellow', 'green']);
    colorSelect.option('blue', ['blue', 'indigo', 'violet']);
    colorSelect.changed(function () {
        var val = colorSelect.value();
        var colors = val === "" ? null : val.split(",").map(function (x) { return color(x); });
        marchingCubes.setColors(colors);
    });
}
function draw() {
    background(1);
    var pointColor = color('white');
    pointColor.setAlpha(150);
    var gridColor = color('#f00');
    PARAMS.gridSpace = sliderGridSize.value();
    marchingCubes.move();
    if (PARAMS.showPoints) {
        marchingCubes.drawPoints(pointColor);
    }
    if (PARAMS.showGrid) {
        marchingCubes.drawGrid(gridColor);
    }
    marchingCubes.draw();
    textSize(15);
    noStroke();
    fill(255);
    text('fps: ' + frameRate(), 10, 50);
}
