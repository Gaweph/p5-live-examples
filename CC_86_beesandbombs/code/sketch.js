var p = new p5();
let canvasWidth = 400;
let canvasHeight = 400;
let angle = 0;
let w = 24;
let ma;
let maxD;
let minHeight = 100;
let maxHeight = 300;
var leftBuffer;
var rightBuffer;
var pg;
function setup() {
    p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
    ma = p.atan(p.cos(p.QUARTER_PI));
    maxD = p.dist(0, 0, 200, 200);
    var button = p.createButton('Toggle RAINBOW');
    button.position(0, 0);
    button.mousePressed(toggleRainbow);
}
let showRainbowColors = false;
function draw() {
    let imageWidth = 400;
    let imageHeight = 400;
    p.background(100);
    p.ortho(-400, 400, 400, -400, 0, 1000);
    p.rotateX(-ma);
    p.rotateY(-p.QUARTER_PI);
    p.pointLight(255, 255, 255, 0, 0, 400);
    p.pointLight(100, 50, 100, -300, -300, imageHeight / 2);
    p.directionalLight(150, 150, 150, -0.8, -0.8, 0);
    let cols = (imageWidth / w);
    let rows = (imageHeight / w);
    let heightsColors = ColorHelper.getColorsArray(maxHeight - minHeight);
    let rowColors = ColorHelper.getColorsArray(rows);
    var count = 0;
    for (let z = 0; z < imageHeight; z += w) {
        for (let x = 0; x < imageWidth; x += w) {
            p.push();
            let d = p.dist(x, z, imageWidth / 2, imageHeight / 2);
            let offset = p.map(d, 0, maxD, -p.PI, p.PI);
            let a = angle + offset;
            let h = mapHeight(a);
            if (showRainbowColors) {
                let heightColor = heightsColors[h - (minHeight)];
                p.ambientMaterial(heightColor);
            }
            else {
                let row = p.floor(z / w);
                let rowColor = rowColors[row];
                p.ambientMaterial(rowColor);
            }
            p.translate(x - imageWidth / 2, 0, z - imageHeight / 2);
            p.box(w, h, w);
            p.pop();
        }
    }
    angle -= 0.1;
}
var toggleRainbow = () => {
    showRainbowColors = !showRainbowColors;
};
var mapHeight = (angle) => {
    return p.floor(p.map(p.sin(angle), -1, 1, minHeight, maxHeight));
};
//# sourceMappingURL=sketch.js.map