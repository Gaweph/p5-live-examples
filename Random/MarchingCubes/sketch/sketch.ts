var marchingCubes: MarchingCubes[];
var colors: p5.Color[];

var PARAMS = {
    gridSpace: 10,
    strength: 1.8,
    stickyVal: 0.2,
    
    // controls
    showGrid: true,
    showPoints: true
    // maxSpeed: 4,
    // sizeRange: 65,
    // minSize: 35
};

function setup() {
    createCanvas(windowWidth, windowHeight);

    var numpoints = 40;
    marchingCubes = [];
    var rainbow = ColorHelper.getColorsArray(floor(width));
    // var reds = ColorHelper.getColorsArray(floor(width), 100, [color('red'), color('orange')]);
    // var greys = ColorHelper.getColorsArray(floor(width), 50, [color('grey'), color('grey')]);

    var maxSpeed = 4;
    var sizeRange = 65;
    var minSize = 35;
    marchingCubes[0] = new MarchingCubes(numpoints, rainbow, maxSpeed, sizeRange, minSize);
    // marchingCubes[1] = new MarchingCubes(numpoints, rainbow, maxSpeed, sizeRange, minSize);
    // marchingCubes[2] = new MarchingCubes(numpoints, greys, maxSpeed, sizeRange, minSize);
    
    // noLoop();
    frameRate(30);
}

function draw() {
    background(1);

    var pointColor = color('white');
    pointColor.setAlpha(100);
    var gridColor = color('#f00');
    for(let m of marchingCubes) {

        // DeltaTime
        m.move();

        if(PARAMS.showPoints) {
            m.drawPoints(pointColor);
        }
        
        if(PARAMS.showGrid) {
            m.drawGrid(gridColor);
        }

        m.draw();
    }
    // marchingCubes[0].move();
    // // marchingCubes.drawGrid();
    // // marchingCubes.drawPoints();
    // marchingCubes[0].draw();

    // marchingCubes[1].move();
    // marchingCubes[1].draw();

    textSize(15);
    noStroke();
    fill(255);
    text('fps: ' + frameRate(), 10, 50);
}
