/***
An implementation of the Marching Squares algorithm for computing an isosurface.
http://en.wikipedia.org/wiki/Marching_squares
***/

// Parameters that can be edited by dat.GUI

var marchingCubes: MarchingCubes[];
var colors: p5.Color[];
function setup() {
    createCanvas(windowWidth, windowHeight);
    var gridSpace = 10;
    var numpoints = 50;
    var strength = 100;
    marchingCubes = [];

    var reds = [color('red'),color ('orange')];
    var purples = [color('indigo'),color ('violet')];

    marchingCubes[0] = new MarchingCubes(gridSpace, numpoints / 2, strength, reds);
    marchingCubes[1] = new MarchingCubes(gridSpace, numpoints / 2, strength, purples);

}

function draw() {
    background(255);
    marchingCubes[0].move();
    marchingCubes[0].draw();
    marchingCubes[1].move();
    marchingCubes[1].draw();
}
