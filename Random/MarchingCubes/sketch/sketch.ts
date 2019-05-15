/***
An implementation of the Marching Squares algorithm for computing an isosurface.
http://en.wikipedia.org/wiki/Marching_squares
***/

// Parameters that can be edited by dat.GUI
 var PARAMS = {
   numpoints: 50,
   rRange: 65,
   rMin: 25,
   gridSpace: 10,
   strength: 100
 }

function setup() {
    createCanvas(windowWidth, windowHeight);
    generatePoints();
}

function draw() {

    points.forEach(function(p) {
        p.x += p.vx;
        p.y += p.vy;
    });

    background(255);

    // drawGrid();
    // drawPoints();
    generateLines();
}

// Distance between two points
function dist(x: number, y: number, a: number, b: number) {
    return Math.sqrt((x-a)*(x-a) + (y-b)*(y-b));
}

var points: Point[] = [];

class Point {
   x = Math.random() * width;
   y = Math.random() * height;
   vx = Math.random() * 2 - 1;
   vy = Math.random() * 2 - 1;
   r = Math.random() * PARAMS.rRange + PARAMS.rMin
}

var generatePoints = function() {
  points = [];
  var i, j;
  for (i = 0; i < PARAMS.numpoints; i++) {
    points[i] = new Point();
  }
}
var drawPoints = () => {
    
    stroke('blue');
    strokeWeight(0.5);
        points.forEach(function(p) {
          // ctx.beginPath();
          //arc(p.x, p.y, p.r, 0, 2*Math.PI, false);
          // ctx.fill();
          // arc()
          circle(p.x,p.y, p.r)
        });
};

var drawGrid = () => {
    
    stroke('#f00');
    strokeWeight(0.2);
    for (var i = 0; i < width/PARAMS.gridSpace; i++) {
        line(i*PARAMS.gridSpace, 0, i*PARAMS.gridSpace, height);
    }
    for (var j = 0; j < height/PARAMS.gridSpace; j++) {;
        line(0, j*PARAMS.gridSpace, width, j*PARAMS.gridSpace);
    }
};

