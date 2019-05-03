let font: p5.Font;
function preload() {
  font = loadFont('/public/Digitalt.ttf');
}

let points: p5.Vector[];
let bounds: any;
var pairs: {a: p5.Vector, b: p5.Vector}[];
function setup() {
  createCanvas(displayWidth, displayHeight);
  stroke(0);
  fill(255, 104, 204);

  bounds = font.textBounds('A', 0, 0, 200);
  
  points = font.textToPoints('A', 0, 0, 200, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });

  // pairs = [];
  // // put all points into pairs
  // for(var i = 0; i < points.length; i++) {

  //   var p = points[i];
  //   var x = p.x;
  //   var y = p.x;

  //   // look for matching 
  //   var matches = points.filter( obj => obj.x === x && obj.y < y );
  //   if(matches.length > 0) {
  //     var match = matches[0];
  //     pairs[pairs.length] = {a : p, b : match};
  //   }

  // }


}

function draw() {
  background(255);
  
  translate(100, 100 + bounds.h);

  // rect(bounds.x, bounds.y, bounds.w,bounds.h);
  
  stroke(10);
  for(var i = 0; i < 100; i++ ){
    line(i + bounds.x, -10 + -bounds.h, i + bounds.x, 10);
  }
  stroke(200);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    // 
    //line(p.a.x,p.a.y, p.b.x, p.b.y);
    beginShape();
    // point(p.x,p.y);
    vertex(p.x,p.y);
    endShape(CLOSE);
    // vertex(
    //   p.x * width / bounds.w +
    //     sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,
    //   p.y * height / bounds.h
    // );
  }


}