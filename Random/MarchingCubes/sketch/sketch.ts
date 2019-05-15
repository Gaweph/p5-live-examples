/***
An implementation of the Marching Squares algorithm for computing an isosurface.
http://en.wikipedia.org/wiki/Marching_squares
***/

// Parameters that can be edited by dat.GUI

var marchingCubes: MarchingCubes;
var colors: p5.Color[];

var PARAMS = {
    gridSpace: 15,
    strength: 1.8,
    stickyVal: 0.2
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


    // textSize(15);
    // noStroke();
    // fill(255);
    // text(frameRate(), 10, 50);
}
