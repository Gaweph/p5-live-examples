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
        if (i > -1 && i < cols && j > -1 && j < rows) { //valid i,j combo?

          if(xoff == 0 && yoff == 0) { 
            //its me
          }
          else {
            this.neighbors.push(grid[i][j]);
          }
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
          fill(color('red'));
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

  drawHighlightBorder() {

    this.neighbors.forEach((neighbor)=>{
      var neighbourIsUnknownOrBee = !neighbor.revealed || neighbor.bee;
      if (this.revealed && neighbourIsUnknownOrBee) {
                
	      push();
        translate(neighbor.x + neighbor.w * 0.5, neighbor.y + neighbor.w * 0.5);
        neighbor.neighbors.forEach((n)=>{
          if(n.revealed) {

            //draw a line between n and neighbor
            var x1 = 0;
            var y1 = 0;
            var x2 = 0;
            var y2 = 0;
            var xoff = n.i - neighbor.i;
            var yoff = n.j - neighbor.j;

            textAlign(CENTER);

            //pick a color for the line
            stroke(colors[n.j]);

            fill(0);
            var draw = false;
            if(xoff == -1 && yoff == 0) {
              line(-n.w/2, -n.w/2, -n.w/2, n.w/2);
              draw = true;
            }
            else if(xoff == 1 && yoff == 0) {
              line(n.w/2, -n.w/2, n.w/2, n.w/2);
              draw = true;
            }
            else if(xoff == 0 && yoff == -1) {
              line(-n.w/2, -n.w/2,n.w/2,-n.w/2);
              draw = true;
            }
            else if(xoff == 0 && yoff == 1) {
              line(-n.w/2, n.w/2,n.w/2,n.w/2);
              draw = true;
            }
            var x = (n.w * 0.5 * xoff);
            var y = (n.w * 0.5 * yoff);
          }
        });
        pop();

      }
    });

    // if(this.highlight) {
    //   stroke(color('red'));
    //   strokeWeight(5);
    //   noFill();
    //   rect(this.x, this.y, this.w, this.w);
    // }    
  }

}