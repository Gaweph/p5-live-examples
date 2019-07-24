var PARAMS = {
    gridSize: 15,
    maxPointSize: 10,
    numberOfpoints: 100,
    colorsArray: <p5.Color[]>[]
};
var points: Point[];
var sliderGridSize: p5.Element;
var canvas: p5.Renderer;
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);


    points = [];

    for (var i = 0; i < PARAMS.numberOfpoints; i++) {
        var x = Math.random();
        var y = Math.random();
        var velocityX = Math.random() * 2 - 1;
        var velocityY = Math.random() * 2 - 1;
        var size = Math.random();// * PARAMS.maxPointSize;
        points.push(new Point(x, y, velocityX, velocityY, size))

    }
    sliderGridSize = createSlider(2, 30, PARAMS.gridSize, 2);
    sliderGridSize.position(10, 10);

    setParams();
}

window.addEventListener('resize', function () {
    canvas.size(windowWidth, windowHeight);
    setParams();
});

function setParams() {
    PARAMS.colorsArray = ColorHelper.getColorsArray(floor(width));
    PARAMS.maxPointSize = width / 15;
}
function draw() {
    background(1);

    PARAMS.gridSize = <number>sliderGridSize.value();

    strokeWeight(2);
    var arr = MarchingSquaresHelper.getCurrentPointArray(points);
    MarchingSquaresHelper.drawSquares(arr);

    for (let p of points) {
        p.move();
    };

    textSize(15);
    noStroke();
    fill(255);
    text('fps: ' + frameRate(), 10, 50);

}


