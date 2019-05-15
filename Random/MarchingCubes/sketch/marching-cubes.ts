//Original - https://codepen.io/kzf/pen/dPoqgK

type Line = { x1: number, y1: number, x2: number, y2: number };
class MarchingCubes {

    points: Point[];
    squares: ((x: number, y: number, p1: number, p2: number, p4: number, p8: number) => Line)[];
    lines: Line[];
    colorsArray: p5.Color[];
    constructor(private numPoints: number) {
        this.setupSquares();
        this.setupPoints();

        this.colorsArray = ColorHelper.getColorsArray(floor(width));
        this.generateLines();
    }

    move() {
        for (let p of this.points) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) {
                p.vx *= -1;
            }
            if (p.y < 0 || p.y > height) {
                p.vy *= -1;
            }
        };

        this.generateLines();
    }

    draw() {
        strokeWeight(2);
        for (let l of this.lines) {
            stroke(this.colorsArray[floor(l.x1)]);
            line(l.x1, l.y1, l.x2, l.y2);
        }

    }

    setupPoints() {
        this.points = [];
        var i;
        for (i = 0; i < this.numPoints; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            var vx = Math.random() * 3 - 1;
            var vy = Math.random() * 3 - 1;
            var r = (Math.random() * 45) + 45;
            this.points[i] = new Point(x, y, vx, vy, r);
        }
    }

    drawPoints() {
        for (let p of this.points) {
            p.draw();
        };
    };

    drawGrid() {
        stroke('#f00');
        strokeWeight(0.2);
        for (var i = 0; i < width / PARAMS.gridSpace; i++) {
            line(i * PARAMS.gridSpace, 0, i * PARAMS.gridSpace, height);
        }
        for (var j = 0; j < height / PARAMS.gridSpace; j++) {
            ;
            line(0, j * PARAMS.gridSpace, width, j * PARAMS.gridSpace);
        }
    };

    generateLines() {
        var potentials: number[][] = [];
        // Initialise potentials
        var imax = Math.ceil(width / PARAMS.gridSpace);
        var jmax = Math.ceil(height / PARAMS.gridSpace);
        for (var i = 0; i < imax; i++) {
            potentials[i] = [];
            for (var j = 0; j < jmax; j++) {
                potentials[i][j] = 0;
            }
        }
        // Add Potentials from points

        for (let p of this.points) {

            var str = (p.r / 2) * PARAMS.strength;
            var strengthFactor = Math.ceil(str * 2 / PARAMS.gridSpace);
            var i = Math.max(0, Math.floor((p.x - str) / PARAMS.gridSpace));
            var j = Math.max(0, Math.floor((p.y - str) / PARAMS.gridSpace));
            var ilim = Math.min(imax, i + 1 + strengthFactor);
            var jlim = Math.min(jmax, j + 1 + strengthFactor);

            var j0;
            for (; i < ilim; i++) {
                for (j0 = j; j0 < jlim; j0++) {
                    potentials[i][j0] += Math.max(0, (p.r - dist(p.x, p.y, i * PARAMS.gridSpace, j0 * PARAMS.gridSpace)));
                    // stroke('#f00');
                    // strokeWeight(0.2);
                    // circle(i * PARAMS.gridSpace, j0 * PARAMS.gridSpace, 2);
                    // console.log(i, j0);
                }
            }
        };

        this.lines = [];
        var p1, p2, p4, p8;
        var c1, c2, c4, c8;
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

                var linePoints = this.squares[square](
                    i * PARAMS.gridSpace, j * PARAMS.gridSpace, p1, p2, p4, p8
                );
                // console.log(square, i * PARAMS.gridSpace, j * PARAMS.gridSpace, p1, p2, p4, p8);
                if (linePoints != null) {
                    // var c = random([c1, c2, c4, c8]);
                    this.lines.push(linePoints);
                }

            }
        }

    }

    side(a: number, b: number) {
        return PARAMS.gridSpace * ((PARAMS.stickyVal - a) / (b - a));
    }

    /****
    For each grid square I label the corners as follows:

        1---2
        |   |
        4---8

    Then for each grid square add up the numbers at the corners which are
    INSIDE the isosurface. The squares function at that index will draw the 
    line segment at the right place inside the grid cell.
    ****/
    setupSquares() {
        this.squares = [];
        this.squares[0] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {
            // 0 means no corner is in the surface so do nothing
            return null;
        };
        this.squares[1] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x;
            var y1 = y + PARAMS.gridSpace - this.side(p4, p1);
            var x2 = x + PARAMS.gridSpace - this.side(p2, p1);
            var y2 = y
            return { x1, y1, x2, y2 };
        }
        this.squares[2] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x + this.side(p1, p2);
            var y1 = y;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + PARAMS.gridSpace - this.side(p8, p2);
            return { x1, y1, x2, y2 };

        }
        this.squares[3] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x;
            var y1 = y + PARAMS.gridSpace - this.side(p4, p1);
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + PARAMS.gridSpace - this.side(p8, p2);
            return { x1, y1, x2, y2 };

        }
        this.squares[4] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x;
            var y1 = y + this.side(p1, p4);
            var x2 = x + PARAMS.gridSpace - this.side(p8, p4);
            var y2 = y + PARAMS.gridSpace;
            return { x1, y1, x2, y2 };

        }
        this.squares[5] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x + PARAMS.gridSpace - this.side(p2, p1);
            var y1 = y;
            var x2 = x + PARAMS.gridSpace - this.side(p8, p4);
            var y2 = y + PARAMS.gridSpace;
            return { x1, y1, x2, y2 };

        }
        this.squares[6] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {
            // 'Saddle' case where there are to ways to draw the surface.
            // Due to the shape of the blobs here this case will rarely occur
            // and if it does will be so temporary that it I am okay
            // with leaving these cases blank. If anyone forks and implements
            // them let me know!
            return null;
        }
        this.squares[7] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x + PARAMS.gridSpace - this.side(p8, p4);
            var y1 = y + PARAMS.gridSpace;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + PARAMS.gridSpace - this.side(p8, p2);
            return { x1, y1, x2, y2 };

        }
        this.squares[8] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x + this.side(p4, p8);
            var y1 = y + PARAMS.gridSpace;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + this.side(p2, p8);
            return { x1, y1, x2, y2 };

        }
        this.squares[9] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {
            // 'Saddle' case where there are to ways to draw the surface.
            return null;
        }
        this.squares[10] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x + this.side(p1, p2);
            var y1 = y;
            var x2 = x + this.side(p4, p8);
            var y2 = y + PARAMS.gridSpace;
            return { x1, y1, x2, y2 };

        }
        this.squares[11] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x;
            var y1 = y + PARAMS.gridSpace - this.side(p4, p1);
            var x2 = x + this.side(p4, p8);
            var y2 = y + PARAMS.gridSpace;
            return { x1, y1, x2, y2 };

        }
        this.squares[12] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x;
            var y1 = y + this.side(p1, p4);
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + this.side(p2, p8);
            return { x1, y1, x2, y2 };

        }
        this.squares[13] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x + PARAMS.gridSpace - this.side(p2, p1);
            var y1 = y;
            var x2 = x + PARAMS.gridSpace;
            var y2 = y + this.side(p2, p8);
            return { x1, y1, x2, y2 };

        }
        this.squares[14] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {

            var x1 = x;
            var y1 = y + this.side(p1, p4);
            var x2 = x + this.side(p1, p2);
            var y2 = y;
            return { x1, y1, x2, y2 };

        }
        this.squares[15] = (x: number, y: number, p1: number, p2: number, p4: number, p8: number) => {
            // 15 means every corner is in the surface so do nothing
            return null;
        }
    }
}