
// Minesweeper
let grid:Cell[][];
let cols = 25;
let rows = 25;
let totalBees = 50;
let w: number;
let padding = 15;
let colors: p5.Color[]
//let controls: Controls;

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

function placeBees(beeCount: number) {
  // Pick beeCount spots
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
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].bee = true;
  }
}

function setup() {
  //fullscreen(true);
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

  //init all cells
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].init();
    }
  }

  //TODO: Controls
  // controls = new Controls();
  // controls.setup();
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }

  //TODO: show endgame menu?

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
    //stroke(color('indigo'));

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var cell = grid[i][j];
        cell.drawHighlightBorder();
      }
    }


    
    // foundEdges.forEach((edge)=>{
    //     for (var xoff = -1; xoff <= 1; xoff++) {
    //       for (var yoff = -1; yoff <= 1; yoff++) {
    //         var i = edge.i + xoff;
    //         var j = edge.j + yoff;
    //         if (i > -1 && i < cols && j > -1 && j < rows) {
    //           var neighbor = grid[i][j];
    //           if (!neighbor.bee && !neighbor.revealed) {
    //             //draw outline
                
    //                 fill(255);
    //                 rect(edge.x, edge.y, edge.w, edge.w);

    //           }
    //         }
    //       }
    //     }
    //   });

    // controls.draw();
}