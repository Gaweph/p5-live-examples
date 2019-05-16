/***
An implementation of the Marching Squares algorithm for computing an isosurface.
http://en.wikipedia.org/wiki/Marching_squares
***/

// Parameters that can be edited by dat.GUI

var marchingCubes: MarchingCubes;
var colors: p5.Color[];

var PARAMS = {
    gridSpace: 10,
    strength: 1.8,
    stickyVal: 0.2,
    maxSpeed: 4,
    sizeRange: 65,
    minSize: 35
};

function setup() {
    createCanvas(windowWidth, windowHeight);

    var numpoints = 40;
    marchingCubes = new MarchingCubes(numpoints);

    // noLoop();
    frameRate(30);
}

function draw() {
    background(1);

    marchingCubes.move();

    // marchingCubes.drawGrid();
    // marchingCubes.drawPoints();

    marchingCubes.draw();


    textSize(15);
    noStroke();
    fill(255);
    text('frameRate: ' + frameRate(), 10, 50);
}
