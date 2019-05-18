var PARAMS = {
    gridSize: 10,
    pointSize: 10
};
var points: Point[];
var combinations: (() => void)[];
function setup() {
    createCanvas(600, 600);

    PARAMS.gridSize = width / 20;

    PARAMS.pointSize = PARAMS.gridSize;
    points = [];
    points.push(new Point(2 * PARAMS.pointSize, 2 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(2 * PARAMS.pointSize, 3 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(2 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(3 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))
    points.push(new Point(3 * PARAMS.pointSize, 4 * PARAMS.pointSize, 0, 0, PARAMS.pointSize))

    // http://www.huderlem.com/demos/marchingsquares.html
    combinations = [];
    // '0000'
    combinations[0] = () => {


    };


}

function draw() {
    background(1);

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

    for (let p of points) {
        p.draw();
    }

    push();
    translate(5 * PARAMS.gridSize, 5 * PARAMS.gridSize);
    scale(PARAMS.gridSize);
    strokeWeight(1 / PARAMS.gridSize);
    // draw the marchng squares combos
    combinations[parseInt('0001', 2)]();
    pop();

}



