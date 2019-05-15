var MarchingCubes = (function () {
    function MarchingCubes(gridSpace, numPoints, strength) {
        this.gridSpace = gridSpace;
        this.numPoints = numPoints;
        this.strength = strength;
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
        this.potentials = [];
        var imax = Math.ceil(width / this.gridSpace);
        var jmax = Math.ceil(height / this.gridSpace);
        for (var i = 0; i < imax; i++) {
            this.potentials[i] = [];
            for (var j = 0; j < jmax; j++) {
                this.potentials[i][j] = 0;
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
                    this.potentials[i][j0] += Math.max(0, (p.r - dist(p.x, p.y, i * this.gridSpace, j0 * this.gridSpace)));
                }
            }
        }
        ;
    };
    MarchingCubes.prototype.drawLines = function () {
        stroke('black');
        strokeWeight(1);
        var p1, p2, p4, p8;
        var imax = Math.ceil(width / this.gridSpace);
        var jmax = Math.ceil(height / this.gridSpace);
        for (var i = 0; i < imax - 1; i++) {
            for (var j = 0; j < jmax - 1; j++) {
                p1 = this.potentials[i][j] / 100;
                p2 = this.potentials[i + 1][j] / 100;
                p4 = this.potentials[i][j + 1] / 100;
                p8 = this.potentials[i + 1][j + 1] / 100;
                var square = (p1 >= 0.2 ? 1 : 0) +
                    (p2 >= 0.2 ? 2 : 0) +
                    (p4 >= 0.2 ? 4 : 0) +
                    (p8 >= 0.2 ? 8 : 0);
                this.squares[square](i * this.gridSpace, j * this.gridSpace, p1, p2, p4, p8);
            }
        }
    };
    MarchingCubes.prototype.side = function (a, b) {
        return this.gridSpace * ((0.2 - a) / (b - a));
    };
    MarchingCubes.prototype.setupSquares = function () {
        var _this = this;
        this.squares = [];
        this.squares[0] = function (x, y, p1, p2, p4, p8) {
        };
        this.squares[1] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.gridSpace - _this.side(p4, p1));
            var end = createVector(x + _this.gridSpace - _this.side(p2, p1), y);
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[2] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.side(p1, p2), y);
            var end = createVector(x + _this.gridSpace, y + _this.gridSpace - _this.side(p8, p2));
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[3] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.gridSpace - _this.side(p4, p1));
            var end = createVector(x + _this.gridSpace, y + _this.gridSpace - _this.side(p8, p2));
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[4] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.side(p1, p4));
            var end = createVector(x + _this.gridSpace - _this.side(p8, p4), y + _this.gridSpace);
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[5] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.gridSpace - _this.side(p2, p1), y);
            var end = createVector(x + _this.gridSpace - _this.side(p8, p4), y + _this.gridSpace);
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[6] = function (x, y, p1, p2, p4, p8) {
        };
        this.squares[7] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.gridSpace - _this.side(p8, p4), y + _this.gridSpace);
            var end = createVector(x + _this.gridSpace, y + _this.gridSpace - _this.side(p8, p2));
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[8] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.side(p4, p8), y + _this.gridSpace);
            var end = createVector(x + _this.gridSpace, y + _this.side(p2, p8));
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[9] = function (x, y, p1, p2, p4, p8) {
        };
        this.squares[10] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.side(p1, p2), y);
            var end = createVector(x + _this.side(p4, p8), y + _this.gridSpace);
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[11] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.gridSpace - _this.side(p4, p1));
            var end = createVector(x + _this.side(p4, p8), y + _this.gridSpace);
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[12] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.side(p1, p4));
            var end = createVector(x + _this.gridSpace, y + _this.side(p2, p8));
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[13] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x + _this.gridSpace - _this.side(p2, p1), y);
            var end = createVector(x + _this.gridSpace, y + _this.side(p2, p8));
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[14] = function (x, y, p1, p2, p4, p8) {
            var start = createVector(x, y + _this.side(p1, p4));
            var end = createVector(x + _this.side(p1, p2), y);
            line(start.x, start.y, end.x, end.y);
        };
        this.squares[15] = function (x, y, p1, p2, p4, p8) {
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
        stroke('blue');
        strokeWeight(0.5);
        circle(this.x, this.y, this.r);
    };
    return Point;
}());
var marchingCubes;
function setup() {
    createCanvas(windowWidth, windowHeight);
    var gridSpace = 10;
    var numpoints = 50;
    var strength = 100;
    marchingCubes = new MarchingCubes(gridSpace, numpoints, strength);
}
function draw() {
    background(255);
    marchingCubes.move();
    marchingCubes.draw();
}
