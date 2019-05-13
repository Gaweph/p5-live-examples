let font: p5.Font;
function preload() {
  font = loadFont('/public/Digitalt.ttf');
}

// let bounds: any;
var lines: {line: { pointA: p5.Vector, pointB: p5.Vector }, color: p5.Color}[];
var dotGap = 4; // lower is more
function setup() {
  var canvas = <HTMLCanvasElement>(<any>createCanvas(windowWidth, windowHeight)).canvas;
  stroke(0);
  fill(255, 104, 204);

  // set up canvas
  push();
    var bounds = <any>font.textBounds(' Gareth Williams ', 0, 0, 200);
    translate(100, bounds.h);
    // rect(0, 0, bounds.w, -bounds.h);
    textFont(font);
    textSize(200);
    fill(0);
    text('Gareth Williams', 0, 0);
    fill('red');
    rect(400, 400, 500, 100);
    
    fill('purple');
    circle(200, 200, 75);
  pop();

  // convert to lines
  // points = canvasToPoints(canvas);
  lines = Helpers.canvasTolines(canvas);

  // clean canvas
  background(255);

}

function draw() {
  background(255);

  for (var i = 0; i < lines.length; i++) {
    // circle(linePoints[i].x, linePoints[i].y, 2);
    stroke(lines[i].color);
    line(lines[i].line.pointA.x, lines[i].line.pointA.y, lines[i].line.pointB.x, lines[i].line.pointB.y);
  }
}

