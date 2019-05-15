//Original - https://codepen.io/kzf/pen/dPoqgK
class MarchingCubes {
    
    points: Point[];
    squares: ((x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {start: p5.Vector, end: p5.Vector})[];
    lines: {start: p5.Vector, end: p5.Vector}[];
    constructor(private gridSpace: number, private numPoints: number, private strength: number, private colors: p5.Color[]) {
        this.setupSquares();
        this.setupPoints();
    }

    move() {
        for (let p of this.points) {
            p.x += p.vx;
            p.y += p.vy;

            if(p.x < 0 || p.x > width) {
                p.vx *= -1;
            }
            if(p.y < 0 || p.y > height) {
                p.vy *= -1;
            }
        };
        
        this.generateLines();
    }

    draw() {
        // drawGrid();
        this.drawPoints();
        this.drawLines();

    }

    setupPoints() {
        var colorsArray = ColorHelper.getColorsArray(this.numPoints, this.colors);
        this.points = [];
        var i;
        for (i = 0; i < this.numPoints; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            var vx = Math.random() * 3 - 1;
            var vy = Math.random() * 3 - 1;
            var r = (Math.random() * 65) + 25;
            var color = colorsArray[i];
            this.points[i] = new Point(x,y,vx,vy,r, color);
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
        for (var i = 0; i < width/this.gridSpace; i++) {
            line(i*this.gridSpace, 0, i*this.gridSpace, height);
        }
        for (var j = 0; j < height/this.gridSpace; j++) {;
            line(0, j*this.gridSpace, width, j*this.gridSpace);
        }
    };

    generateLines() {
        var potentials: number[][] = [];
        // Initialise potentials
        var imax = Math.ceil(width/this.gridSpace);
        var jmax = Math.ceil(height/this.gridSpace);
        for (var i = 0; i < imax; i++) {
            potentials[i] = [];
            for (var j = 0; j < jmax; j++) {
            potentials[i][j] = 0;
            }
        }
        // Add Potentials from points
        
        for (let p of this.points) {
            var i = Math.max(0, Math.floor((p.x - this.strength)/this.gridSpace));
            var j = Math.max(0, Math.floor((p.y - this.strength)/this.gridSpace));
            var ilim = Math.min(imax, i + 1 + Math.ceil(this.strength*2/this.gridSpace));
            var jlim = Math.min(jmax, j + 1 + Math.ceil(this.strength*2/this.gridSpace));
            
            var j0;
            for (; i < ilim; i++) {
                for (j0 = j; j0 < jlim; j0++) {
                    potentials[i][j0] += Math.max(0, (p.r - dist(p.x, p.y, i*this.gridSpace, j0*this.gridSpace)));
                }
            }
        };

        this.lines = [];
        var p1, p2, p4, p8;
        var imax = Math.ceil(width/this.gridSpace);
        var jmax = Math.ceil(height/this.gridSpace);
        for (var i = 0; i < imax-1; i++) {
            for (var j = 0; j < jmax-1; j++) {
                p1 = potentials[i][j]/100;
                p2 = potentials[i+1][j]/100;
                p4 = potentials[i][j+1]/100;
                p8 = potentials[i+1][j+1]/100;

                var square = (p1 >= 0.2 ? 1 : 0) +
                (p2 >= 0.2 ? 2 : 0) +
                (p4 >= 0.2 ? 4 : 0) +
                (p8 >= 0.2 ? 8 : 0);

                var linePoints = this.squares[square](
                    i*this.gridSpace, j*this.gridSpace, p1, p2, p4, p8
                );

                if(linePoints != null) {
                    this.lines.push(linePoints);
                }
                
            }
        }
        
    }

    drawLines() {
        stroke('black');
        strokeWeight(1);

        for (let l of this.lines) {
            line(l.start.x, l.start.y, l.end.x, l.end.y);
        }
    }
    
    side(a: number, b: number) {
        return this.gridSpace*((0.2 - a)/(b-a));
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
        this.squares[0] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            // 0 means no corner is in the surface so do nothing
            return null;
        };
        this.squares[1] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
        
            var start = createVector(x, y + this.gridSpace - this.side(p4, p1));
            var end =  createVector(x + this.gridSpace - this.side(p2, p1), y);    
            return {start, end};
        }
        this.squares[2] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x + this.side(p1, p2), y);
            var end =  createVector(x + this.gridSpace, y + this.gridSpace - this.side(p8, p2));

            return {start, end};
            
        }
        this.squares[3] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x, y + this.gridSpace - this.side(p4, p1));
            var end =  createVector(x + this.gridSpace, y + this.gridSpace - this.side(p8, p2));
            return {start, end};
            
        }
        this.squares[4] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x, y + this.side(p1, p4));
            var end =  createVector(x + this.gridSpace - this.side(p8, p4), y + this.gridSpace);
            return {start, end};
            
        }
        this.squares[5] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x + this.gridSpace - this.side(p2, p1), y);
            var end =  createVector(x + this.gridSpace - this.side(p8, p4), y + this.gridSpace);
            return {start, end};
            
        }
        this.squares[6] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            // 'Saddle' case where there are to ways to draw the surface.
            // Due to the shape of the blobs here this case will rarely occur
            // and if it does will be so temporary that it I am okay
            // with leaving these cases blank. If anyone forks and implements
            // them let me know!
            return null;
        }
        this.squares[7] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x + this.gridSpace - this.side(p8, p4), y + this.gridSpace);
            var end =  createVector(x + this.gridSpace, y + this.gridSpace - this.side(p8, p2));
            return {start, end};
            
        }
        this.squares[8] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x + this.side(p4, p8), y + this.gridSpace);
            var end =  createVector(x + this.gridSpace, y + this.side(p2, p8));
            return {start, end};
            
        }
        this.squares[9] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            // 'Saddle' case where there are to ways to draw the surface.
            return null;
        }
        this.squares[10] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x + this.side(p1, p2), y);
            var end =  createVector(x + this.side(p4, p8), y + this.gridSpace);
            return {start, end};
            
        }
        this.squares[11] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x, y + this.gridSpace - this.side(p4, p1));
            var end =  createVector(x + this.side(p4, p8), y  + this.gridSpace);
            return {start, end};
            
        }
        this.squares[12] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x, y + this.side(p1, p4));
            var end =  createVector(x + this.gridSpace, y + this.side(p2, p8));
            return {start, end};
            
        }
        this.squares[13] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            
            var start = createVector(x + this.gridSpace - this.side(p2, p1), y);
            var end =  createVector(x + this.gridSpace, y + this.side(p2, p8));
            return {start, end};
            
        }
        this.squares[14] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
        
            var start = createVector(x, y + this.side(p1, p4));
            var end =  createVector(x + this.side(p1, p2), y);
            return {start, end};
            
        }
        this.squares[15] = (x:number, y:number, p1:number, p2:number, p4:number, p8:number) => {
            // 15 means every corner is in the surface so do nothing
            return null;
        }
    }
}