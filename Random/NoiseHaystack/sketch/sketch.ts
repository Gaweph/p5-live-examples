var data: Array<number[]>;
var src: p5.Image; 
var w: number;
var h: number;

function setup() {
  src = loadImage("/public/1362683991bright-abstract-colours.jpg");
  
    w = displayWidth;
    h = displayHeight;

    console.log(w,h);
  createCanvas(w, h);
  

  data = [];

  for(var i = 0; i < w; i++) {
    data[i] = [];
    for(var j = 0; j< h; j++) {
        data[i][j] = 0;
    }
}

  genNoise(data);
  background(0);
  src.resize(w, h);
}



function genNoise(data: number[][]) {
  var noiseScale = 0.0075;
  noiseDetail(1, 0.5);
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      data[i][j] = noise(j * noiseScale, i * noiseScale);
    }
  }
}

function draw() {
  for (var i = 0; i < 100; i++) {
    var nX = floor(random(w));
    var nY = floor(random(h));
    var d = data[nX][nY];
    push();
        var c = <p5.Color>src.get(nX, nY);
        fill(c);
        noStroke();
        translate(nX, nY);
        rotate(map(d, 0, 1, -PI, PI));
        var newLength = map(nY, 0, h, 10, 75);
        var newWidth = map(nY, 0, w, 3, 10);
        rectMode(CENTER);
        rect(0, 0, newLength, newWidth);
    pop();
  }
}