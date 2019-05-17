var marchingCubes: MarchingCubes;
var PARAMS = {
    gridSpace: 10,
    strength: 1.8,
    stickyVal: 0.2,    
    // controls
    showGrid: false,
    showPoints: false,

    colors: <p5.Color[]>[]
};
var sliderGridSize: p5.Element;

function setup() {
    createCanvas(windowWidth, windowHeight);

    var numpoints = 40;

    var maxSpeed = 4;
    var sizeRange = 65;
    var minSize = 35;
    marchingCubes = new MarchingCubes(numpoints, maxSpeed, sizeRange, minSize);
    
    setupGui();

    // noLoop();
    frameRate(30);
}

function setupGui() {

    // controls
    var chkShowGrid = createCheckbox(' Grid', PARAMS.showGrid);
    chkShowGrid.position(10, 60);
    chkShowGrid.style('color', 'white');
    chkShowGrid.style('font-weight', 'bold');
    sliderGridSize = createSlider(5, 50, 10, 1);
    sliderGridSize.position(80, 60);
    
    (<any>chkShowGrid).changed(() => {PARAMS.showGrid = (<any>chkShowGrid).checked()});
    var chkShowPoints = createCheckbox(' Points', PARAMS.showPoints);
    chkShowPoints.position(10, 90);
    chkShowPoints.style('color', 'white');
    chkShowPoints.style('font-weight', 'bold');
    (<any>chkShowPoints).changed(() => {PARAMS.showPoints = (<any>chkShowPoints).checked()});

    var colorSelect = createSelect();
    colorSelect.position(10, 10);
    (<any>colorSelect).option('rainbow', "");
    (<any>colorSelect).option('red', ['red', 'orange']);
    (<any>colorSelect).option('green', ['yellow', 'green']);
    (<any>colorSelect).option('blue', ['blue', 'indigo', 'violet']);
    (<any>colorSelect).changed(() => {
        var val = (<string>colorSelect.value());
        var colors = val === "" ? null : val.split(",").map(x=>color(x));
        marchingCubes.setColors(colors);
    });
    
}

function draw() {
    background(1);

    var pointColor = color('white');
    pointColor.setAlpha(150);
    var gridColor = color('#f00');

    // SET PARAMS
    PARAMS.gridSpace = <number>sliderGridSize.value()
    
    marchingCubes.move();
    if(PARAMS.showPoints) {
        marchingCubes.drawPoints(pointColor);
    }    
    if(PARAMS.showGrid) {
        marchingCubes.drawGrid(gridColor);
    }
    marchingCubes.draw();
    

    textSize(15);
    noStroke();
    fill(255);
    text('fps: ' + frameRate(), 10, 50);
}