var side = function(a: number, b: number) {
  //return PARAMS.gridSpace/2;
  return PARAMS.gridSpace*((0.2 - a)/(b-a));
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
var squares: ((x:number, y:number, p1:number, p2:number, p4:number, p8:number) => void)[] = [];
squares[0] = function (x, y, p1, p2, p4, p8) {
    // 0 means no corner is in the surface so do nothing
  };
squares[1] = function(x, y, p1, p2, p4, p8) {
  
    var start = createVector(x, y + PARAMS.gridSpace - side(p4, p1));
    var end =  createVector(x + PARAMS.gridSpace - side(p2, p1), y);    
    line(start.x, start.y, end.x, end.y);
  }
  squares[2] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x + side(p1, p2), y);
    var end =  createVector(x + PARAMS.gridSpace, y + PARAMS.gridSpace - side(p8, p2));
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[3] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x, y + PARAMS.gridSpace - side(p4, p1));
    var end =  createVector(x + PARAMS.gridSpace, y + PARAMS.gridSpace - side(p8, p2));
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[4] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x, y + side(p1, p4));
    var end =  createVector(x + PARAMS.gridSpace - side(p8, p4), y + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[5] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x + PARAMS.gridSpace - side(p2, p1), y);
    var end =  createVector(x + PARAMS.gridSpace - side(p8, p4), y + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[6] = function(x, y, p1, p2, p4, p8) {
    // 'Saddle' case where there are to ways to draw the surface.
    // Due to the shape of the blobs here this case will rarely occur
    // and if it does will be so temporary that it I am okay
    // with leaving these cases blank. If anyone forks and implements
    // them let me know!
  }
  squares[7] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x + PARAMS.gridSpace - side(p8, p4), y + PARAMS.gridSpace);
    var end =  createVector(x + PARAMS.gridSpace, y + PARAMS.gridSpace - side(p8, p2));
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[8] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x + side(p4, p8), y + PARAMS.gridSpace);
    var end =  createVector(x + PARAMS.gridSpace, y + side(p2, p8));
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[9] = function(x, y, p1, p2, p4, p8) {
    // 'Saddle' case where there are to ways to draw the surface.
  }
  squares[10] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x + side(p1, p2), y);
    var end =  createVector(x + side(p4, p8), y + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[11] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x, y + PARAMS.gridSpace - side(p4, p1));
    var end =  createVector(x + side(p4, p8), y  + PARAMS.gridSpace);
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[12] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x, y + side(p1, p4));
    var end =  createVector(x + PARAMS.gridSpace, y + side(p2, p8));
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[13] = function(x, y, p1, p2, p4, p8) {
    
    var start = createVector(x + PARAMS.gridSpace - side(p2, p1), y);
    var end =  createVector(x + PARAMS.gridSpace, y + side(p2, p8));
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[14] = function(x, y, p1, p2, p4, p8) {
   
    var start = createVector(x, y + side(p1, p4));
    var end =  createVector(x + side(p1, p2), y);
    line(start.x, start.y, end.x, end.y);
    
  }
  squares[15] = function(x, y, p1, p2, p4, p8) {
    // 15 means every corner is in the surface so do nothing
  }

var generateLines = function() {
  var potentials: number[][] = [];
  var imax: number, jmax: number;
  // Initialise potentials
  imax = Math.ceil(width/PARAMS.gridSpace);
  jmax = Math.ceil(height/PARAMS.gridSpace);
  for (var i = 0; i < imax; i++) {
    potentials[i] = [];
    for (var j = 0; j < jmax; j++) {
      potentials[i][j] = 0;
    }
  }
  // Add Potentials from points
  points.forEach(function(p) {
    var i = Math.max(0, Math.floor((p.x - PARAMS.strength)/PARAMS.gridSpace));
    var j = Math.max(0, Math.floor((p.y - PARAMS.strength)/PARAMS.gridSpace));
    var ilim = Math.min(imax, i + 1 + Math.ceil(PARAMS.strength*2/PARAMS.gridSpace));
    var jlim = Math.min(jmax, j + 1 + Math.ceil(PARAMS.strength*2/PARAMS.gridSpace));
   
    var j0;
    for (; i < ilim; i++) {
      for (j0 = j; j0 < jlim; j0++) {
        potentials[i][j0] += Math.max(0, (p.r - dist(p.x, p.y, i*PARAMS.gridSpace, j0*PARAMS.gridSpace)));
      }
    }
  });
  
    stroke('black');
    strokeWeight(1);
    var p1, p2, p4, p8;
    for (i = 0; i < imax-1; i++) {
      for (j = 0; j < jmax-1; j++) {
        p1 = potentials[i][j]/100;
        p2 = potentials[i+1][j]/100;
        p4 = potentials[i][j+1]/100;
        p8 = potentials[i+1][j+1]/100;

        var square = (p1 >= 0.2 ? 1 : 0) +
        (p2 >= 0.2 ? 2 : 0) +
        (p4 >= 0.2 ? 4 : 0) +
        (p8 >= 0.2 ? 8 : 0);
        squares[square](
          i*PARAMS.gridSpace, j*PARAMS.gridSpace, p1, p2, p4, p8
        );
      }
    }
}



/*****
dat.gui
*****/
// var gui = new dat.GUI();
// gui.add(PARAMS, 'numpoints', 0, 100)
//    .onChange(function() {
//       generate();
//     });
// gui.add(PARAMS, 'rRange', 0, 150)
// 	.onChange(function() {
//       generate();
//     });
// gui.add(PARAMS, 'rMin', 0, 100)
// 	.onChange(function() {
//       generate();
//     });
// gui.add(PARAMS, 'gridSpace', 0, 100)
// 	.onChange(function() {
//       generate();
//     });
// gui.add(PARAMS, 'strength', 0, 100)
// 	.onChange(function() {
//       generate();
//     });
// var f1 = gui.addFolder('Colors');
// f1.addColor(PARAMS, 'pointColor');
// f1.add(PARAMS, 'pointAlpha', 0, 1);
// f1.addColor(PARAMS, 'potentialColor');
// f1.add(PARAMS, 'potentialAlpha', 0, 1);
// f1.addColor(PARAMS, 'surfaceColor');
// f1.add(PARAMS, 'surfaceAlpha', 0, 1);
// var f2 = gui.addFolder('Drawing');
// f2.add(PARAMS, 'drawGrid');
// f2.add(PARAMS, 'drawPoints');
// f2.add(PARAMS, 'drawPotentialIn');
// f2.add(PARAMS, 'drawPotentialOut');
// f2.add(PARAMS, 'drawSurface');
// gui.add(PARAMS, 'reset').name("Restart Simulation");