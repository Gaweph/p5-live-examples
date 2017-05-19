let grid;
let cols = 25;
let rows = 25;
let totalBees = 50;
let w;
let padding = 15;
let colors;
function windowResized() {
    var gridSize = min([windowWidth - padding, windowHeight - padding]);
    resizeCanvas(gridSize, gridSize);
    w = floor(gridSize / cols);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].setW(w);
        }
    }
}
function placeBees(beeCount) {
    var options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }
    for (var n = 0; n < beeCount; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        options.splice(index, 1);
        grid[i][j].bee = true;
    }
}
function setup() {
    colors = ColorHelper.getColorsArray(rows);
    var gridSize = min([windowWidth - padding, windowHeight - padding]);
    createCanvas(gridSize, gridSize);
    w = floor(gridSize / cols);
    grid = Helper.make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }
    placeBees(totalBees);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].init();
        }
    }
}
function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}
function mousePressed() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var cell = grid[i][j];
            if (cell.contains(mouseX, mouseY)) {
                cell.reveal();
                if (grid[i][j].bee) {
                    gameOver();
                }
            }
        }
    }
}
function draw() {
    background(255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var cell = grid[i][j];
            cell.show();
        }
    }
    strokeWeight(4);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var cell = grid[i][j];
            cell.drawHighlightBorder();
        }
    }
}
//# sourceMappingURL=sketch.js.map