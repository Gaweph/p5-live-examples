var p = new p5();
var resolution = 25;
let fullRotation = p.PI * 2;
let leftStartingAngle = -p.PI + (p.PI / 10);
let rightStartingAngle = (p.PI * 2) - (p.PI / 10);
let bottomStartingAngle = p.PI / 2 - (p.PI / 5);
let bottomLeftStartingAngle = p.PI / 2 + (p.PI / 5);
let topStartingAngle = -p.PI / 2;
let controls;
class Sketch {
    constructor() {
        this.suns = [];
    }
    setup() {
        var k = 4;
        var colors = ColorHelper.getColorsArray(5);
        for (var i = 1; i <= 1; i++) {
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, leftStartingAngle, colors[0], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, topStartingAngle, colors[1], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, rightStartingAngle, colors[2], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, bottomStartingAngle, colors[3], fullRotation / 4));
            this.suns.push(new Sun(p.width / 4 / i, 10 / i, -k, bottomLeftStartingAngle, colors[4], fullRotation / 4));
        }
        controls = new Controls();
        controls.setup();
    }
    draw() {
        p.background(51);
        controls.draw();
        for (var s of this.suns) {
            s.update();
            s.show();
        }
    }
}
//# sourceMappingURL=sketch.js.map