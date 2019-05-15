var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var PARAMS = {
    numpoints: 40,
    rRange: 65,
    rMin: 20,
    gridSpace: 10,
    strength: 100,
    drawGrid: false,
    drawPoints: true,
    drawPotentialIn: false,
    drawPotentialOut: false,
    drawSurface: true,
    reset: function () {
        generatePoints();
    },
    pointColor: '#ff0000',
    potentialColor: '#ff6600',
    surfaceColor: '#ffffff',
    pointAlpha: 0.5,
    potentialAlpha: 0.3,
    surfaceAlpha: 1.0
};
function setup() {
    createCanvas(WIDTH, HEIGHT);
    generatePoints();
}
function draw() {
    points.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
    });
    drawPoints();
    generateLines();
}
function dist(x, y, a, b) {
    return Math.sqrt((x - a) * (x - a) + (y - b) * (y - b));
}
var points = [];
var Point = (function () {
    function Point() {
        this.x = Math.random() * WIDTH;
        this.y = Math.random() * HEIGHT;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.r = Math.random() * PARAMS.rRange + PARAMS.rMin;
    }
    return Point;
}());
var generatePoints = function () {
    points = [];
    var i, j;
    for (i = 0; i < PARAMS.numpoints; i++) {
        points[i] = new Point();
    }
};
var drawPoints = function () {
    background(255);
    if (PARAMS.drawPoints) {
        points.forEach(function (p) {
            circle(p.x, p.y, p.r);
        });
    }
    if (PARAMS.drawGrid) {
        for (var i = 0; i < WIDTH / PARAMS.gridSpace; i++) {
            line(i * PARAMS.gridSpace, 0, i * PARAMS.gridSpace, HEIGHT);
        }
        for (var j = 0; j < HEIGHT / PARAMS.gridSpace; j++) {
            line(0, j * PARAMS.gridSpace, WIDTH, j * PARAMS.gridSpace);
        }
    }
};
var side = function (a, b) {
    return PARAMS.gridSpace * ((0.2 - a) / (b - a));
};
var squares = [];
squares[0] = function (x, y, p1, p2, p4, p8) {
};
squares[1] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x, y + PARAMS.gridSpace - side(p4, p1));
    var end = createVector(x + PARAMS.gridSpace - side(p2, p1), y);
    line(start.x, start.y, end.x, end.y);
};
squares[2] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x + side(p1, p2), y);
    var end = createVector(x + PARAMS.gridSpace, y + PARAMS.gridSpace - side(p8, p2));
    line(start.x, start.y, end.x, end.y);
};
squares[3] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x, y + PARAMS.gridSpace - side(p4, p1));
    var end = createVector(x + PARAMS.gridSpace, y + PARAMS.gridSpace - side(p8, p2));
    line(start.x, start.y, end.x, end.y);
};
squares[4] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x, y + side(p1, p4));
    var end = createVector(x + PARAMS.gridSpace - side(p8, p4), y + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
};
squares[5] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x + PARAMS.gridSpace - side(p2, p1), y);
    var end = createVector(x + PARAMS.gridSpace - side(p8, p4), y + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
};
squares[6] = function (x, y, p1, p2, p4, p8) {
};
squares[7] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x + PARAMS.gridSpace - side(p8, p4), y + PARAMS.gridSpace);
    var end = createVector(x + PARAMS.gridSpace, y + PARAMS.gridSpace - side(p8, p2));
    line(start.x, start.y, end.x, end.y);
};
squares[8] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x + side(p4, p8), y + PARAMS.gridSpace);
    var end = createVector(x + PARAMS.gridSpace, y + side(p2, p8));
    line(start.x, start.y, end.x, end.y);
};
squares[9] = function (x, y, p1, p2, p4, p8) {
};
squares[10] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x + side(p1, p2), y);
    var end = createVector(x + side(p4, p8), y + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
};
squares[11] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x, y + PARAMS.gridSpace - side(p4, p1));
    var end = createVector(x + side(p4, p8), y + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
};
squares[12] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x, y + side(p1, p4));
    var end = createVector(x + PARAMS.gridSpace, y + side(p2, p8));
    line(start.x, start.y, end.x, end.y);
};
squares[13] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x + PARAMS.gridSpace - side(p2, p1), y);
    var end = createVector(x + PARAMS.gridSpace, y + side(p2, p8));
    line(start.x, start.y, end.x, end.y);
};
squares[14] = function (x, y, p1, p2, p4, p8) {
    var start = createVector(x, y + side(p1, p4));
    var end = createVector(x + side(p1, p2), y);
    line(start.x, start.y, end.x, end.y);
};
squares[15] = function (x, y, p1, p2, p4, p8) {
};
var generateLines = function () {
    var potentials = [];
    var imax, jmax;
    imax = Math.ceil(WIDTH / PARAMS.gridSpace);
    jmax = Math.ceil(HEIGHT / PARAMS.gridSpace);
    for (var i = 0; i < imax; i++) {
        potentials[i] = [];
        for (var j = 0; j < jmax; j++) {
            potentials[i][j] = 0;
        }
    }
    points.forEach(function (p) {
        var i = Math.max(0, Math.floor((p.x - PARAMS.strength) / PARAMS.gridSpace));
        var j = Math.max(0, Math.floor((p.y - PARAMS.strength) / PARAMS.gridSpace));
        var ilim = Math.min(imax, i + 1 + Math.ceil(PARAMS.strength * 2 / PARAMS.gridSpace));
        var jlim = Math.min(jmax, j + 1 + Math.ceil(PARAMS.strength * 2 / PARAMS.gridSpace));
        var j0;
        for (; i < ilim; i++) {
            for (j0 = j; j0 < jlim; j0++) {
                potentials[i][j0] += Math.max(0, (p.r - dist(p.x, p.y, i * PARAMS.gridSpace, j0 * PARAMS.gridSpace)));
            }
        }
    });
    if (PARAMS.drawSurface) {
        var p1, p2, p4, p8;
        for (i = 0; i < imax - 1; i++) {
            for (j = 0; j < jmax - 1; j++) {
                p1 = potentials[i][j] / 100;
                p2 = potentials[i + 1][j] / 100;
                p4 = potentials[i][j + 1] / 100;
                p8 = potentials[i + 1][j + 1] / 100;
                var square = (p1 >= 0.2 ? 1 : 0) +
                    (p2 >= 0.2 ? 2 : 0) +
                    (p4 >= 0.2 ? 4 : 0) +
                    (p8 >= 0.2 ? 8 : 0);
                squares[square](i * PARAMS.gridSpace, j * PARAMS.gridSpace, p1, p2, p4, p8);
            }
        }
    }
};
