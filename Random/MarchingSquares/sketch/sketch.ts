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
    canvas = createCanvas(windowWidth, windowHeight)
    // PARAMS.gridSize = width / 10;

    PARAMS.maxPointSize = width / 15;
    points = [];

    for (var i = 0; i < PARAMS.numberOfpoints; i++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        var velocityX = Math.random() * 2 - 1;
        var velocityY = Math.random() * 2 - 1;
        var size = Math.random() * PARAMS.maxPointSize;
        points.push(new Point(x, y, velocityX, velocityY, size))

    }
    sliderGridSize = createSlider(2, 30, PARAMS.gridSize, 2);
    sliderGridSize.position(10, 10);

    PARAMS.colorsArray = ColorHelper.getColorsArray(floor(width));
}
window.onresize = function () {
    canvas.size(windowWidth, windowHeight);
};
function draw() {
    background(1);

    PARAMS.gridSize = <number>sliderGridSize.value();

    strokeWeight(2);
    var arr = MarchingSquaresHelper.getCurrentPointArray(points);
    MarchingSquaresHelper.drawSquares(arr);

    for (let p of this.points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.r < 0 || p.x + p.r > width) {
            p.vx *= -1;
        }
        if (p.y - p.r < 0 || p.y + p.r > height) {
            p.vy *= -1;
        }
    };

    textSize(15);
    noStroke();
    fill(255);
    text('fps: ' + frameRate(), 10, 50);

}


