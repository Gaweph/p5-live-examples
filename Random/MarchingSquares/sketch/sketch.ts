var PARAMS = {
    gridSize: 10,
    pointSize: 10
};
var points: Point[];
var sliderGridSize: p5.Element;

function setup() {
    createCanvas(600, 600);

    PARAMS.gridSize = width / 10;

    PARAMS.pointSize = PARAMS.gridSize;
    points = [];

    points.push(new Point(5 * PARAMS.pointSize, 2 * PARAMS.pointSize, Math.random() * 2 - 1, Math.random() * 2 - 1, PARAMS.pointSize))
    points.push(new Point(5 * PARAMS.pointSize, 3 * PARAMS.pointSize, Math.random() * 2 - 1, Math.random() * 2 - 1, PARAMS.pointSize))
    points.push(new Point(5 * PARAMS.pointSize, 4 * PARAMS.pointSize, Math.random() * 2 - 1, Math.random() * 2 - 1, PARAMS.pointSize * 1.5))
    points.push(new Point(6 * PARAMS.pointSize, 4 * PARAMS.pointSize, Math.random() * 2 - 1, Math.random() * 2 - 1, PARAMS.pointSize * 2))
    points.push(new Point(6 * PARAMS.pointSize, 5 * PARAMS.pointSize, Math.random() * 2 - 1, Math.random() * 2 - 1, PARAMS.pointSize))
    points.push(new Point(6 * PARAMS.pointSize, 6.2 * PARAMS.pointSize, Math.random() * 2 - 1, Math.random() * 2 - 1, PARAMS.pointSize * 2))

    sliderGridSize = createSlider(2, 30, PARAMS.gridSize, 2);
    sliderGridSize.position(10, 10);

    //noLoop();
}

function draw() {
    background(1);

    // SET PARAMS
    PARAMS.gridSize = <number>sliderGridSize.value();

    //console.log(sliderGridSize.value(), PARAMS.gridSize);
    // draw grid
    stroke('red');
    strokeWeight(0.4);
    push();
    //translate(PARAMS.pointSize / 2, PARAMS.pointSize / 2);
    for (var i = 0; i < width / PARAMS.gridSize; i++) {
        line(i * PARAMS.gridSize, 0, i * PARAMS.gridSize, height);
    }
    for (var j = 0; j < height / PARAMS.gridSize; j++) {
        line(0, j * PARAMS.gridSize, width, j * PARAMS.gridSize);
    }
    pop();


    var arr = MarchingSquaresHelper.getCurrentPointArray(points);
    MarchingSquaresHelper.drawSquares(arr);

    push();
    var c = color('green');
    c.setAlpha(100);
    stroke(c);
    alpha
    strokeWeight(1);
    noFill();
    for (let p of points) {

        p.draw();
    }
    pop();

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


