class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.w = w;
        this.neighborsWithBeesCount = 0;
        this.revealed = false;
        this.setW(w);
    }
    setW(w) {
        this.x = this.i * w;
        this.y = this.j * w;
        this.w = w;
    }
    init() {
        this.neighbors = new Array();
        for (var xoff = -1; xoff <= 1; xoff++) {
            for (var yoff = -1; yoff <= 1; yoff++) {
                var i = this.i + xoff;
                var j = this.j + yoff;
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    this.neighbors.push(grid[i][j]);
                }
            }
        }
        this.neighborsWithBeesCount = this.neighbors.filter((n) => { return n.bee; }).length;
    }
    contains(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }
    reveal() {
        this.revealed = true;
        if (this.neighborsWithBeesCount == 0) {
            this.floodFill();
        }
    }
    floodFill() {
        this.neighbors.forEach((neighbor) => {
            if (!neighbor.bee && !neighbor.revealed) {
                neighbor.reveal();
            }
        });
    }
    show() {
        strokeWeight(1);
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        if (this.revealed) {
            if (this.bee) {
                fill(127);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            }
            else {
                fill(200);
                rect(this.x, this.y, this.w, this.w);
                if (this.neighborsWithBeesCount > 0) {
                    textAlign(CENTER);
                    fill(0);
                    text(this.neighborsWithBeesCount + '', this.x + this.w * 0.5, this.y + this.w * 0.6);
                }
            }
        }
    }
}
//# sourceMappingURL=cell.js.map