var p = new p5();
let angle = 0;
let w = 24;
let ma;
let maxD;
function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    ma = p.atan(p.cos(p.QUARTER_PI));
    maxD = p.dist(0, 0, 200, 200);
}
function draw() {
    p.background(100);
    p.ortho(-400, 400, 400, -400, 0, 1000);
    p.rotateX(-ma);
    p.rotateY(-p.QUARTER_PI);
    for (let z = 0; z < p.height; z += w) {
        for (let x = 0; x < p.width; x += w) {
            p.push();
            let d = p.dist(x, z, p.width / 2, p.height / 2);
            let offset = p.map(d, 0, maxD, -p.PI, p.PI);
            let a = angle + offset;
            let h = p.floor(p.map(p.sin(a), -1, 1, 100, 300));
            p.translate(x - p.width / 2, 0, z - p.height / 2);
            p.normalMaterial();
            p.box(w, h, w);
            p.pop();
        }
    }
    angle -= 0.1;
}
//# sourceMappingURL=sketch.js.map