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

    // var reds = [color('red'),color ('orange')];
    var purples = [
        color(38,58,150), // blue
        color('indigo'),
        color('violet')
    ];

    marchingCubes = new MarchingCubes(gridSpace, numpoints / 2, strength, [...purples]);    

}

function draw() {
    background(1);
    marchingCubes.move();
    marchingCubes.draw();
}
