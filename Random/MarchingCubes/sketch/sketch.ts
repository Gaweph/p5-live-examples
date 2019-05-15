/***
An implementation of the Marching Squares algorithm for computing an isosurface.
http://en.wikipedia.org/wiki/Marching_squares
***/

// Parameters that can be edited by dat.GUI

var marchingCubes: MarchingCubes;
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
