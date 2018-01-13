class myP5 extends p5 {
}
var p = new myP5();
let canvasWidth = 400;
let canvasHeight = 400;
let angle = 0;
let w = 24;
let ma;
let maxD;
let minHeight = 100;
let maxHeight = 300;
function setup() {
    p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
    ma = p.atan(p.cos(p.QUARTER_PI));
    maxD = p.dist(0, 0, 200, 200);
}
function draw() {
    p.background(200);
    p.ortho(-400, 400, 400, -400, 0, 1000);
    p.rotateX(-ma);
    p.rotateY(-p.QUARTER_PI);
    p.pointLight(255, 255, 255, 0, 0, 400);
    p.pointLight(100, 50, 100, -300, -300, p.height / 2);
    p.directionalLight(150, 150, 150, -0.8, -0.8, 0);
    let cols = (p.width / w);
    let rows = (p.height / w);
    let heightsColors = ColorHelper.getColorsArray(200);
    let rowColors = ColorHelper.getColorsArray(rows);
    var count = 0;
    for (let z = 0; z < p.height; z += w) {
        for (let x = 0; x < p.width; x += w) {
            p.push();
            let d = p.dist(x, z, p.width / 2, p.height / 2);
            let offset = p.map(d, 0, maxD, -p.PI, p.PI);
            let a = angle + offset;
            let h = mapHeight(a);
            p.translate(x - p.width / 2, 0, z - p.height / 2);
            let row = p.floor(z / w);
            let rowColor = rowColors[row];
            let heightColor = heightsColors[h - 100];
            p.ambientMaterial(rowColor);
            p.box(w, h, w);
            p.pop();
        }
    }
    angle -= 0.1;
}
var mapHeight = (angle) => {
    return p.floor(p.map(p.sin(angle), -1, 1, minHeight, maxHeight));
};
//# sourceMappingURL=sketch.js.map