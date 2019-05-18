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
    points.push(new Point(5 * PARAMS.pointSize, 2 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(5 * PARAMS.pointSize, 3 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(5 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(6 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(6 * PARAMS.pointSize, 5 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(6 * PARAMS.pointSize, 6 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))

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

    // push();
    // stroke('green');
    // strokeWeight(5);
    // for (let p of points) {

    //     p.draw();
    // }
    // pop();
    // MarchingSquaresHelper.drawForCombination(0, 0, '0000');
    // MarchingSquaresHelper.drawForCombination(0, 1, '0001');
    // MarchingSquaresHelper.drawForCombination(0, 2, '0010');
    // MarchingSquaresHelper.drawForCombination(0, 3, '0011');
    // MarchingSquaresHelper.drawForCombination(1, 0, '0100');
    // MarchingSquaresHelper.drawForCombination(1, 1, '0101');
    // MarchingSquaresHelper.drawForCombination(1, 2, '0110');
    // MarchingSquaresHelper.drawForCombination(1, 3, '0111');
    // MarchingSquaresHelper.drawForCombination(2, 0, '1000');
    // MarchingSquaresHelper.drawForCombination(2, 1, '1001');
    // MarchingSquaresHelper.drawForCombination(2, 2, '1010');
    // MarchingSquaresHelper.drawForCombination(2, 3, '1011');
    // MarchingSquaresHelper.drawForCombination(3, 0, '1100');
    // MarchingSquaresHelper.drawForCombination(3, 1, '1101');
    // MarchingSquaresHelper.drawForCombination(3, 2, '1110');
    // MarchingSquaresHelper.drawForCombination(3, 3, '1111');

    textSize(15);
    noStroke();
    fill(255);
    text('fps: ' + frameRate(), 10, 50);

}


