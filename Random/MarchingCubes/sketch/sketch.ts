/***
An implementation of the Marching Squares algorithm for computing an isosurface.
http://en.wikipedia.org/wiki/Marching_squares
***/

// Parameters that can be edited by dat.GUI

var marchingCubes: MarchingCubes;
var colors: p5.Color[];
function setup() {
    createCanvas(windowWidth, windowHeight);
    var gridSpace = 10;
    var numpoints = 50;
    var strength = 100;

    marchingCubes = new MarchingCubes(gridSpace, numpoints, strength);

}

function draw() {
    background(1);
    marchingCubes.move();
    marchingCubes.draw();

    textSize(15);
    noStroke();
    fill(255);
    text(frameRate(), 10, 50);
}
