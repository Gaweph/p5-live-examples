class Cell {

    x :number;
    y :number;
    neighborsWithBeesCount = 0;
    bee: boolean;
    revealed: boolean = false;
    neighbors: Cell[];

  constructor(public i: number, public j: number, public w: number) {
    this.setW(w);
  }

  setW(w: number) {
    this.x = this.i * w;
    this.y = this.j * w;
    this.w = w;
  }
  
  init() {

    //set neighbors array
    this.neighbors = new Array<Cell>();
      for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        var i = this.i + xoff;
        var j = this.j + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          this.neighbors.push(grid[i][j]);
        }
      }
    }
    this.neighborsWithBeesCount = this.neighbors.filter((n) => {return n.bee;}).length;
  }

  contains(x: number, y: number) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
  }

  reveal() {
    this.revealed = true;
    if (this.neighborsWithBeesCount == 0) {
      // flood fill time
      this.floodFill();
    }
  }

  floodFill() {
    this.neighbors.forEach((neighbor)=>{
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

        //draw something
        if (this.bee) {
          fill(127);
          ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
          fill(200);
          rect(this.x, this.y, this.w, this.w);
          if (this.neighborsWithBeesCount > 0) {
            textAlign(CENTER);
            fill(0);
            text(this.neighborsWithBeesCount + '', this.x + this.w * 0.5, this.y+ this.w * 0.6);
          }
        }
      }
  }

  // public highlight = false;
  // drawHighlightBorder() {

  //   //up
  //   var i = this.i + 0; //xoff
  //   var j = this.j + -1; //yoff
  //   if (i > -1 && i < cols && j > -1 && j < rows) {
  //     var neighbor = grid[i][j];
  //     if (!neighbor.bee && !neighbor.revealed) {
  //       neighbor.reveal();
  //     }
  //   }

  //   //

  //   if(this.highlight) {
  //     stroke(color('red'));
  //     strokeWeight(5);
  //     noFill();
  //     rect(this.x, this.y, this.w, this.w);
  //   }    
  // }

}